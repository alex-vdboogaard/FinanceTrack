-- Insert data into User table
INSERT INTO `User` (username, password, first_name, last_name)
VALUES 
('john', 'password123', 'John', 'Doe');

-- Create budget for user
INSERT INTO Budget(income, expenses, savings, invest, user_id)
VALUES 
(100000.00, 50000.00, 5000.00, 5000.00, 1);

-- Insert data into Asset table
INSERT INTO Asset (name, boughtFor, currentValue, asset_type_id, user_id)
VALUES 
('House', 300000.00, 320000.00, 1,1), 
('Tesla Stock', 5000.00, 7000.00, 2,1), 
('Car', 25000.00, 18000.00, 3,1);

-- Insert data into Recurring_expense table
INSERT INTO Recurring_expense (amount, description, category_id, user_id)
VALUES 
(8000, 'Lynwood apartment rent', 1, 1),
(800, 'Telkom fibre', 4, 1),
(50.00, 'Meredez cover', 6, 1); 

-- Insert data into Recurring_income table
INSERT INTO Recurring_income (amount, description, category_id, user_id)
VALUES 
(35000.00, 'Monthly salary',  1, 1), 
(250.00, 'Rental income',5, 1), 
(100.00, 'Dividends Coca Cola', 7, 1); 


-- Insert data into Investment table
INSERT INTO Investment (description, invested, currentValue, category_id, user_id)
VALUES 
('ABSA stocks', 100000, 120000, 1, 1),
('Apple stocks', 500, 1000, 1, 1),
('Coca Cola stocks', 1000, 3000, 1, 1);

-- Insert data into Bank_account table
INSERT INTO Bank_account (description, balance, category_id, bank_id, user_id)
VALUES 
('Investec Youth Account', 2000.00, 3, 1, 1),
('ABSA student account', 1500.00, 2, 2, 1); 
