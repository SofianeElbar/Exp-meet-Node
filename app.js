const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const projectRoutes = require("./routes/projectRoutes");

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
app.use(express.urlencoded({ extended: true }));

//Obtain details of the request with middeleware
// app.use((req, res, next) => {
//   console.log("new request made ->");
//   console.log("host :", req.hostname);
//   console.log("path :", req.path);
//   console.log("method :", req.method);
//   next();
// });
app.use(morgan("dev"));

//mongoose and mongo sandbox routes
// app.get("/add-project", (req, res) => {
//   const project = new Project({
//     title: "new project 2",
//     snippet: "about my new project",
//     body: "details of my new project",
//   });

//   project
//     .save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get("/all-projects", (req, res) => {
//   Project.find()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get("/single-project", (req, res) => {
//   Project.findById("65242202d6dfbb70d8ad6631")
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// Website routes
app.get("/", (req, res) => {
  res.redirect("/projects");
});

app.get("/about", (req, res) => {
  //   res.send("<p>about page</p>");
  //   res.sendFile("./views/about.html", { root: __dirname });
  res.render("about", { title: "About" });
});

//redirects
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

// project routes
// On scope "/projects" pour ne pas avoir à le rajouter dans projectRoutes.js
app.use("/projects", projectRoutes);

// 404 page
app.use((req, res) => {
  //   res.status(404).sendFile("./views/404.html", { root: __dirname });
  res.status(404).render("404", { title: "404 error" });
});
