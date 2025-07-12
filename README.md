## 📚 Book Management App
A full-stack Node.js web application that allows users to manage books, authenticate with Google OAuth or email/password, and store data securely in a PostgreSQL database. Book data is fetched from the Open Library API, and user interactions are captured through dynamic forms.
<br>


## 🔧 Features
🔐 User authentication with:

- Email/password using bcrypt

- Google OAuth via Passport.js

📖 Book management using Open Library API

💾 Book and contact form data stored in PostgreSQL

🔄 Session-based login with express-session

🌐 Dynamic front-end using EJS templates

📬 Contact form saves user queries in the database

## 🛠️ Tech Stack

Frontend :	HTML, CSS, JavaScript, EJS <br>
Backend :Node.js, Express.js <br>
Database :	PostgreSQL<br>
Auth :	Passport.js (Google OAuth), bcrypt<br> 
API	: Open Library API


## 🚀 Installation
1️⃣ Clone the Repository

git clone https://github.com/yourusername/book-management-app.git <br>
cd book-management-app
<br>
<br>
2️⃣ Install Dependencies

npm install
<br>
## 🔐 Setup Environment Variables

Create a .env file in the root directory and add:

PORT=3000

### PostgreSQL
DB_USER=postgres <br>
DB_HOST=localhost<br>
DB_NAME=your_database_name<br>
DB_PASSWORD=your_database_password

### Authentication
SALT_ROUNDS=10 <br>
SECRET=your_session_secret

### Google OAuth
CLIENT_ID=your_google_client_id
CLIENT_SECRET=your_google_client_secret

## 🗄️ PostgreSQL Database Setup
Run the following SQL commands to create necessary tables:


CREATE TABLE book (  <br>
  id SERIAL PRIMARY KEY, <br>
  title TEXT,<br>
  author TEXT,<br>
  isbn TEXT UNIQUE<br>
);<br>

CREATE TABLE user_contacts ( <br>
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
);


### Start the Server

npm start <br>
App will run at: http://localhost:3000
