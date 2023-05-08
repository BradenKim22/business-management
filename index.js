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
    inquirer.prompt({
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

// view departments
const viewDepartments = () => {
    let query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        init();
    });
};

// view roles
const viewRoles = () => {
    let query = "SELECT role.title, role.salary, role.id, department.name AS department FROM role RIGHT JOIN department ON role.department_id = department.id";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        init();
    });
};

// view employees
const viewEmployees = () => {
    let query = "SELECT employee.id AS employee_id, employee.first_name, employee.last_name, role.title AS job, department.name AS department, role.salary, t4.first_name AS manager FROM role INNER JOIN employee ON role.id = employee.role_id INNER JOIN department ON department.id = role.department_id INNER JOIN employee t4 ON employee.manager_id = t4.id";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        init();
    });
};

// add department
const addDepartment = () => {
    inquirer.prompt([
        {
            name: "departmentName",
            type: "input",
            message: "New Department Name?",
        }
    ]).then( function (answer) {
        connection.query("INSERT INTO department SET ?",
        {
            name: answer.departmentName
        }),        
        init();
    });
};

// add roles
const addRole = () => {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw (err);
        inquirer.prompt([
            {
                name: "roleName",
                type: "input",
                message: "New Role Name?",
            },
            {
                name: "salary",
                type: "input",
                message: "Salary for the New Role?",
            },
            {
                name: "departmentID",
                type: "list",
                choices: function () {
                    return res.map((department) => ({ name: department.name, value: department.id }))
                },
                message: "Select the Department for the New Role.",
            },
        ]).then( function (answer) {
            connection.query("INSERT INTO role SET ?",
            {
                title: answer.roleName,
                salary: answer.salary,
                department_id: answer.departmentID,
            }),
            init();
        });
    });
};

// add employees
const addEmployee = () => {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw (err);
        inquirer.prompt([
            {
                name: "firstName",
                type: "input",
                message: "First Name?",
            },
            {
                name: "lastName",
                type: "input",
                message: "Last Name?",
            },
            {
                name: "roleID",
                type: "list",
                choices: function () {
                    return res.map((role) => ({ name: role.title, value: role.id }))
                },
                message: "Select the Role",
            },
            {
                name: "managerID",
                type: "input",
                message: "Manager ID?",
            },
        ]).then( function (answer) {
            connection.query("INSERT INTO employee SET ?",
            {
                first_name: answer.firstName,
                last_name: answer.lastName,
                role_id: answer.roleID,
                manager_id: answer.managerID,
            }),

            init();

        });
    });
};

// update employee roles
const updateEmployee = () => {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw (err);
        inquirer.prompt([
            {
                name: "employeeID",
                type: "list",
                choices: function () {
                    return res.map((employee) => ({ name: employee.first_name, value: employee.id }))
                },
                message: "Employee ID?",
            },
            {
                name: "updateEmployee",
                type: "list",
                choices: function () {
                    return res.map((role) => ({ name: role.title, value: role.id }))
                },
                message: "Update the Employee Role",
            },
        ]).then( function (answer) {
            connection.query("UPDATE employee SET ? WHERE ?", [
                { role_id: answer.updateEmployee },
                { id: answer.employeeID },
            ]);
            init();
        });
    });
};


init();