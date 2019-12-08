CREATE DATABASE IF NOT EXISTS employees_db;

USE employees_db;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS department;

CREATE TABLE department
(
department_id INT PRIMARY KEY AUTO_INCREMENT,
name          VARCHAR(30) NOT NULL
CONSTRAINT fk_role_department FOREIGN KEY (id)
           REFERENCES role(department_id)
);

CREATE TABLE role 
(
role_id       INT PRIMARY KEY AUTO_INCREMENT,
title         VARCHAR(30),
salary        DECIMAL(10, 2),
department_id INT NOT NULL,
CONSTRAINT fk_role_department FOREIGN KEY (department_id)
           REFERENCES department(department_id)
           ON UPDATE CASCADE
           ON DELETE CASCADE,
);


CREATE TABLE employees 
(
employee_id INT PRIMARY KEY AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT NOT NULL,
CONSTRAINT fk_employees_role  FOREIGN KEY (role_id)
			REFERENCES role(role_id)
            ON UPDATE CASCADE
            ON DELETE CASCADE,
manager_id INT DEFAULT NULL,
CONSTRAINT fk_employees_employees FOREIGN KEY (manager_id)
            REFERENCES employees(employee_id)
			ON UPDATE CASCADE
            ON DELETE RESTRICT
)


