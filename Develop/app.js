const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employee = [];
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

function employeeQuestions() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is employee's name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is employee's id number?",
            name: "id"
        },
        {
            type: "input",
            message: "What is employee's email?",
            name: "email"
        },
        {
            type: "list",
            message: "What is employee's role?",
            name: "role",
            choices: [
                "Manager",
                "Engineer",
                "Intern"
            ]
        }
    ]).then(response => {
        let employeeRole = response.role;
        
        if (employeeRole === "Manager") {
            inquirer.prompt([
                {
                    type: "input",
                    message: "Please provide office number.",
                    name: "officeNumber"
                },
                {
                    type: "list",
                    message: "Do you want to add more team member?",
                    name: "addAnother",
                    choices: [
                       "Yes",
                       "No"
                    ]
                }
            ]).then(function(employeeInfo) {
                var newMember = new Manager(employeeInfo.name, employeeInfo.id, employeeInfo.email, employeeInfo.officeNumber);
                employee.push(newMember);
                if (employeeInfo.addAnother === "Yes") {
                    employeeQuestions();
                }
                else {
                    buildHTML();
                    console.log("success");
                }
            })
        }
        else if (employeeRole === "Engineer") {
            inquirer.prompt([
                {
                    type: "input",
                    message: "Please provide GitHub account.",
                    name: "github",
                },
                {
                    type: "list",
                    message: "Do you want to add more team member?",
                    name: "addAnother",
                    choices: [
                       "Yes",
                       "No"
                    ]
                }
            ]).then(function(employeeInfo) {
                var newMember = new Engineer(employeeInfo.name, employeeInfo.id, employeeInfo.email, employeeInfo.github);
                employee.push(newMember);
                if (employeeInfo.addAnother === "Yes") {
                    employeeQuestions();
                }
                else {
                    buildHTML();
                }
            })
        }
        else {
            inquirer.prompt([
                {
                    type: "input",
                    message: "Plase provide school attended.",
                    name: "school"
                },
                {
                    type: "list",
                    message: "Do you want to add more team member?",
                    name: "addAnother",
                    choices: [
                       "Yes",
                       "No"
                    ]
                }
            ]).then(function(employeeInfo) {
                var newMember = new Intern(employeeInfo.name, employeeInfo.id, employeeInfo.email, employeeInfo.school);
                employee.push(newMember);
                if (employeeInfo.addAnother === "Yes") {
                    employeeQuestions();
                }
                else {
                    buildHTML();
                }
            })
        }
    })
}

employeeQuestions();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!



// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

function buildHTML() {
    fs.writeFileSync(outputPath, render(employee),  "utf-8")
}

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
