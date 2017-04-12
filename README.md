## RheumaApp
Monitoring App

Before you get started, make sure you install:
node.js



# Global dependencies:

npm install -g cordova ionic
cordova plugin add cordova-sqlite-storage
npm install -g karma-cli
npm install -g protractor
webdriver-manager update


# App dependencies
After downloading the project run the following command to install app dependencies:

npm install



# Run the project
To run the project in a browser, use the following command:

ionic serve


# Run the tests
To run unit tests, navigate to the project folder in your terminal, and use the command:

npm test

To run e2e testing you must navigate to the project folder in your terminal and have the app running by the command 'ionic serve'. Then you need to run the following command:

protractor e2e/e2e.conf.js
