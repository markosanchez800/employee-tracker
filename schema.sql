DROP DATABASE IF EXISTS employees_DB;
CREATE DATABASE employees_DB;

USE employees_DB;

CREATE TABLE department (
    department_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    role_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(department_id) ON DELETE CASCADE
);

CREATE TABLE employee (
    employee_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    manager_id INTEGER,
    FOREIGN KEY (role_id) REFERENCES role (role_id) ON DELETE CASCADE
);


-- initial departments
INSERT INTO department (name) values ('Sales');
INSERT INTO department (name) values ('Engineering');
INSERT INTO department (name) values ('Finance');
INSERT INTO department (name) values ('Legal');

-- initial roles
INSERT INTO role (title,salary,department_id) values ('Sales Lead',100000,1);
INSERT INTO role (title,salary,department_id) values ('Salesperson',80000,1);
INSERT INTO role (title,salary,department_id) values ('Software Engineer',120000,2);
INSERT INTO role (title,salary,department_id) values ('Lead Engineer',150000,2);
INSERT INTO role (title,salary,department_id) values ('Lawyer',170000,3);
INSERT INTO role (title,salary,department_id) values ('Legal Team Lead',200000,3);
INSERT INTO role (title,salary,department_id) values ('Accountant', 100000,4);
INSERT INTO role (title,salary,department_id) values ('Head Accountant',120000,4);

-- initial employees
INSERT INTO employee (first_name,last_name,role_id,manager_id) values ('Marko','Sanchez',1,0);
INSERT INTO employee (first_name,last_name,role_id,manager_id) values ('Walter','White',2,1);
INSERT INTO employee (first_name,last_name,role_id,manager_id) values ('Symere','Woods',3,0);
INSERT INTO employee (first_name,last_name,role_id,manager_id) values ('Jane','Doe',4,3);
INSERT INTO employee (first_name,last_name,role_id,manager_id) values ('Sanna','Mo',5,1);
INSERT INTO employee (first_name,last_name,role_id,manager_id) values ('Micheal','Cera',6,2);
INSERT INTO employee (first_name,last_name,role_id,manager_id) values ('Charles','Mingus',7,3);
INSERT INTO employee (first_name,last_name,role_id,manager_id) values ('Freddie','Gibbs',8,4);
