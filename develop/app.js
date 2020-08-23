const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let workingRole = "manager"
let workingRoleAtt = "office Number"
let rolePush = ""
let employees = [];

executePrompts();

function executePrompts(){

inquirer

.prompt([
    {
    type: "input",
    message: `What is your ${workingRole}'s name?`,
    name: "nomenclature"
    
    },

    {
        type: "input",
        message: `What is your ${workingRole}'s ID?`,
        name: "id"
        
    },

    {
        type: "input",
        message: `What is your ${workingRole}'s email?`,
        name: "email"
        
    },

    {
        type: "input",
        message: `What is your ${workingRole}'s ${workingRoleAtt}?`,
        name: "special"
        
    },

    {
        type: "checkbox",
        message: "Which type of employee do you wish to add?",
        name: "employeeadd",
        choices: [
            "engineer",
            "intern",
            "none"
        ]
        
    },


])

.then(function(response){

    switch (workingRole) {
        case "manager":
        rolePush = new Manager(response.nomenclature, response.id, response.email, response.special);
        break;

        case "engineer":
        rolePush = new Engineer(response.nomenclature, response.id, response.email, response.special);
        break;

        case "intern":
        rolePush = new Intern(response.nomenclature, response.id, response.email, response.special);
        break;

    }

    employees.push(rolePush)


    if (response.employeeadd == "engineer") {
        workingRole = "engineer"
        workingRoleAtt = "Github username"
        executePrompts()
    } else if (response.employeeadd == "intern") {
        workingRole = "intern";
        workingRoleAtt = "school"
        executePrompts();
    } else {

    fs.writeFile (outputPath, render(employees), "utf8", function(err){
        if (err) {
        throw err;
                 }
        })
    
         }

        })}




