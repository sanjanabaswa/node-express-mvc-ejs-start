# Node Express MVC EJS Bootstrap Starter app

A sample starter app using:

- Node.js platform
- Express web framework
- EJS templating engine
- MVC design pattern
- Mongoose MongoDB object modeling
- Lodash for JavaScript object iteration and manipulation
- jQuery library for DOM manipulation
- BootStrap Material Design framework for responsive design
- nedb In-memory database
- Winston logger

## Links

- Repo <https://bitbucket.org/professorcase/node-express-mvc-ejs-start>

## Prerequisites

Following must be downloaded, installed, and configured according to the product directions:

1. Node.js and npm
1. Git version control system
1. If Windows, TortoiseGit
1. Add "Open PowerShell Here as Administrator" to context menu. Download and run file from <https://github.com/profcase/open-command-window-here-as-admin>.

## Code Editor

1. Install Visual Studio Code.
1. Right-click on your project folder and select "Open with Code".
1. RECOMMENDED: Under VS Code menu "File" option, check "Autosave".
1. OPTIONAL: To type commands from within VS Code, from the VS Code menu, select View /  Terminal.

## Get started

Fork this repo into your own cloud account.

Clone your repo down to your local machine.

## Review Code Organization

- app.js - Starting point for the application. Defines the express server, requires routes and models. Loads everything and begins listening for events.
- controllers/ - logic for handling client requests
- data/ - seed data loaded each time the application starts
- models/ - schema descriptions for custom data types
- routes/ - route definitions for the API
- utils/ - utilities for logging and seeding data
- views/ - EJS - embedded JavaScript and HTML used to create dynamic pages

## Install Nodemon Globally

In your new project folder, right-click and "Open PowerShell Here as Administrator". Install nodemon globally to enable live updates.

```PowerShell
> npm install -g nodemon
```

## Install Project Dependencies

Run npm install to install the project dependencies listed in package.json.

```PowerShell
> npm install
```

## Run the App Locally

In your project folder, right-click and "Open PowerShell Here as Administrator". At the prompt, type nodemon app.js to start the server.  (CTRL-C to stop.)

```PowerShell
> nodemon app.js
```

## View Web App

Open browser to the location displayed, e.g. http://localhost:8089/

## Group Members 

 - Sanjana Baswapuram
 - SaiSri Dachepalli
 - Ganesh Siripuram
 - Chatur Veda Vyas
