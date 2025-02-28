<h1>Book Management App</h1>
This is a Node.js web application that allows users to manage books, authenticate using Google OAuth, and store book information in a PostgreSQL database. The app provides user authentication, book storage, and contact form submissions.
<br>
<br>
<h3>Features</h3>
<br>
User authentication (Signup/Login) with bcrypt password hashing
<br>
Google OAuth authentication with Passport.js
<br>
Stores book details fetched from Open Library API
<br>
Saves user contact form submissions in a PostgreSQL database
<br>
Session-based authentication using express-session
<br>
Dynamic rendering with EJS templates
<br>
<br>
<h3>Tech Stack</h3>
<br>
Frontend: HTML, CSS, JavaScript, EJS
<br>
Backend: Node.js, Express.js
<br>
Database: PostgreSQL
<br>
Authentication: Passport.js, bcrypt, Google OAuth
<br>
APIs Used: Open Library API for book data
<br>
<br>
<h3>Installation</h3>
<br>
<h4>Steps</h4>
<br>
Clone the repository:<br>
git clone <repository-url>
cd <repository-folder>
<br>
Install dependencies<br>
npm install
<br>
Create a .env file in the root directory and add:<br>
PORT=3000
DB_USER=postgres
DB_HOST=localhost
DB_NAME=your_database_name
DB_PASSWORD=your_database_password
SALT_ROUNDS=10
SECRET=your_session_secret
CLIENT_ID=your_google_client_id
CLIENT_SECRET=your_google_client_secret
<br>
  Set up PostgreSQL Database <br>
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

Start the server:
<br>
npm start
<br>
The server will run at http://localhost:3000

