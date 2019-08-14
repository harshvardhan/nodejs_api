# Node.js API Starter Kit

This Rest API is made with Express.js framework. This set of APIs allow to do some admin related tasks like following.

## APIs
* user_create - This API creats a user in the system. A form can also be used in enter users from /form.html.
* user/:email_id - This API retrieves list of user id with a given Email ID.
* users - This API retrieves list of all the users in the system.
* register - This API registers student with the teachers. The list of student and the teacher is given in the post body.
* commonstudents - This API retrieves list of common students for the given list of teachers.
* suspend - This API marks a student as suspendes in register table.
* retrievefornotifications - This API retrives list of student associated with a teacher and the students mentioned with @ annotation.

## Database
This solution uses mysql as database and uses following two objects. 

User Object
```json
{
	"id": 919819,
	"first_name": "Jhon",
	"second_name": "Silver",
	"email_id": "jhon.silver@gmail.com",
	"type": "teacher"
}
```
Register Object
```json
{
	"id": 897897,
	"teacher_email": "jack.snider@gmail.com",
	"student_email": "jhon.silver@gmail.com",
	"valid": 1
}
```

## How to setup
1) Use the db dump file to get db filefrim misc folder misc/db_backup.sql
2) Import the postman file using the misc/school_project.postman_collection.json
3) Use Postman to permform admin functions using these APIs
4) Start the node.js app using node app.js command
5) After this API server must become available at [http://localhost:3003/](http://localhost:3003/).

## Unit Test
Unit test cases have been written using moacha framework. To run the unit test cases
* Start the node.js app using node app.js.
* Then run mocha command on terminal.

## Known Issues
1) commonstudents API is not returning the desired result (WIP).
2) More test cases should be written to check the roboustness of the API.
3) Test cases for commonstudents still to be made.