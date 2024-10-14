-- Insert data into User table
INSERT INTO `User` (password, first_name, last_name)
VALUES 
('password123', 'John', 'Doe');

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

-- Insert data into Asset table
INSERT INTO Asset (name, boughtFor, currentValue, asset_type_id, user_id)
VALUES 
('House', 300000.00, 320000.00, 1,1), -- Real Estate
('Tesla Stock', 5000.00, 7000.00, 2,1), -- Stocks
('Car', 25000.00, 18000.00, 3,1); -- Vehicles

-- Insert data into Expense_category table
INSERT INTO Expense_category (name)
VALUES 
("Rent"),
("Mortgage"),
("Utilities"),
("Internet"),
("Phone bill"),
("Car insurance"),
("Health insurance"),
("Groceries"),
("Transportation"),
("Gasoline"),
("Public transit"),
("Loan payments"),
("Credit card payments"),
("Subscriptions"),
("Streaming services"),
("Savings contributions"),
("Debt repayment");


-- Insert data into Recurring_expense table
INSERT INTO Recurring_expense (amount, description, category_id, user_id)
VALUES 
(8000, 'Lynwood apartment rent', 1, 1),
(800, 'Telkom fibre', 4, 1),
(50.00, 'Meredez cover', 6, 1); 

-- Insert data into Income_category table
INSERT INTO Income_category (name)
VALUES 
("Salary"),
("Hourly wages"),
("Commission"),
("Freelance income"),
("Rental income"),
("Business profits"),
("Investment dividends"),
("Pension"),
("Social security"),
("Government benefits"),
("Child support"),
("Alimony"),
("Interest income"),
("Royalties");


-- Insert data into Recurring_income table
INSERT INTO Recurring_income (amount, description, category_id, user_id)
VALUES 
(35000.00, 'Monthly salary',  1, 1), 
(250.00, 'Rental income',5, 2), 
(100.00, 'Dividends Coca Cola', 7, 3); 

-- Insert data into Investment_category table
INSERT INTO Investment_category (name)
VALUES 
("Stocks"),
("Bonds"),
("Mutual funds"),
("Real estate"),
("Index funds"),
("Exchange-traded funds (ETFs)"),
("Cryptocurrency"),
("Commodities"),
("Precious metals"),
("Retirement accounts (e.g., 401k, IRA)"),
("Certificates of deposit (CDs)"),
("Annuities"),
("Hedge funds"),
("Private equity");


-- Insert data into Investment table
INSERT INTO Investment (amount, description, date, category_id, user_id)
VALUES 
(1000.00, 'Apple Ltd', NOW(), 1, 1), -- Stocks
(150000.00, 'Coca Cola', NOW(), 1, 2); -- Real Estate

-- Insert data into Bank_account_category table
INSERT INTO Bank_account_category (name)
VALUES 
("Cheque"),
("Credit"),
("Savings"),
("Money market"),
("Certificate of deposit (CD)"),
("Joint"),
("Business"),
("Retirement (e.g., IRA, 401k)"),
("Brokerage"),
("Custodial"),
("Health savings (HSA)"),
("Specialty (e.g., for minors)"),
("Foreign currency");

-- Insert data into Bank_account table
INSERT INTO Bank_account (description, balance, category_id, user_id)
VALUES 
('Investec Youth Account', 2000.00, 3, 1),
('ABSA student account', 1500.00, 2, 2); 
