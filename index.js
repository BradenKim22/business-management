const mysql = require("mysql2");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "business_db",
});

function init() {
    inquirer.createPromptModule({
        name: "begin",
        type: "list",
        message: "What action do you want to make?",
        choices: [
            "View departments",
            "View roles",
            "View employees",
            "Add department",
            "Add role",
            "Add employee",
            "Update employee role",
            "Exit",
        ],
    })
    .then((input) => {
        switch (input.begin) {
            case "View departments":
                viewDepartments();
                break;
            case "View roles":
                viewRoles();
                break;
            case "View employees":
                viewEmployees();
                break;
            case "Add department":
                addDepartment();
                break;
            case "Add role":
                addRole();
                break;
            case "Add employee":
                addEmployee();
                break;
            case "Update employee role":
                updateEmployee();
                break;
            case "Exit":
                connection.end();
                break;
            default:
                break;
        }
    })
};


init();