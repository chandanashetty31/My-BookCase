import axios from "axios";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth2";
import { dirname } from "path";
import pg from "pg";
import { fileURLToPath } from "url";


const app = express();
const port = 3000;
dotenv.config();
console.log(process.env);
const saltRounds = parseInt(process.env.SALT_ROUNDS);
app.use(
  session({
    secret:process.env.secret ,
    resave: false,
    saveUninitialized: true,
  })
);

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(passport.initialize());
app.use(passport.session());

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: process.env.database,
  password: process.env.password,
  port: 5432,
});
db.connect();

app.set("view engine", "ejs");

//  Middleware to check authentication
function isAuthenticated(req, res, next) {
  if (req.session.user) {
    next(); 
  } else {
    res.redirect("/login");
  }
}


app.get("/books", isAuthenticated, async (req, res) => {
  const books = ["9788172234980", "9781786330895","9781493724284"];

  try {
    const bookPromises = books.map((isbn) =>
      axios.get(
        `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`
      )
    );

    const responses = await Promise.all(bookPromises);

    const booksData = responses.map((response, index) => {
      const bookKey = `ISBN:${books[index]}`;
      const book = response.data[bookKey];

      return {
        title: book.title,
        authors: book.authors
          ? book.authors.map((a) => a.name).join(", ")
          : "Unknown",
        cover: book.cover
          ? book.cover.medium
          : "https://via.placeholder.com/150",
        isbn: books[index],
      };
    });
    for (const bookData of booksData) {
      const res = await db.query("SELECT * FROM book WHERE isbn = $1", [bookData.isbn]);

      if (res.rows.length === 0) {
        await db.query(
          "INSERT INTO book ( title, author, isbn) VALUES ($1, $2, $3)",
          [ bookData.title, bookData.authors,bookData.isbn]
        );
      }
    }


    console.log("Books stored in database:", booksData);
    res.render("index", {
      books: booksData,
      title: booksData[0].title,
      author: booksData[0].authors,
      cover: booksData[0].cover,
      title_2: booksData[1].title,
      author_2: booksData[1].authors,
      cover_2: booksData[1].cover,
      title_3: booksData[2].title,
      author_3: booksData[2].authors,
      cover_3: booksData[2].cover,
    });
  } catch (error) {
    console.error("Error fetching book data:", error);
    res.status(500).send("Error fetching books");
  }
});
app.get("/alchemist", (req, res) => {
  res.sendFile(__dirname + "/views/alchemistNotes.html");
});

app.get("/ikigai", (req, res) => {
  res.sendFile(__dirname + "/views/ikigai.html");
});
app.get("/blackbeauty", (req, res) => {
  res.sendFile(__dirname + "/views/blackbeauty.html");
});
app.get("/signup", (req, res) => {
  res.sendFile(__dirname + "/views/sign-up.html");
});
app.get("/login",(req, res) => {
  res.sendFile(__dirname + "/views/login.html");
});

app.get("/contactme", (req, res) => {
  res.sendFile(__dirname + "/views/contact.html");
});
app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/views/about.html");
});


app.post("/submit", async (req, res) => {
  console.log(req.body);
  const { Name, Email, Address, ContactNo, Queries } = req.body;

  try {
    const result = await db.query(
      "INSERT INTO user_contacts (name, email, address, contactNo, queries) VALUES ($1, $2, $3, $4, $5)",
      [Name, Email, Address, ContactNo, Queries]
    );

    res.status(201).send("Form submitted successfully");
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).send("Internal server error");
  }
});

// ✅ Login Route
app.post("/logedin", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  try {
    const result = await db.query("SELECT * FROM userdata WHERE email = $1", [
      email,
    ]);

    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedHashPassword = user.password;

      bcrypt.compare(password, storedHashPassword, (err, match) => {
        if (err) {
          console.error("Error comparing passwords:", err);
          res.status(500).send("Server error");
        } else {
          if (match) {
            // Store user in session after successful login
            req.session.user = { id: user.id, email: user.email, name: user.name };
            res.redirect("/books");
          } else {
            res.send("Incorrect Password");
          }
        }
      });
    } else {
      res.send("User not found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get(
  "/auth/google/books",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    req.session.user = req.user; // Store user in session manually
    res.redirect("/books"); 
  }
);

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.client_id,
      clientSecret:process.env.client_secret,
      callbackURL: "http://localhost:3000/auth/google/books",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        console.log(profile);
        const result = await db.query("SELECT * FROM userdata WHERE email = $1", [
          profile.email,
        ]);
        if (result.rows.length === 0) {
          const newUser = await db.query(
            "INSERT INTO userdata (name ,email, password) VALUES ($1,$2, $3)",
            [profile.displayName,profile.email, "google"]
          );
          return cb(null, newUser.rows[0]);
        } else {
          return cb(null, result.rows[0]);
        }
      } catch (err) {
        return cb(err);
      }
    }
  )
);

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error logging out:", err);
    }
    res.redirect("/login"); 
  });
});


app.post("/signedup", async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;

  try {
    const checkResult = await db.query("SELECT * FROM userdata WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      res.send("Email already exists. Try logging in.");
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          await db.query("INSERT INTO userdata (name ,email, password) VALUES ($1, $2, $3)", [name, email, hash]);
          res.redirect("/login");
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
