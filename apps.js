const inquirer = require('inquirer');
const {
  getAllDepartments,
  getAllRoles,
  addDepartment,
} = require('./db/db'); // Update the path accordingly

// Main menu choices
const mainMenuChoices = [
  'View all departments',
  'View all roles',
  'View all employees',
  'Add a department',
  'Add a role',
  'Add an employee',
  'Update an employee role',
  'Exit',
];

async function mainMenu() {
  const { choice } = await inquirer.prompt({
    name: 'choice',
    type: 'list',
    message: 'Select an option:',
    choices: mainMenuChoices,
  });

  switch (choice) {
    case 'View all departments':
      await viewAllDepartments();
      break;
    case 'View all roles':
      await viewAllRoles();
      break;
    case 'View all employees':
      // Call the function to view all employees
      break;
    case 'Add a department':
      await addDepartmentPrompt();
      break;
    // ... (Other cases)
    case 'Exit':
      console.log('Goodbye!');
      process.exit(0);
    default:
      console.log('Invalid choice.');
      break;
  }

  // Return to the main menu after an action is performed
  mainMenu();
}

async function viewAllDepartments() {
  try {
    const departments = await getAllDepartments();
    console.table(departments);
  } catch (error) {
    console.error('Error fetching departments:', error);
  }
}

async function viewAllRoles() {
  try {
    const roles = await getAllRoles();
    console.table(roles);
  } catch (error) {
    console.error('Error fetching roles:', error);
  }
}

async function addDepartmentPrompt() {
  const { departmentName } = await inquirer.prompt({
    name: 'departmentName',
    type: 'input',
    message: 'Enter the name of the new department:',
    validate: (input) => input.trim() !== '',
  });

  try {
    await addDepartment(departmentName);
    console.log('Department added successfully!');
  } catch (error) {
    console.error('Error adding department:', error);
  }

  // Return to the main menu
  mainMenu();
}

// Start the application
mainMenu();

