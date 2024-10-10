USE master;
GO

-- Drop the database if it exists
IF EXISTS (SELECT name FROM master.sys.databases WHERE name = N'FinanceTrack')
BEGIN
    DROP DATABASE FinanceTrack;
END
GO

-- Create the new database
CREATE DATABASE FinanceTrack;
GO

-- Set the context to the newly created database
USE FinanceTrack;
GO


-- Create User Table
CREATE TABLE [User] (
    id INT PRIMARY KEY IDENTITY(1,1),
    password NVARCHAR(255) NOT NULL,
    first_name NVARCHAR(100) NOT NULL,
    last_name NVARCHAR(100) NULL,
    date_joined DATETIME NOT NULL DEFAULT GETDATE()
);

-- Create Expense Category Table
CREATE TABLE Expense_category (
    id INT PRIMARY KEY IDENTITY(1,1),
    name NVARCHAR(100) NOT NULL
);

-- Create Expense Table
CREATE TABLE Expense (
    id INT PRIMARY KEY IDENTITY(1,1),
    amount DECIMAL(10, 2) NOT NULL,
    description NVARCHAR(255),
    date DATETIME NOT NULL DEFAULT GETDATE(),
    category_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES Expense_category(id),
    FOREIGN KEY (user_id) REFERENCES [User](id)
);

-- Create Recurring Expense Table
CREATE TABLE Recurring_expense (
    id INT PRIMARY KEY IDENTITY(1,1),
    amount DECIMAL(10, 2) NOT NULL,
    description NVARCHAR(255),
    start_date DATETIME NOT NULL,
    interval NVARCHAR(50) NOT NULL,
    category_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES Expense_category(id),
    FOREIGN KEY (user_id) REFERENCES [User](id)
);

-- Create Income Category Table
CREATE TABLE Income_category (
    id INT PRIMARY KEY IDENTITY(1,1),
    name NVARCHAR(100) NOT NULL
);

-- Create Income Table
CREATE TABLE Income (
    id INT PRIMARY KEY IDENTITY(1,1),
    amount DECIMAL(10, 2) NOT NULL,
    source NVARCHAR(255),
    date DATETIME NOT NULL DEFAULT GETDATE(),
    category_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES Income_category(id),
    FOREIGN KEY (user_id) REFERENCES [User](id)
);

-- Create Recurring Income Table
CREATE TABLE Recurring_income (
    id INT PRIMARY KEY IDENTITY(1,1),
    amount DECIMAL(10, 2) NOT NULL,
    source NVARCHAR(255),
    start_date DATETIME NOT NULL,
    interval NVARCHAR(50) NOT NULL,
    category_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES Income_category(id),
    FOREIGN KEY (user_id) REFERENCES [User](id)
);

-- Create Investment Category Table
CREATE TABLE Investment_category (
    id INT PRIMARY KEY IDENTITY(1,1),
    name NVARCHAR(100) NOT NULL
);

-- Create Investment Table
CREATE TABLE Investment (
    id INT PRIMARY KEY IDENTITY(1,1),
    amount DECIMAL(10, 2) NOT NULL,
    type NVARCHAR(100) NOT NULL,
    date DATETIME NOT NULL DEFAULT GETDATE(),
    category_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES Investment_category(id),
    FOREIGN KEY (user_id) REFERENCES [User](id)
);

-- Create Bank Account Category Table
CREATE TABLE Bank_account_category (
    id INT PRIMARY KEY IDENTITY(1,1),
    name NVARCHAR(100) NOT NULL
);

-- Create Bank Account Table
CREATE TABLE Bank_account (
    id INT PRIMARY KEY IDENTITY(1,1),
    account_number NVARCHAR(50) NOT NULL,
    balance DECIMAL(10, 2) NOT NULL,
    category_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES Bank_account_category(id),
    FOREIGN KEY (user_id) REFERENCES [User](id)
);
