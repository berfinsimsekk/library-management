# Library Management System

## Overview

This project is a Library Management System that allows users to borrow and return books, view their borrowing history, and manage book ratings. It uses Node.js for the backend and Sequelize with MySQL for database operations. Redis is used as a caching layer to improve performance, particularly for frequently accessed data such as book listings and specific book details. Redis helps reduce the load on the database by storing and quickly retrieving cached data. If Redis is not connected, the system falls back to database queries without disrupting the application's functionality.

## Features

- **User Management**: Create and list users.
- **Book Management**: Add and list books.
- **Borrowing Management**: Borrow and return books, including managing user ratings for books.
- **View User Details**: Retrieve user information, including borrowed books and their ratings.


## Setup

### Clone the Repository

```bash
git clone https://github.com/berfinsimsekk/library-management.git
cd library-management
npm install
```

### Environment Variables

Change environment variables inside exampleenv file with yours and change the file name to .env

### Redis Setup
1. Install Redis(if not already installed):

   On macOS, you can use Homebrew:
     ```sh
     brew install redis
     ```
   On Ubuntu, you can use APT:
     ```sh
     sudo apt update
     sudo apt install redis-server
2. Start Redis server:

   On macOS:
     ```sh
     redis-server
     ```
    On Ubuntu:
     ```sh
     sudo service redis-server start
     ```
### Start MySQL

1. Start MySQL:

   On macOS:
     ```sh
     brew services start mysql
     ```
   On Ubuntu:
     ```sh
     sudo service mysql start
     ```


## Run the Application

Run the following command to start the application.

```bash
node server.js
```
