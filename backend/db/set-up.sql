-- Drop the database if it exists
DROP DATABASE IF EXISTS FinanceTrack;

-- Create the new database
CREATE DATABASE FinanceTrack;

-- Set the context to the newly created database
USE FinanceTrack;

-- Create User Table
CREATE TABLE `User` (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(15) NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) DEFAULT NULL,
    date_joined DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create Asset_Type Table
CREATE TABLE Asset_Type (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
);

-- Create Asset Table
CREATE TABLE Asset (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    boughtFor DECIMAL(10,2) NOT NULL,
    currentValue DECIMAL(10,2) NOT NULL,
    asset_type_id INT, 
    user_id INT,
    FOREIGN KEY (asset_type_id) REFERENCES Asset_Type(id),
    FOREIGN KEY (user_id) REFERENCES `User`(id) ON DELETE CASCADE
);

-- Create saving goal table
CREATE TABLE saving_goal (
    id INT AUTO_INCREMENT PRIMARY KEY,        -- Unique identifier for each saving goal
    name VARCHAR(255) NOT NULL,               -- Name of the saving goal
    goal DECIMAL(10, 2) NOT NULL,             -- Target amount for the saving goal
    balance DECIMAL(10, 2) DEFAULT 0,         -- Current balance towards the goal
    user_id INT NOT NULL,                      -- ID of the user who owns the saving goal
    FOREIGN KEY (user_id) REFERENCES `User`(id) ON DELETE CASCADE -- Foreign key referencing the users table
);


-- Create Expense Category Table
CREATE TABLE Expense_category (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
);

-- Create Expense Table
CREATE TABLE Expense (
    id INT PRIMARY KEY AUTO_INCREMENT,
    amount DECIMAL(10, 2) NOT NULL,
    description VARCHAR(255),
    date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    category_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES Expense_category(id),
    FOREIGN KEY (user_id) REFERENCES `User`(id) ON DELETE CASCADE
);

-- Create Recurring Expense Table
CREATE TABLE Recurring_expense (
    id INT PRIMARY KEY AUTO_INCREMENT,
    amount DECIMAL(10, 2) NOT NULL,
    description VARCHAR(255),
    category_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES Expense_category(id),
    FOREIGN KEY (user_id) REFERENCES `User`(id) ON DELETE CASCADE
);

-- Create Income Category Table
CREATE TABLE Income_category (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
);

-- Create Recurring Income Table
CREATE TABLE Recurring_income (
    id INT PRIMARY KEY AUTO_INCREMENT,
    amount DECIMAL(10, 2) NOT NULL,
    description VARCHAR(255),
    category_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES Income_category(id),
    FOREIGN KEY (user_id) REFERENCES `User`(id) ON DELETE CASCADE
);

-- Create Investment Category Table
CREATE TABLE Investment_category (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
);

-- Create Investment Table
CREATE TABLE Investment (
    id INT PRIMARY KEY AUTO_INCREMENT,
    description VARCHAR(100) NOT NULL,
    invested DECIMAL(10, 2) NOT NULL,
    currentValue DECIMAL(10, 2) NOT NULL,
    category_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES Investment_category(id),
    FOREIGN KEY (user_id) REFERENCES `User`(id) ON DELETE CASCADE
);

-- Create Bank Account Category Table
CREATE TABLE Bank_account_category (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
);

-- Create Bank Account Table
CREATE TABLE Bank_account (
    id INT PRIMARY KEY AUTO_INCREMENT,
    description VARCHAR(50) NOT NULL,
    balance DECIMAL(10, 2) NOT NULL,
    category_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES Bank_account_category(id),
    FOREIGN KEY (user_id) REFERENCES `User`(id) ON DELETE CASCADE
);
