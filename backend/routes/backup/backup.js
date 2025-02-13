const express = require("express");
const fs = require("fs");
const path = require("path");
const connection = require("../../db/db");
const ValidateLoggedIn = require("../../middleware/ValidateLoggedIn");
const router = express.Router();

const backupDirectory = path.join(__dirname, "./files");

// 1. list of backups

router.get("/", ValidateLoggedIn, (req, res) => {
  fs.readdir(backupDirectory, (err, files) => {
    if (err) {
      console.error("Error reading backup directory:", err);
      return res.status(500).json({ message: "Unable to list backups" });
    }

    const backups = files.map((file) => ({
      name: file,
      path: path.join(backupDirectory, file),
      createdAt: fs.statSync(path.join(backupDirectory, file)).mtime,
    }));

    res.json(backups);
  });
});

// 2. Create a Backup
router.post("/", ValidateLoggedIn, async (req, res) => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const name = req.body.name || `Backup-${timestamp}`;
  const backupFile = path.join(backupDirectory, `${name}.sql`);

  try {
    const [tables] = await connection.promise().query("SHOW TABLES");

    // Fetch foreign key relationships for all tables
    const foreignKeys = {};
    for (let tableObj of tables) {
      const tableName = Object.values(tableObj)[0];

      const [fkConstraints] = await connection
        .promise()
        .query(`SHOW CREATE TABLE \`${tableName}\``);

      const foreignKeyInfo = fkConstraints[0]["Create Table"].match(
        /CONSTRAINT\s`(\w+)`\sFOREIGN\sKEY\s\((.*?)\)\sREFERENCES\s`(\w+)`\s\((.*?)\)/g
      );

      if (foreignKeyInfo) {
        foreignKeys[tableName] = foreignKeyInfo.map((fk) => {
          const [, constraint, columns, refTable, refColumns] = fk.match(
            /CONSTRAINT\s`(\w+)`\sFOREIGN\sKEY\s\((.*?)\)\sREFERENCES\s`(\w+)`\s\((.*?)\)/
          );
          return { constraint, columns, refTable, refColumns };
        });
      }
    }

    // Sort tables based on foreign key dependencies
    const tableOrder = [];
    const processedTables = new Set();

    function resolveTableDependencies(tableName) {
      if (!processedTables.has(tableName)) {
        processedTables.add(tableName);

        // Resolve any dependencies based on foreign keys
        if (foreignKeys[tableName]) {
          foreignKeys[tableName].forEach((fk) => {
            if (!processedTables.has(fk.refTable)) {
              resolveTableDependencies(fk.refTable);
            }
          });
        }

        tableOrder.push(tableName);
      }
    }

    tables.forEach((tableObj) => {
      const tableName = Object.values(tableObj)[0];
      resolveTableDependencies(tableName);
    });

    // Generate SQL dump: CREATE TABLE first, then INSERT INTO
    let sqlDump = `DROP DATABASE IF EXISTS FinanceTrack;\nCREATE DATABASE FinanceTrack;\nUSE FinanceTrack;\n\n`;

    // Add CREATE TABLE statements
    let createTableStatements = [];
    for (let tableName of tableOrder) {
      const [[createTableResult]] = await connection
        .promise()
        .query(`SHOW CREATE TABLE \`${tableName}\``);
      createTableStatements.push(createTableResult["Create Table"]);
    }

    sqlDump += createTableStatements.join(";\n\n") + ";\n\n";

    // Add INSERT INTO statements
    for (let tableName of tableOrder) {
      const [rows] = await connection
        .promise()
        .query(`SELECT * FROM \`${tableName}\``);
      if (rows.length > 0) {
        const keys = Object.keys(rows[0])
          .map((key) => `\`${key}\``)
          .join(", ");
        const values = rows
          .map((row) => {
            const rowValues = Object.values(row)
              .map((value) => {
                if (value === null) return "NULL";
                // Check if the value is a date
                if (value instanceof Date) {
                  return `'${value.toISOString().slice(0, 19).replace("T", " ")}'`;
                }
                // Check if the value is a Buffer (for binary data)
                if (Buffer.isBuffer(value)) {
                  // Convert to hex and format as a MySQL hex literal
                  return `X'${value.toString("hex")}'`;
                }
                // Escape single quotes in string values (basic escaping)
                if (typeof value === "string") {
                  return `'${value.replace(/'/g, "''")}'`;
                }
                // For numbers or other types, just cast them to string
                return `'${value}'`;
              })
              .join(", ");
            return `(${rowValues})`;
          })
          .join(",\n");
        sqlDump += `INSERT INTO \`${tableName}\` (${keys}) VALUES\n${values};\n\n`;
      }
    }

    // Write the SQL file
    fs.writeFileSync(backupFile, sqlDump);
    res.send(`Backup successful! File saved as: ${name}.sql`);
  } catch (error) {
    console.error("Error during backup:", error);
    res.status(500).send("Backup failed.");
  }
});

// 3. Restore a Backup
router.post("/restore", ValidateLoggedIn, async (req, res) => {
  let { name } = req.body;
  name = name + ".sql";

  if (!name) {
    return res.status(400).json({ message: "Backup file name is required." });
  }

  const backupFile = path.join(backupDirectory, name);

  if (!fs.existsSync(backupFile)) {
    return res.status(404).send("Backup file not found.");
  }

  try {
    const sqlContent = fs.readFileSync(backupFile, "utf-8");
    const statements = sqlContent
      .split(/;\s*\n/) // Split statements by `;` followed by a newline
      .filter((stmt) => stmt.trim() !== ""); // Remove empty statements

    // Execute each SQL statement
    for (let statement of statements) {
      await connection.promise().query(statement);
    }

    console.log("Restore completed from file:", backupFile);
    res.status(200).json({ message: "Restore successful!" });
  } catch (error) {
    console.error("Error during restore:", error);
    res.status(500).send("Restore failed.");
  }
});

// 4. Delete a Backup
router.delete("/", ValidateLoggedIn, (req, res) => {
  const { name } = req.body;
  const backupFile = path.join(backupDirectory, `${name}`);

  if (!fs.existsSync(backupFile)) {
    return res.status(404).json({ message: "Backup file not found." });
  }

  try {
    fs.unlinkSync(backupFile);
    res.status(200).json({ message: "Backup deleted" });
  } catch (error) {
    console.error("Error deleting backup:", error);
    res.status(500).json({ message: "Failed to delete backup." });
  }
});

module.exports = router;
