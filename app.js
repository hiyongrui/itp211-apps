var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,"public")));

app.set("views" , path.join(__dirname,"views"));
app.set("view engine", "ejs");

var studentsController = require("./controllers/studentsController");

app.get("/", studentsController.list);
app.get("/edit/:id",studentsController.editRecord); //just edit form only , not saving anything
app.post("/new",studentsController.insert) //create new record when ejs click , trigger http post
app.post("/edit/:id",studentsController.update);
app.delete("/:id",studentsController.delete);

app.listen(3000);