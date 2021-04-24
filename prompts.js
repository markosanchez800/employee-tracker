const mysql = require('mysql');
const inquirer = require('inquirer');

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
        choices:['View All Employees','View All Employees By Department','View All Employees By Manager','Add Employee','Remove Employee','Update Employee Role','Update Employee Manager','View All Roles','Add Role','Remove Role'],
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
        }
    });
};