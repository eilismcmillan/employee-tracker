require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "employees_db",
  },
  console.log(`Connected to the employees_db database.`)
);


const promptQuestions = () => {
  let questions = inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "action",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Quit",
        ],
      },
    ])
    .then((answer) => {
      const { choices } = answer;

      if (answer.action === "View All Employees") {
        viewAllEmployees();
      }

      if (answer.action === "Add Employee") {
        addEmployee();
      }

      if (answer.action === "Update Employee Role") {
        updateEmployee();
      }

      if (answer.action === "View All Roles") {
        viewAllRoles();
      }

      if (answer.action === "Add Role") {
        addRole();
      }

      if (answer.action === "View All Departments") {
        viewAllDepartments();
      }

      if (answer.action === "Add Department") {
        addDepartment();
      }

      if (answer.action === "Quit") {
        db.end();
      }
    });
};

promptQuestions();

//working
const viewAllEmployees = () => {
  console.log("Showing all employees");
  const sql = `SELECT employees.id, 
    employees.first_name, 
    employees.last_name, 
    roles.title, 
    departments.department_name AS department,
    roles.salary, 
    employees.manager AS manager
  FROM employees
  LEFT JOIN roles ON employees.employee_role = roles.id
  LEFT JOIN departments ON roles.department_id = departments.id`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
    } else {
      console.table(results);
      promptQuestions();
    }
  });
};

//working
const addEmployee = () => {
  db.query(`SELECT * FROM roles`, (err, result) => {
    if (err) throw err;

    inquirer
      .prompt([
        {
          type: "input",
          name: "firstName",
          message: "What is the employees first name?",
        },
        {
          type: "input",
          name: "lastName",
          message: "What is the employees last name?",
        },
        {
          type: "list",
          name: "role",
          message: "What is the employees role?",
          choices: () => {
            let array = [];
            for (var i = 0; i < result.length; i++) {
              array.push(result[i].title);
            }
            let newArray = [...new Set(array)];
            return newArray;
          },
        },
        {
          type: "input",
          name: "manager",
          message: "Who is the employees manager?",
        },
      ])
      .then((answers) => {
        for (let i = 0; i < result.length; i++) {
          if (result[i].title === answers.role) {
            let role = result[i];
          }
        }

        const sql = `INSERT INTO employees (first_name, last_name, employee_role, manager) VALUES (?, ?, ?, ?)`;
        db.query(sql, [answers.firstName, answers.lastName, {employee_role: answers.role}, answers.manager],
          (err, result) => {
            if (err) throw err;
            console.log(
              `Added ${answers.firstName} ${answers.lastName} to employees.`
            );
            viewAllEmployees();
            promptQuestions();
          }
        );
      });
  });
};

const updateEmployee = () => {
  db.query(`SELECT * FROM employees, roles`, (err, result) => {
    if (err) throw err;

    inquirer
      .prompt([
        {
          type: "list",
          name: "updatedEmployee",
          message: "Which employees role do you want to update?",
          choices: () => {
            let array = [];
            for (let i = 0; i < result.length; i++) {
              array.push(result[i].last_name);
            }
            let employeesArray = [...new Set(array)];
            return employeesArray;
          },
        },
        {
          // Updating the New Role
          type: "list",
          name: "updatedRole",
          message: "What is their new role?",
          choices: () => {
            var array = [];
            for (var i = 0; i < result.length; i++) {
              array.push(result[i].title);
            }
            var newArray = [...new Set(array)];
            return newArray;
          },
        },
      ])
      .then((answers) => {
        // Comparing the result and storing it into the variable
        for (let i = 0; i < result.length; i++) {
          if (result[i].last_name === answers.UpdatedEmployee) {
            let name = result[i];
          }
        }

        for (let i = 0; i < result.length; i++) {
          if (result[i].title === answers.updatedRole) {
            let role = result[i];
          }
        }

        const sql = `UPDATE employees SET ? WHERE ?`;
        db.query(sql, [{employee_role: answers.updatedRole}, {last_name: answers.updateEmployee}],
          (err, result) => {
            if (err) throw err;
            console.log(`Updated ${answers.updatedEmployee}'s role`);
            console.table(result)
            viewAllEmployees();
            promptQuestions();
          }
        );
      });
  });
};

//working
const viewAllRoles = () => {
  const sql = `SELECT roles.id, roles.title, roles.salary, departments.department_name AS department
  FROM roles
  INNER JOIN departments ON roles.department_id = departments.id`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Showing all roles");
      console.table(results);
      promptQuestions();
    }
  });
};

const addRole = () => {
  db.query(`SELECT * FROM departments, roles`, (err, result) => {
    if (err) throw err;

    let questions = inquirer
      .prompt([
        {
          type: "input",
          name: "newRole",
          message: "What is the name of the role?",
          validate: (title) => title.length >= 1,
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary of the role?",
        },
        {
          type: "list",
          name: "department",
          message: "Which department does the role belong to?",
          choices: () => {
            let array = [];
            for (let i = 0; i < result.length; i++) {
              array.push({
                name: result[i].department_name,
                value: result[i].department_id,
              });
            }
            let rolesArray = [...new Set(array)];
            return rolesArray;
          },
        },
      ])
      .then((answers) => {
        

        for (let i = 0; i < result.length; i++) {
          if (result[i].department_name === answers.department) {
            let department = result[i];
          }
        }
        const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;

        db.query(sql, [answers.newRole, answers.salary, answers.department], (err, result) => {
          if (err) {
            console.error(err);
          } else {
            console.log(`the new role, ${answers.newRole}, has been added`);
            viewAllRoles();
          }
        });
      });
  });
};

//working
const viewAllDepartments = () => {
  console.log("Showing all departments");
  const sql = `SELECT * FROM departments`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
    } else {
      console.table(results);
      promptQuestions();
    }
  });
};

// working
const addDepartment = () => {
  let questions = inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "What is the name of the department?",
        validate: (title) => title.length >= 1,
      },
    ])

    .then((answer) => {
      const sql = `INSERT INTO departments (department_name) VALUES (?)`;
      db.query(sql, answer.department, (err, results) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`Added ${answer.department} to departments`);
          viewAllDepartments();
        }
      });
    });
};



// TODO --> 
// FIX ADD ROLES
// FIX MANAGERS 