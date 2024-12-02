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

INSERT INTO Credit_Score (year, month, score, user_id) 
VALUES 
(2024, 1, 750, 1),
(2024, 2, 770, 1),
(2024, 3, 760, 1);

INSERT INTO Reminder (reminder_date, message) 
VALUES 
('2024-12-01 09:00:00', 'Start preparing the financial report.'),
('2024-12-05 14:00:00', 'Complete and submit the project assignment.'),
('2024-12-10 18:00:00', 'Finalize the presentation for the client.');

INSERT INTO Task (title, description, link, user_id, reminder_id) 
VALUES 
('Prepare Financial Report', 'Prepare the monthly financial report for submission.', NULL, 1, 1),
('Submit Project Assignment', 'Submit the project assignment before the deadline.', 'https://submission-link.com', 1, 2),
('Client Presentation', 'Prepare and deliver the client presentation.', 'https://presentation-link.com', 1, 3);

INSERT INTO Notification (link, title, description, user_id) 
VALUES 
('http://localhost:5173/loan/1', 'Monthly Financial Report', 'Your monthly financial report is ready.', 1),
('http://localhost:5173/loan/1', 'Project Assignment Due', 'Reminder to submit your project assignment by the deadline.', 1),
('http://localhost:5173/loan/1', 'Client Presentation Scheduled', 'The client presentation is scheduled for next week.', 1);

INSERT INTO `Credit_Score_History` (`user_id`, `year`, `month`, `score`, `notes`) 
VALUES
(1, 2024, 1, 720, 'Credit utilisation over 75%'),
(1, 2024, 2, 725, 'No missed payments reported this month'),
(1, 2024, 3, 715, 'Missed credit payment to Woolies'),
(1, 2024, 4, 730, 'Reduced credit utilisation to 50%'),
(1, 2024, 5, 735, 'Cleared outstanding personal loan'),
(1, 2024, 6, 740, 'No hard credit checks this month'),
(1, 2024, 7, 738, 'Credit utilisation increased to 65%'),
(1, 2024, 8, 742, 'Consistently paid all bills on time'),
(1, 2024, 9, 735, 'Missed credit payment to Edgars'),
(1, 2024, 10, 737, 'Closed an old credit card account'),
(1, 2024, 11, 740, 'Reduced overall debt by 20%'),
(1, 2024, 12, 745, 'Excellent payment history maintained');

INSERT INTO Tag (name, colour) VALUES
('Income', '#4CAF50'),    
('Expenses', '#FF9800'),    
('Investments', '#3F51B5'), 
('Taxes', '#F44336'),      
('Savings', '#8BC34A'),    
('Loans', '#9C27B0'),      
('Retirement', '#607D8B'),  
('Bills', '#FF5722');    
INSERT INTO `Folder` (name, parent_folder_id, user_id, tag_id) 
VALUES 
('Tax 2024', null, 1, 4),
('Tax 2023', null, 1, 4),
('Tax 2022', null, 1, 4);

INSERT INTO `Statement` (name, pdf_blob, user_id, folder_id)
VALUES
('Tax Q1', 'blob:http://localhost:5173/947b5aa6-6444-41f2-9cb7-31a86c72c626', 1, null),
('Tax Q2', 'blob:http://localhost:5173/947b5aa6-6444-41f2-9cb7-31a86c72c626', 1, 1),
('Tax Q3', 'blob:http://localhost:5173/947b5aa6-6444-41f2-9cb7-31a86c72c626', 1, 2);
   


