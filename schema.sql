CREATE DATABASE IF NOT EXISTS employees_db;

USE employees_db;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS department;

CREATE TABLE department
(
department_id INT PRIMARY KEY AUTO_INCREMENT,
name          VARCHAR(30) NOT NULL
);

CREATE TABLE role 
(
role_id       INT PRIMARY KEY AUTO_INCREMENT,
title         VARCHAR(30),
salary        DECIMAL(10, 2),
department_id INT NOT NULL,
FOREIGN KEY fk_role_department(department_id)
           REFERENCES department(department_id)
           ON UPDATE CASCADE
           ON DELETE NO ACTION
);


CREATE TABLE employees 
(
employee_id INT PRIMARY KEY AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT NOT NULL,
FOREIGN KEY fk_employees_role(role_id)
			REFERENCES role(role_id)
            ON UPDATE CASCADE
            ON DELETE NO ACTION,
manager_id INT,
FOREIGN KEY fk_employees_employees(manager_id)
            REFERENCES employees(employee_id)
			ON UPDATE CASCADE
            ON DELETE NO ACTION
)


