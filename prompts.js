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
            case 'View All Employees': //done
                viewAllEmp();
                break;

            case 'View All Employees By Department':
                viewByDep();
                break;

            case 'View All Employees By Manager':
                viewByMan();
                break;

            case 'View All Departments': //done
                viewDeps();
                break;

            case 'Add Department': //min req !!!!
                addDep();
                break;

            case 'Add Employee': //min req !!!!!
                addEmp();
                break;

            case 'Remove Employee':
                remEmp();
                break;

            case 'Update Employee Role': // min req !!!!
                updateEmpRole();
                break;

            case 'Update Employee Manager':
                updateEmpMan();
                break;

            case 'View All Roles': //done
                viewRoles();
                break;

            case 'Add Role': //min req !!!!
                addRole();
                break;

            case 'Remove Role':
                removeRole();
                break;

            case 'Exit': //done
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

const viewRoles = () => {
    connection.query(
        `SELECT * FROM role`,
        (err,res) => {
            if(err)throw(err);
            console.table(res);
            allQuestions();
        });
};

const addRole = () => {
    inquirer
    .prompt([
        {
            name: 'title',
            type:'input',
            message:'Whats the role'
        },
        {
            name:'salary',
            type:'input',
            message:'Salary in integer form: '
        },
        {
            name:'department_id',
            type:'input',
            message:'Department ID of the role?'
        }
    ])
        .then((response)=>{
           connection.query(
                `INSERT INTO role (title,salary,department_id) VALUES ("${response.title}",${response.salary},${response.department_id})`,
                (err,res)=> { 
                if(err)throw(err);
                console.log(`${response.title} added!`);
                allQuestions();
         });
        });
    };

    const addDep = () => {
        inquirer
        .prompt([
           {
               name:'department',
               type:'input',
               message:'What is the new department called?'
           } 
        ])
           .then((response)=>{
               connection.query(
               `INSERT INTO department (name) VALUES ("${response.department}")`,
               (err,res)=>{
                   if(err)throw(err);
                   console.log(`${response.department} added!`);
                   allQuestions();
               });
           });  
    };

    const addEmp = () => {
        inquirer
        .prompt([
            {
                name:'firstname',
                type:'input',
                message:'Employees first name?'
            },
            {
                name:'lastname',
                type:'input',
                message:'Employees last name?'
            },
            {
                name:'roleid',
                type:'input',
                message:'Employees role id? (Reference Employee Chart)'
            },
            {
                name:'managerid',
                type:'input',
                message:'Employees managers id? (Reference Employee Chart)'
            },
        ])
        .then((response)=>{
            connection.query(
                `INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ("${response.firstname}","${response.lastname}",${response.roleid},${response.managerid})`,
                (err,res)=>{
                    if(err)throw(err);
                    console.log(`${response.firstname} ${response.lastname} added!`);
                    allQuestions();
                }
            )
        })
    }
 
// const viewByDep = () => {
//     let query = `SELECT * FROM employee WHERE department_id = ${}`
//     connection.query()
// }

