const Project = require("../models/project");

const project_index = (req, res) => {
  Project.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("projects/index", { title: "All Projects", projects: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

const project_details = (req, res) => {
  const id = req.params.id;
  Project.findById(id)
    .then((result) => {
      res.render("projects/details", {
        project: result,
        title: "Project Details",
      });
    })
    .catch((err) => {
      res.status(404).render("404", { title: "Project not found" });
    });
};

const project_create_get = (req, res) => {
  res.render("projects/create", { title: "Create a new blog" });
};

const project_create_post = (req, res) => {
  const project = new Project(req.body);

  project
    .save()
    .then((result) => {
      res.redirect("/projects");
    })
    .catch((err) => {
      console.log(err);
    });
};

const project_delete = (req, res) => {
  const id = req.params.id;
  Project.findByIdAndDelete(id)
    .then((result) => {
      // on ne peut pas faire une simple redirection sur node lorsqu'on injecte du javascript pour écouter un évènement, il faut envoyer à la place un objet json via API au navigateur avec une propriété de redirection.
      res.json({ redirect: "/projects" });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  project_index,
  project_details,
  project_create_get,
  project_create_post,
  project_delete,
};
