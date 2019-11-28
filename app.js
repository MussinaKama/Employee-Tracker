const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table")

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "employees_db"
});


connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Add Department",
        "Add Employee Role",
        "Add Employee",
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "View Employees by Manager",
        "Update Employee Role",
        "Update Employee Manager",
        "Delete Department",
        "Delete Employee Role",
        "Delete Employee"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "Add Department":
        addDept();
        break;

      case "Add Employee Role":
        addRole();
        break;

      case "Add Employee":
        addEmployee();
        break;

      case "View All Departments":
        getAllDepts();
        break;

      case "View All Roles":
        getAllRoles();
        break;

        case "View All Employees":
        getAllEmployees();
        break;

        case "Update Employee Role":
        updateRole();
        break;

        case "Update Employee Manager":
        updateRole();
        break;

        case "Delete Department":
        updateRole();
        break;

        case "Delete Employee Role":
        updateRole();
        break;

        case "Delete Employee":
        updateRole();
        break;
      }
    });
}

function allDept() {

}

function addRole() {

}