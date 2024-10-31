# FinanceTrack

## Description
A personal finance manager that helps users track their income, expenses, savings, and investments. Built with Express, React, and MySQL.

## Table of Contents
- [Features](#features)
- [Installation](#installation)

## Features
- Track income and expenses
- Manage bank accounts and investments
- Set saving goals
- Generate reports and visualizations of financial data
- User authentication and secure data handling

## Installation
To get a local copy up and running, follow these steps:
.env file for backend:
```javascript
USERNAME="username"  //Your SQL Server username
PASSWORD="password1234"  //Your SQL server password
SERVER="YourPC\SQLEXPRESS"  //Your SQL server name
SECRET="Ron Weasley"   //Used for express sessions
PORT=3001
MODE="DEVELOPMENT"

### Prerequisites
- Node.js
- MySQL
- SQL Server Management Studio

### Clone the repository
```bash
git clone https://github.com/yourusername/financetrack.git](https://github.com/alex-vdboogaard/FinanceTrack.git
cd FinanceTrack
cd backend
npm install
nodemon index.js
cd ../frontend
npm install
npm run dev
