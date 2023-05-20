DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db; 

CREATE TABLE departments (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    department_name VARCHAR(30)
); 

CREATE TABLE roles (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL (9,2),
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES departments(id)
); 

CREATE TABLE employees (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    first_name VARCHAR(30) NOT NULL, 
    last_name VARCHAR(30) NOT NULL,
    employee_role INT,
    FOREIGN KEY (employee_role)
    REFERENCES roles(id),
    manager VARCHAR(30)
); 