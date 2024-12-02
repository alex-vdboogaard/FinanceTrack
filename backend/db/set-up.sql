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

-- Create Credit_Score_History Table
CREATE TABLE `Credit_Score_History` (
	id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    year YEAR NOT NULL,
    MONTH INT NOT NULL,
    score INT NOT NULL,
    notes VARCHAR(40),
    FOREIGN KEY (user_id) REFERENCES `User`(id) ON DELETE CASCADE
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
    asset_type_id INT NOT NULL, 
    user_id INT NOT NULL,
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
    income DECIMAL(10, 2) NOT NULL,
    expenses DECIMAL(10, 2) NOT NULL,
    savings DECIMAL(10, 2) NOT NULL,
    invest DECIMAL(10, 2) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES `User`(id) ON DELETE CASCADE
);

-- Create Monthly review table
 CREATE TABLE Monthly_review (
    id INT PRIMARY KEY AUTO_INCREMENT,
    income DECIMAL(10, 2) NOT NULL,
    expenses DECIMAL(10, 2) NOT NULL,
    savings DECIMAL(10, 2) NOT NULL,
    invested DECIMAL(10, 2) NOT NULL,
    user_id INT NOT NULL,
    month INT NOT NULL,
    year INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES `User`(id) ON DELETE CASCADE
 );

-- Create Expense Category Table
CREATE TABLE Expense_category (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
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

-- Create Folder table for statements
CREATE TABLE Folder (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    parent_folder_id INT,
    user_id INT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES `User`(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_folder_id) REFERENCES Folder(id) ON DELETE CASCADE
);

-- Create Statements table (ensure cascade on delete of folders)
CREATE TABLE Statement (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    pdf_blob LONGBLOB,
    user_id INT NOT NULL,
    folder_id INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (folder_id) REFERENCES Folder(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES `User`(id) ON DELETE CASCADE
);

-- Create Loan Category Table
CREATE TABLE Loan_category (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
);

-- Create Loan Table
CREATE TABLE Loan (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    loan_amount DECIMAL(10, 2) NOT NULL,
    balance DECIMAL(10, 2) NOT NULL,
    monthly_repayment DECIMAL(10,2) NOT NULL,
    term INT NOT NULL,
    interest_rate DECIMAL(10,4) NOT NULL,
    first_payment DATETIME NOT NULL,
    category_id INT NOT NULL,
    user_id INT NOT NULL,
    bank_id INT NOT NULL,
    FOREIGN KEY (bank_id) REFERENCES Bank(id), 
    FOREIGN KEY (category_id) REFERENCES Loan_category(id),
    FOREIGN KEY (user_id) REFERENCES `User`(id) ON DELETE CASCADE 
);

-- Create Credit_Score Table
CREATE TABLE Credit_Score (
    id INT AUTO_INCREMENT PRIMARY KEY,
    year INT NOT NULL,
    month INT NOT NULL,
    score INT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES `User`(id) ON DELETE CASCADE
);

-- Create Reminder Table 
CREATE TABLE Reminder (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reminder_date DATETIME NOT NULL,
    message TEXT
);

-- Create Task table
CREATE TABLE Task (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    done BOOLEAN DEFAULT FALSE,
    description TEXT,
    link VARCHAR(255),
    user_id INT NOT NULL,
    reminder_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES `User`(id) ON DELETE CASCADE,
	FOREIGN KEY (reminder_id) REFERENCES `Reminder`(id)
);

-- Create Notification Table
CREATE TABLE Notification (
    id INT AUTO_INCREMENT PRIMARY KEY,
    link VARCHAR(255),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES `User`(id) ON DELETE CASCADE
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

INSERT INTO Loan_category (name) VALUES
('Personal Loan'),
('Home Loan'),
('Auto Loan'),
('Student Loan'),
('Business Loan'),
('Mortgage Loan'),
('Debt Consolidation Loan'),
('Other');

