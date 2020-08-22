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

//function to use inquirer to gather information about the development team members

const questions = [{
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
]

function employeeQuestions() {
    inquirer.prompt(questions)
    .then(response => {
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
                var newMember = new Manager(response.name, response.id, response.email, employeeInfo.officeNumber);
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
                var newMember = new Engineer(response.name, response.id, response.email, employeeInfo.github);
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
                var newMember = new Intern(response.name, response.id, response.email, employeeInfo.school);
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
    })
}

employeeQuestions();

//function to rendder HTML with informations provided

function buildHTML() {
    fs.writeFileSync(outputPath, render(employee),  "utf-8")
}
