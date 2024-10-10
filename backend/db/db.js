// db.js
const sql = require('mssql');

// SQL Server connection configuration
const config = {
    user: process.env.USERNAME,       // Your SQL Server username
    password: process.env.PASSWORD,   // Your SQL Server password
    server: process.env.SERVER,       // SQL Server instance (e.g., localhost, IP address, etc.)
    database: 'FinanceTrack',   // The name of the database
    options: {
        encrypt: false,              // Use this for Azure SQL, otherwise false
        enableArithAbort: true      // Important for handling arithmetic overflow
    }
};

async function connectToDatabase() {
    try {
        let pool = await sql.connect(config);
        console.log('Connected to SQL Server');
        return pool;
    } catch (err) {
        console.error('Database connection failed: ', err);
    }
}

module.exports = { connectToDatabase, sql };
