DROP DATABASE IF EXISTS employees_db;

USE employees_db;

INSERT INTO department(name) 
VALUES('Finance & Accounting'),
	  ('Human Resourses'),
      ('Contracts'),
      ('Purchasing');





INSERT INTO role(title, salary, department_id)
VALUES('Finance Manager', 70850, 1),
      ('HR Manager', 62895, 2),
      ('Contracts Clerk', 46260, 3),
      ('Purchaser', 52082, 4);



INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES('Allan', 'Bareford', 2, NULL),
      ('Ariel', 'Zachary', 1, NULL)
