# Employee Tracker
https://drive.google.com/file/d/1kq7jQ0T_xtyhAB-utg7j1E3qQqhCmtLn/view 

## Description 
This application has a variety of functions that enable user to access information regarding employees, departments, and job roles

# Installation
To install, clone the repo on to local host using wither the SSH key: git@github.com:eilismcmillan/employee-tracker.git; or the HTTPS link: https://github.com/eilismcmillan/employee-tracker.git 

Once cloned, run run 'npm install' in the terminal to download the application's package and dependencies. Once completed, initiate the server using 'mysql -u root', adding '-p' and entering password if necessary. Then enter 'source db/schema.sql' and 'source db/seeds.sql' into the mysql terminal to load the database and entries.

To access the server, quit mysql and enter 'node server.js' to initiate the server. 

## Usage 
Once the installation has been completed, users will be prompted to choose an action from the list provided. By pressing enter on the desired action, user may either be presented with a table of results, or asked further prompting question prior to updated results being shown. 

https://github.com/eilismcmillan/employee-tracker/assets/125100127/e5e1e9bf-8a29-4d0f-9653-351675d600af

## License 
none
