-- Insert data into User table
use FinanceTrack;

INSERT INTO `User` (username, password, first_name, last_name)
VALUES 
('test', '$2b$10$BVKfXEk6k90jDRSIldm1se60t4hIzggxdN5AiOxFRRLLYf7Z86Wfm', 'John', 'Cena');

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
(500.00, 'Meredez cover', 6, 1), 
(1200.00, 'Water and lights', 3, 1),
(850, 'CAMAF', 7, 1); 

-- Insert data into Recurring_income table
INSERT INTO Recurring_income (amount, description, category_id, user_id)
VALUES 
(30000.00, 'Monthly salary',  1, 1), 
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

INSERT INTO Monthly_Review (income, expenses, savings, invested, user_id, month, year) 
VALUES
(100000, 50000, 10000, 2100, 1, 1, 2024),
(100000, 45000, 9000, 1500, 1, 2, 2024),
(100000, 52500, 8000, 1200, 1, 3, 2024),
(100000, 50000, 11000, 2999, 1, 4, 2024),
(100000, 49020, 10000, 1000, 1, 5, 2024),
(100000, 50000, 11000, 2999, 1, 6, 2024),
(100000, 50000, 11000, 2999, 1, 7, 2024),
(100000, 50000, 11000, 2999, 1, 8, 2024),
(100000, 50000, 11000, 2999, 1, 9, 2024),
(100000, 50000, 11000, 2999, 1, 10, 2024),
(100000, 50000, 11000, 2999, 1, 11, 2024),
(100000, 50000, 11000, 2999, 1, 12, 2024);

INSERT INTO Loan (name, loan_amount, balance, monthly_repayment, term, interest_rate, first_payment, category_id, user_id, bank_id) VALUES
('Car Loan', 150000.00, 100000.00, 3000.00, 60, 7.5000, '2024-01-15 00:00:00', 3, 1, 2),
('Home Renovation Loan', 100000.00, 50000.00, 2500.00, 24, 6.2000, '2024-02-01 00:00:00', 2, 1, 1);



