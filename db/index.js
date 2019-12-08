const connection = require("./connection.js");

class DB {
	constructor(connection) {
		this.connection = connection;
	}
	createEmployee(employee) {
		return this.connection.query('INSERT INTO employees SET ?', [employee]);
	}
	createRole(role) {
		return this.connection.query('INSERT INTO role SET ?', [role]);
	}
	createDepartment(department) {
		return this.connection.query('INSERT INTO department SET ?', [department]);
	}
	getAllEmployees() {
		return this.connection.query(
			" SELECT employees.employee_id, employees.first_name, employees.last_name, role.title, department.name AS department, role.salary FROM employees LEFT JOIN role on employees.role_id = role.role_id LEFT JOIN department on role.department_id = department.department_id "
		);
	}

	getAllRoles() {
		return this.connection.query(
			' SELECT role.role_id, role.title,  role.salary, department.name AS department FROM role LEFT JOIN department on role.department_id = department.department_id'
		);
	}
    getAllDepartments() {
		return this.connection.query(
			"SELECT department.department_id, department.name AS department, role.title, role.salary  FROM department LEFT JOIN role on role.department_id = department.department_id LEFT JOIN employees ON employees.role_id = role.role_id GROUP BY department.department_id, department.name"
		);
	}
	removeEmployee(employeeId) {
		return this.connection.query('DELETE FROM  employees WHERE employee_id = ?', [employeeId]);
	}
	removeEmployeeRole(roleId) {
		return this.connection.query('DELETE FROM  role  WHERE role_id = ?', [roleId]);
	}
	removeDepartment(departmentId) {
		return this.connection.query('DELETE FROM  department WHERE department_id = ?', [departmentId]);
	}
	quit() {
		connection.end()
	}
}

module.exports = new DB(connection);