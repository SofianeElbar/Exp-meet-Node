const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

// express app
const app = express();

// connect to MongoDB
const dbURI =
  "mongodb+srv://user-portfolio:<password>@cluster0.i2iq53o.mongodb.net/node-portfolio?retryWrites=true&w=majority";
mongoose.connect(dbURI);
// register view engine
app.set("view engine", "ejs");

// listen for requests
app.listen(3000);

// middleware & static files
app.use(express.static("public"));

//Obtain details of the request with middeleware
// app.use((req, res, next) => {
//   console.log("new request made ->");
//   console.log("host :", req.hostname);
//   console.log("path :", req.path);
//   console.log("method :", req.method);
//   next();
// });
app.use(morgan("dev"));

app.get("/", (req, res) => {
  // au lieu d'utiliser res.write() puis res.end(), express nous permet d'utiiser la méthode res.send() qui traduit automatiquement le type de contenu renvoyé au client, header, html/ text etc, ainsi que le status du code, 200, 404 etc.
  //   res.send("<p>home page</p>");
  //   res.sendFile("./views/index.html", { root: __dirname });
  const blogs = [
    {
      title: "Yoshi finds eggs",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "Mario finds stars",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "How to defeat bowser",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
  ];
  res.render("index", { title: "Home", blogs });
});

// app.use((req, res, next) => {
//   console.log("another middleware");
//   next();
// });

app.get("/about", (req, res) => {
  //   res.send("<p>about page</p>");
  //   res.sendFile("./views/about.html", { root: __dirname });
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});
//redirects
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

// 404 page
app.use((req, res) => {
  //   res.status(404).sendFile("./views/404.html", { root: __dirname });
  res.status(404).render("404", { title: "404 error" });
});
