-- Insert data into User table
INSERT INTO `User` (password, first_name, last_name)
VALUES 
('password123', 'John', 'Doe'),
('password456', 'Jane', 'Smith'),
('password789', 'Bob', 'Johnson');

-- Insert data into Asset_Type table
INSERT INTO Asset_Type (name)
VALUES 
('Real Estate'),
('Stocks'),
('Vehicles');

-- Insert data into Asset table
INSERT INTO Asset (name, boughtFor, currentValue, asset_type_id)
VALUES 
('House', 300000.00, 320000.00, 1), -- Real Estate
('Tesla Stock', 5000.00, 7000.00, 2), -- Stocks
('Car', 25000.00, 18000.00, 3); -- Vehicles

-- Insert data into Expense_category table
INSERT INTO Expense_category (name)
VALUES 
('Food'),
('Transport'),
('Utilities');

-- Insert data into Expense table
INSERT INTO Expense (amount, description, date, category_id, user_id)
VALUES 
(50.00, 'Groceries at supermarket', NOW(), 1, 1), -- Food
(30.00, 'Taxi fare', NOW(), 2, 2), -- Transport
(100.00, 'Electricity bill', NOW(), 3, 3); -- Utilities

-- Insert data into Recurring_expense table
INSERT INTO Recurring_expense (amount, description, start_date, `interval`, category_id, user_id)
VALUES 
(10.00, 'Gym membership', NOW(), 'Monthly', 1, 1), -- Food
(15.00, 'Spotify subscription', NOW(), 'Monthly', 3, 2), -- Utilities
(50.00, 'Internet bill', NOW(), 'Monthly', 3, 3); -- Utilities

-- Insert data into Income_category table
INSERT INTO Income_category (name)
VALUES 
('Salary'),
('Investments'),
('Freelance');

-- Insert data into Income table
INSERT INTO Income (amount, source, date, category_id, user_id)
VALUES 
(5000.00, 'Monthly salary', NOW(), 1, 1), -- Salary
(200.00, 'Stock dividends', NOW(), 2, 2), -- Investments
(150.00, 'Freelance project', NOW(), 3, 3); -- Freelance

-- Insert data into Recurring_income table
INSERT INTO Recurring_income (amount, source, start_date, `interval`, category_id, user_id)
VALUES 
(5000.00, 'Monthly salary', NOW(), 'Monthly', 1, 1), -- Salary
(250.00, 'Rental income', NOW(), 'Monthly', 2, 2), -- Investments
(300.00, 'Contract work', NOW(), 'Quarterly', 3, 3); -- Freelance

-- Insert data into Investment_category table
INSERT INTO Investment_category (name)
VALUES 
('Stocks'),
('Real Estate'),
('Bonds');

-- Insert data into Investment table
INSERT INTO Investment (amount, type, date, category_id, user_id)
VALUES 
(1000.00, 'Apple Stock', NOW(), 1, 1), -- Stocks
(150000.00, 'Apartment', NOW(), 2, 2), -- Real Estate
(500.00, 'Government Bonds', NOW(), 3, 3); -- Bonds

-- Insert data into Bank_account_category table
INSERT INTO Bank_account_category (name)
VALUES 
('Savings'),
('Checking'),
('Business');

-- Insert data into Bank_account table
INSERT INTO Bank_account (account_number, balance, category_id, user_id)
VALUES 
('123456789', 2000.00, 1, 1), -- Savings
('987654321', 1500.00, 2, 2), -- Checking
('456789123', 5000.00, 3, 3); -- Business
