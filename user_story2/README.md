This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## DEMO
### Deployed on AWS
On your browser launch http://18.217.38.120:8000/

(or)
### On Local
To run the application on the local machine
From the project, directory open a terminal and run 
```$ nodemon Server.js```
This will launch the application on localhost:8000 on your default browser.



## Project Build
````
$ npm build
$ npm install
$ nohup node server.js& or
$ nodemon server.js
````
### Dependencies:
````
"dependencies": {
    "@material-ui/core": "^4.0.1",
    "@material-ui/icons": "^4.0.1",
    "dotenv": "^8.1.0",
    "express": "^4.17.1",
    "material-ui-treeview": "^3.3.0",
    "mongodb": "^3.2.6",
    "mongoose": "^5.5.12",
    "react": "^16.8.6",
    "react-dom": "^16.8.6",
    "react-scripts": "3.0.1",
    "react-treebeard": "^3.2.3",
    "socket.io": "^2.2.0",
    "typeface-roboto": "0.0.54"
  },
 ```` 

#### All the changes are reflected on the page without the need for refreshing. 
#### I have used change stream for MongoDB https://docs.mongodb.com/manual/changeStreams/ for realtime updation when a new record is entered via the api.
#### I have used websockets to implement this while an action is done from the page. 

* Just for the sake of testing both the stories together in a single page, I'm also including a create invoice button on the top of react app. The screenshot of the same with validations can be found here.

![Create invoice button with validations](https://github.com/architkhullar/2uAssessment/blob/master/user_story2/screenshots/Screen%20Shot%202019-08-24%20at%207.58.03%20PM.png)

* The page opens up with expandable tiles with `invoice_number - its status` as the title. see screenshot below

![Create invoice button with validations](https://github.com/architkhullar/2uAssessment/blob/master/user_story2/screenshots/Screen%20Shot%202019-08-24%20at%207.38.45%20PM.png)

* This when expanded using the arrow button on the right displays all the details with `approve or deny` button

![Create invoice button with validations](https://github.com/architkhullar/2uAssessment/blob/master/user_story2/screenshots/Screen%20Shot%202019-08-24%20at%207.38.59%20PM.png)

* On denying an invoice a confirmation dialog box opens.

![Create invoice button with validations] (https://github.com/architkhullar/2uAssessment/blob/master/user_story2/screenshots/Screen%20Shot%202019-08-24%20at%207.39.37%20PM.png)

* When the page connects to the Clooud Db, it displays a snackbar like this:
![snackbar](https://github.com/architkhullar/2uAssessment/blob/master/user_story2/screenshots/Screen%20Shot%202019-08-24%20at%207.39.16%20PM.png)
