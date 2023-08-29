const mysql = require('mysql2/promise');

// Create a pool for database connections
const pool = mysql.createPool({
  host: 'your_database_host',
  user: 'your_database_user',
  password: 'your_database_password',
  database: 'your_database_name',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Function to execute a query
async function executeQuery(query, values = []) {
  try {
    const [rows, fields] = await pool.query(query, values);
    return rows;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
}

// Functions for various database operations
async function getAllDepartments() {
  const query = 'SELECT * FROM department';
  return executeQuery(query);
}

async function getAllRoles() {
  const query = 'SELECT * FROM role';
  return executeQuery(query);
}

async function getAllEmployees() {
  const query = 'SELECT * FROM employee';
  return executeQuery(query);
}

async function addDepartment(name) {
  const query = 'INSERT INTO department (name) VALUES (?)';
  return executeQuery(query, [name]);
}

async function addRole(title, salary, departmentId) {
  const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
  return executeQuery(query, [title, salary, departmentId]);
}

async function addEmployee(firstName, lastName, roleId, managerId) {
  const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
  return executeQuery(query, [firstName, lastName, roleId, managerId]);
}

async function updateEmployeeRole(employeeId, roleId) {
  const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
  return executeQuery(query, [roleId, employeeId]);
}

module.exports = {
  getAllDepartments,
  getAllRoles,
  getAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
};
