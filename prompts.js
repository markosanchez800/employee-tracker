const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
   
    post: 3306,
   
    user:'root',
   
    password:'password',
   
    database:'employees_DB',
});

connection.connect((err)=>{
    if(err)throw(err);
    startLogo();
    allQuestions();
});

function startLogo(){
console.log('🅴 🅼 🅿 🅻 🅾 🆈 🅴 🅴 🅼 🅰 🅽 🅰 🅶 🅴 🆁');
};

const allQuestions = () =>{
    inquirer
    .prompt(
    {
        name:'allchoices',
        type:'list',
        message:'What would you like to do?',
        choices:['View All Employees','View All Employees By Department','View All Employees By Manager','View All Departments','Add Department','Add Employee','Remove Employee','Update Employee Role','Update Employee Manager','View All Roles','Add Role','Remove Role','Exit'],
    })
    .then((response)=>{
        switch(response.allchoices){
            case 'View All Employees':
                viewAllEmp();
                break;

            case 'View All Employees By Department':
                viewByDep();
                break;

            case 'View All Employees By Manager':
                viewByMan();
                break;

            case 'View All Departments':
                viewDeps();
                break;

            case 'Add Department':
                addDep();
                break;

            case 'Add Employee':
                addEmp();
                break;

            case 'Remove Employee':
                remEmp();
                break;

            case 'Update Employee Role':
                updateEmpRole();
                break;

            case 'Update Employee Manager':
                updateEmpMan();
                break;

            case 'View All Roles':
                viewRoles();
                break;

            case 'Add Role':
                addRole();
                break;

            case 'Remove Role':
                removeRole();
                break;

            case 'Exit':
                connection.end();
                break;
        }

    });
};

const viewAllEmp = () => {
   connection.query(
       `SELECT employee.employee_id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, CONCAT(a.first_name," ",a.last_name) AS manager FROM employee 
       LEFT JOIN employee a ON a.employee_id = employee.manager_id
       LEFT JOIN role ON employee.role_id = role.role_id 
       LEFT JOIN department ON role.department_id = department.department_id 
   `,
   (err,res) => {
        if(err)throw(err);
        console.table(res);
        allQuestions();
    });
};

const viewDeps = () => {
    connection.query(
        `SELECT * FROM department`,
        (err,res) => {
            if(err)throw(err);
            console.table(res);
            allQuestions();
        });
};