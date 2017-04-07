# RheumaApp
Monitoring App

Before you get started, make sure you install:
node.js



Additional global dependencies:

npm install -g cordova ionic
cordova plugin add cordova-sqlite-storage
npm install -g karma-cli
npm install -g protractor
webdriver-manager update



After downloading the project run the following command to install app dependencies:

npm install



To run the project in a browser, use the following command:

ionic serve


## Testing
To run e2e testing you must have the app running by the previous command. Then you need to navigate to the 'tests' folder inside 'src'. Run the command:

protractor e2e.conf.js
