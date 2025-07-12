## 📚 Book Management App
A full-stack Node.js web application that allows users to manage books, authenticate with Google OAuth or email/password, and store data securely in a PostgreSQL database. Book data is fetched from the Open Library API, and user interactions are captured through dynamic forms.
<br>


## 🔧 Features
🔐 User authentication with:

Email/password using bcrypt

Google OAuth via Passport.js

📖 Book management using Open Library API

💾 Book and contact form data stored in PostgreSQL

🔄 Session-based login with express-session

🌐 Dynamic front-end using EJS templates

📬 Contact form saves user queries in the database

## 🛠️ Tech Stack

Frontend	HTML, CSS, JavaScript, EJS
Backend	Node.js, Express.js
Database	PostgreSQL
Auth	Passport.js (Google OAuth), bcrypt
API	Open Library API


## 🚀 Installation
1️⃣ Clone the Repository

git clone https://github.com/yourusername/book-management-app.git
cd book-management-app
<br>
2️⃣ Install Dependencies

npm install
<br>
## 🔐 Setup Environment Variables

Create a .env file in the root directory and add:

PORT=3000

# PostgreSQL
DB_USER=postgres
DB_HOST=localhost
DB_NAME=your_database_name
DB_PASSWORD=your_database_password

# Authentication
SALT_ROUNDS=10
SECRET=your_session_secret

# Google OAuth
CLIENT_ID=your_google_client_id
CLIENT_SECRET=your_google_client_secret

## 🗄️ PostgreSQL Database Setup
Run the following SQL commands to create necessary tables:

sql
Copy
Edit
CREATE TABLE book (
  id SERIAL PRIMARY KEY,
  title TEXT,
  author TEXT,
  isbn TEXT UNIQUE
);

CREATE TABLE user_contacts (
  id SERIAL PRIMARY KEY,
  name TEXT,
  email TEXT,
  address TEXT,
  contactNo TEXT,
  queries TEXT
);

CREATE TABLE userdata (
  id SERIAL PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE,
  password TEXT
);

<br>
## 🏃‍♂️ Start the Server

npm start <br>
App will run at: http://localhost:3000
