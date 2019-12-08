const { prompt } = require("inquirer");
const db = require("./db");
const ctable = require("console.table")

 async function runSearch() {
  const { choice } = await prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        {
          name: "View All Employees",
          value: "View_Employees"
        },
        {
          name: "View All Departments",
          value: "View_Departments"
        },
        {
          name: "View All Roles",
          value: "View_Roles"
        },
        {
          name: "Add Employee",
          value: "Add_Employee"
        },
        {
          name: "Add Role",
          value: "Add_Role"
        },
        {
          name: "Add Department",
          value: "Add_Department"
        },
        {
          name: "Delete Department",
          value: "Delete_Department"
        },
        {
          name: "Delete Employee Role",
          value: "Delete_Employee_Role"
        },
        {
          name: "Delete Employee",
          value: "Delete_Employee"
        },
        {
          name: "Exit",
          value: "Exit"
        }
      ]
    }
  ]);

  switch (choice) {
    case "View_Employees":
      return viewAllEmployees();
    case "View_Departments":
      return viewAllDepartments();
    case "View_Roles":
      return viewAllRoles();
    case "Add_Employee":
      return addEmployee();
    case "Add_Role":
      return addRole();
    case "Add_Department":
      return addDepartment();
    case "Delete_Department":
      return deleteDepartment();
    case "Delete_Employee_Role":
      return deleteEmployeeRole();
    case "Delete_Employee":
      return deleteEmployee();
    default:
      return exit();
  }
}

//----------------------------VIEW ALL DEPARTMENTS--------------------------------------------//
async function viewAllDepartments() {
  const allDepartments = await db.getAllDepartments()
  console.table(allDepartments)
  await runSearch()
}

//------------------------------VIEW ALL EMPLOYEES--------------------------------------------//
async function viewAllEmployees() {
  const allEmployees = await db.getAllEmployees()
  console.table(allEmployees)
  await runSearch()
}

//---------------------------------------VIEW ALL ROLES---------------------------------------//
async function viewAllRoles() {
  const allRoles = await db.getAllRoles()
  console.table(allRoles)
  await runSearch()
}

//-------------------------------ADD NEW ROLE--------------------------------------------------//
async function addRole() {
  const departments = await db.getAllDepartments();
  const departmentChoices = departments.map(({ department_id, name }) => ({
    name: name,
    value: department_id
  }));
  const role = await prompt([
    {
      name: "title",
      message: "What is the name of the role?"
    },
    {
      name: "salary",
      message: "What is the salary of the role?"
    },
    {
      type: "list",
      name: "department_id",
      message: "Which department does the role belong to?",
      choices: departmentChoices
    }
  ]);
  await db.createRole(role);
  console.log(`Added ${role.title} to roles table`)
  const roles = await db.getAllRoles()
  console.table(roles);
  await runSearch()

}
//----------------------------------ADD NEW EMPLOYEE------------------------------------//
async function addEmployee() {
  const roles = await db.getAllRoles();
  const roleChoices = roles.map(({ role_id, title }) => ({
    name: title,
    value: role_id
  }));
  
  const employees = await db.getAllEmployees();
  const employeeChoice = employees.map(({role_id, first_name, last_name}) => ({
    value: role_id,
    name: first_name + " " + last_name,

  }))
  const employee = await prompt([
    {
      name: "first_name",
      message: "What is your first name ?"
    },
    {
      name: "last_name",
      message: "What is your last name ?"
    },
    {
      type: "list",
      name: "role_id",
      message: "What is your role ?",
      choices: roleChoices
    },
    {
      type: "list",
      name: "manager_id",
      message: "Who is your manager ?",
      choices: employeeChoice
    },
  ]);
  await db.createEmployee(employee);
  console.log(`Added ${employee.first_name, employee.last_name} to employees table`)
  console.table(employees)
  await runSearch()
}

//-------------------------------------ADD NEW DEPARTMENT-----------------------------------------//
async function addDepartment() {
  const department = await prompt([
    {
      name: "name",
      message: "What department would you like to add?"
    }
  ])

  await db.createDepartment(department)
  console.log(`Added ${department.name} to departments table`)
  const departments = await db.getAllDepartments();
  console.table(departments)
  await runSearch()
}

//-----------------------------------DELETE DEPARTMENT-------------------------------------------------//
async function deleteDepartment() {
  const departments = await db.getAllDepartments();
  const departmentChoices = departments.map(({name, department_id}) => ({
    name: name,
    value: department_id
  }))

  const departmentId = await prompt([
    {
      type: "list",
      name: "department",
      message: "Which department would yo like to remove ?",
      choices: departmentChoices
    },
  
  ])
  await db.removeDepartment(departmentId.department)
  console.log(`Removed ${departmentId.department} from department table`)
  console.table(departments)
  await runSearch()
}

//-------------------------------------DELETE EMPLOYEE--------------------------------------//
async function deleteEmployee() {
  const employees = await db.getAllEmployees();
  const employeeChoice = employees.map(({employee_id, first_name, last_name}) => ({
    value: employee_id,
    name: first_name + " " + last_name
  }))
  const employeeId = await prompt([
    {
      type: "list",
      name: "employee",
      message: "Which employee would you like to fire ?",
      choices: employeeChoice
    },
  ])
  await db.removeEmployee(employeeId.employee)
  console.log(`Fired ${employeeId.employee} from company`)
  console.table(employees)
  await runSearch()
}
//-----------------------------------DELETE EMPLOYEE ROLE-----------------------------------//
async function deleteEmployeeRole() {
  const roles = await db.getAllRoles();
  const roleChoices = roles.map(({ role_id, title }) => ({
    name: title,
    value: role_id
  }))
  const roleId = await prompt([
    {
      type: "list",
      name: "role",
      message: "Which role would you like to remove ?",
      choices: roleChoices
    },
  ])
  await db.removeEmployeeRole(roleId.role)
  console.log(`Removed ${roleId.role} from role table`)
  console.table(roles)
  await runSearch()
}

//--------------------------EXIT from app-----------//
async function exit() {
  db.quit()
}

runSearch();