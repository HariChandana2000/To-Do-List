const bodyParser = require("body-parser");
const express = require("express");

const date = require(__dirname + "\\date.js");

const newItems = [];
const workItems = [];

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function(req, res) {
  const day = date.getDate();
  res.render("list", {listTitle: day, Items: newItems});
});


app.get("/work", function (req, res) {
  res.render("list", {listTitle: "Work List", Items: workItems});
});

app.get("/about", function (req, res) {
  res.render("about");
})


app.post("/work", function (req, res) {
  workItems.push(req.body.item);
  res.redirect("/");
});

app.post("/", function (req, res) {
  if(req.body.list == "Work") {
    workItems.push(req.body.item);
    res.redirect("/work");
  }

  else {
    newItems.push(req.body.item);
    res.redirect("/");
  }
});

app.listen(3000, function() {
  console.log("Server started on the port: 3000");
});
