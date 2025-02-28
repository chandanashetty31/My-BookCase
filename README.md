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
<b>Clone the repository:</b>
<br>
git clone <repository-url>
cd <repository-folder>
<br>
<b>Install dependencies</b>
  <br>
npm install
<br>
<b>Create a .env file in the root directory and add:</b>
  <br>
PORT=3000<br>
DB_USER=postgres<br>
DB_HOST=localhost<br>
DB_NAME=your_database_name<br>
DB_PASSWORD=your_database_password<br>
SALT_ROUNDS=10<br>
SECRET=your_session_secret<br>
CLIENT_ID=your_google_client_id<br>
CLIENT_SECRET=your_google_client_secret<br>
<br>
  Set up PostgreSQL Database <br>
CREATE TABLE book (<br>
    id SERIAL PRIMARY KEY,<br>
    title TEXT,<br>
    author TEXT,<br>
    isbn TEXT UNIQUE<br>
);

CREATE TABLE user_contacts (<br>
    id SERIAL PRIMARY KEY,<br>
    name TEXT,<br>
    email TEXT,<br>
    address TEXT,<br>
    contactNo TEXT,<br>
    queries TEXT<br>
);

CREATE TABLE userdata (<br>
    id SERIAL PRIMARY KEY,<br>
    name TEXT,<br>
    email TEXT UNIQUE,<br>
    password TEXT<br>
);<br>
<br>

<b>Start the server:<b>
<br>
npm start
<br>
The server will run at http://localhost:3000

