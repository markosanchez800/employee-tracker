# Employee Tracker

## Summary 
This project was created to help keep track of a workplace's employee and department information.  Using a combination of both the mySQL and inquirer npm packages, the application allows you to view all employees, add any sort of pertinent data, delete that same data, or update anything else all from the command line. The data will be dynamically changed and can be viewed right away via the mySQL application or any of the commands built in to the app.

## Installation
DOWNLOAD NODE.JS FROM [HERE](https://nodejs.dev/download) IF NOT ALREADY INSTALLED
```
npm install inquirer
```
```
npm install mysql
```
TO START APP:
```
node prompts.js
```

## Technologies Used
- JavaScript - Used to write all physical code, make use of npm packages, and create the functions used to give application its functionality
- Inquirer - Used to ask all questions required for specific data to be created or returned, and to see what processes to run
- MySQL - Used to hold/create databases and tables that contain all information used in app
- Node.js - Used to run application from the command line so that all processes can run through javascript
- GitHub - Used to track changes to app and push all commits

## Walkthrough Video
[YouTube](https://www.youtube.com/watch?v=FMF3f31wSOg&ab_channel=markosanchez)

## Code Snippet
View All Employees function that joins all three tables together, using foreign keys and join statements to output all necessary data based on id's
```
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
```

## Author Links
- [LinkedIn](https://www.linkedin.com/in/marko-sanchez-800)
- [GitHub](https://github.com/markosanchez800)
