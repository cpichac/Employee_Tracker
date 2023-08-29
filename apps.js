const inquirer = require('inquirer');
const {
  getAllDepartments,
  addDepartment,
} = require('./db/db.js'); // Update the path accordingly

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
      // Call the function to fetch and display all departments
      break;
    case 'View all roles':
      // Call the function to fetch and display all roles
      break;
    case 'View all employees':
      // Call the function to fetch and display all employees
      break;
    case 'Add a department':
      await addDepartmentPrompt(); // Call the add department prompt function
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

async function addDepartmentPrompt() {
  const { departmentName } = await inquirer.prompt({
    name: 'departmentName',
    type: 'input',
    message: 'Enter the name of the new department:',
    validate: (input) => input.trim() !== '',
  });

  // Call the function to add the new department to the database
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
