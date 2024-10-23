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
    id INT AUTO_INCREMENT PRIMARY KEY,      
    name VARCHAR(255) NOT NULL,               
    goal DECIMAL(10, 2) NOT NULL,            
    balance DECIMAL(10, 2) DEFAULT 0,       
    user_id INT NOT NULL,                     
    FOREIGN KEY (user_id) REFERENCES `User`(id) ON DELETE CASCADE
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

-- Create Bank Table
CREATE TABLE Bank (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL
);

-- Create Bank Account Table
CREATE TABLE Bank_account (
    id INT PRIMARY KEY AUTO_INCREMENT,
    description VARCHAR(50) NOT NULL,
    balance DECIMAL(10, 2) NOT NULL,
    category_id INT NOT NULL,
    user_id INT NOT NULL,
    bank_id INT NOT NULL,
    FOREIGN KEY (bank_id) REFERENCES Bank(id), 
    FOREIGN KEY (category_id) REFERENCES Bank_account_category(id),
    FOREIGN KEY (user_id) REFERENCES `User`(id) ON DELETE CASCADE 
);

-- Create Budget page
CREATE TABLE Budget (
    id INT PRIMARY KEY AUTO_INCREMENT,
    income: DECIMAL(10, 2) NOT NULL,
    expenses: DECIMAL(10, 2) NOT NULL,
    savings: DECIMAL(10, 2) NOT NULL,
    invest: DECIMAL(10, 2) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES `User`(id) ON DELETE CASCADE
);

-- Create Monthly review table
 CREATE TABLE Monthly_review (
    id INT PRIMARY KEY AUTO_INCREMENT,
    income: DECIMAL(10, 2) NOT NULL,
    expenses: DECIMAL(10, 2) NOT NULL,
    savings: DECIMAL(10, 2) NOT NULL,
    invested: DECIMAL(10, 2) NOT NULL,
    budget_id: INT NOT NULL,
    month: VARCHAR(20) NOT NULL,
    year: INT NOT NULL,
    FOREIGN KEY (budget_id) REFERENCES Budget(id) ON DELETE CASCADE
 );

-- Insert data into Asset_Type table
INSERT INTO Asset_Type (name)
VALUES 
('Property'),
('Laptop'),
('Phone'),
('Vehicle'),
('Jewelry'),
('Equipment'),
('Tech'),
('Tools'),
('Appliances'),
('Furniture'),
('Other');

-- Insert data into Expense_category table
INSERT INTO Expense_category (name)
VALUES 
('Rent'),
('Mortgage'),
('Utilities'),
('Internet'),
('Phone bill'),
('Car insurance'),
('Health insurance'),
('Groceries'),
('Transportation'),
('Gasoline'),
('Public transit'),
('Loan payments'),
('Credit card payments'),
('Subscriptions'),
('Streaming services'),
('Savings contributions'),
('Debt repayment'),
('Other');

-- Insert data into Income_category table
INSERT INTO Income_category (name)
VALUES 
('Salary'),
('Hourly wages'),
('Commission'),
('Freelance income'),
('Rental income'),
('Business profits'),
('Investment dividends'),
('Pension'),
('Social security'),
('Government benefits'),
('Child support'),
('Alimony'),
('Interest income'),
('Royalties'),
('Other');

-- Insert data into Investment_category table
INSERT INTO Investment_category (name)
VALUES 
('Stocks'),
('Bonds'),
('Mutual funds'),
('Real estate'),
('Index funds'),
('Exchange-traded funds (ETFs)'),
('Cryptocurrency'),
('Commodities'),
('Precious metals'),
('Retirement accounts (e.g., 401k, IRA)'),
('Certificates of deposit (CDs)'),
('Annuities'),
('Hedge funds'),
('Private equity'),
('Other');

-- Insert data into Bank_account_category table
INSERT INTO Bank_account_category (name)
VALUES 
('Cheque'),
('Credit'),
('Savings'),
('Money market'),
('Certificate of deposit (CD)'),
('Joint'),
('Business'),
('Retirement (e.g., IRA, 401k)'),
('Brokerage'),
('Custodial'),
('Health savings (HSA)'),
('Specialty (e.g., for minors)'),
('Foreign currency'),
('Other');

-- Insert data into Bank table
INSERT INTO Bank (name)
 VALUES 
('Investec'),
('ABSA'),
('Standard Bank'),
('FNB'),
('Nedbank'),
('Capitec'),
('African Bank'),
('Bidvest'),
('TymeBank'),
('Other');
