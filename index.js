const inquirer = require('inquirer');
const fs = require('fs');

inquirer
  .prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of your project?',
    },
    {
      type: 'input',
      name: 'description',
      message: 'What is the description of your application?',
    },
    {
      type: 'input',
      message: 'What installation instructions do you have?',
      name: 'installation',
    },
    {
      type: 'input',
      message: 'What are your usage instructions for the user?',
      name: 'usage',
    },
    {
      type: 'input',
      message: 'What are contribution guidelines for users?',
      name: 'contribution',
    },
    {
      type: 'input',
      message: 'How would a user test your application?',
      name: 'tests',
    },
    {
      type: 'list',
      message: 'What license would you like your project under?',
      name: 'license',
      choices: ['MIT', 'GNU General Public License family', 'Apache License 2.0', 'BSD 3-clause Clear license', 'GNU Lesser General Public License family'],
    },
    {
      type: 'input',
      message: 'What is your Github username?',
      name: 'github',
    },
    {
      type: 'input',
      message: 'What is your email address?',
      name: 'email',
    },
    {
      type: 'input',
      message: 'How would users get in contact with you if they have questions?',
      name: 'questions',
    },
  ])
  .then((response) => {
    // Determine the badge URL based on the selected license
    let badgeURL;
    switch (response.license) {
      case 'MIT':
        badgeURL = 'https://img.shields.io/badge/license-MIT-blue.svg';
        break;
      case 'GNU General Public License family':
        badgeURL = 'https://img.shields.io/badge/license-GPL-blue.svg';
        break;
      case 'Apache License 2.0':
        badgeURL = 'https://img.shields.io/badge/license-Apache%202.0-blue.svg';
        break;
      case 'BSD 3-clause Clear license':
        badgeURL = 'https://img.shields.io/badge/license-BSD%203--Clause-blue.svg';
        break;
      case 'GNU Lesser General Public License family':
        badgeURL = 'https://img.shields.io/badge/license-LGPL-blue.svg';
        break;
      default:
        badgeURL = '';
    }

// Format the responses
let formattedData = `# Title
${response.title} 
![License Badge](${badgeURL})

## Description
${response.description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Tests](#tests)
- [License](#license)
- [Questions](#questions)

## Installation
${response.installation}

## Usage
${response.usage}

## Contributing
${response.contribution}

## Tests
${response.tests}

## License
This project is licensed under the ${response.license} license.

## Questions
${response.questions} \nFor further questions or support, please contact [${response.github}](https://github.com/${response.github}) via email at ${response.email}.
`;

    // Write formatted data to README.md
    fs.writeFile('README.md', formattedData, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('README.md successfully generated!');
      }
    });
  });