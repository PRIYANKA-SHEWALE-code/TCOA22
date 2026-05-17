const express = require("express");
const app = express();
const port = 8080;

const path = require("path");

const { v4: uuidv4 } = require("uuid");

const methodOverride = require("method-override");


app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

let employees = [
    {
        id: uuidv4(),
        name: "Priyanka",
        role: "ML Intern"
    },

    {
        id: uuidv4(),
        name: "Rahul",
        role: "Backend Intern"
    }
];

app.get("/employees", (req, res) => {

    res.render("index.ejs", { employees });

});

app.get("/employees/new", (req, res) => {

    res.render("new.ejs");

});

app.post("/employees", (req, res) => {

    let { name, role } = req.body;

    let id = uuidv4();

    employees.push({ id, name, role });

    res.redirect("/employees");

});

app.get("/employees/:id", (req, res) => {

    let { id } = req.params;

    let employee = employees.find((e) => e.id == id);

    res.send(employee);

});

app.get("/employees/:id/edit", (req, res) => {

    let { id } = req.params;

    let employee = employees.find((e) => e.id == id);

    res.render("edit.ejs", { employee });

});
app.patch("/employees/:id", (req, res) => {

    let { id } = req.params;

    let employee = employees.find((e) => e.id == id);

    let newRole = req.body.role;

    employee.role = newRole;

    res.redirect("/employees");

});

app.delete("/employees/:id", (req, res) => {

    let { id } = req.params;

    employees = employees.filter((e) => e.id != id);

    res.redirect("/employees");

});
app.listen(port, () => {

    console.log("Listening on port 8080");

});