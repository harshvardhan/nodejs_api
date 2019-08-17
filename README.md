# School Project - Node.js API - Starter Kit

This Rest API is made with Express.js framework. This project works in context of a school where teachers and students are the users and there are few admin tasks that can be performed using the APIs.
This set of APIs allow to do some admin related tasks like following:
* Create User with a HTML form.
* Get all users or a user by email id.
* Associate a student with teacher.
* Mark a student suspended.
* Find Common students for given set of teachers.
* Get list of students of the given teacher and students mentioned with @ annotation in the message string for sending notifications.

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
* Use the db dump file to get db file from misc folder misc/db_backup.sql
* Import the postman file using the misc/school_project.postman_collection.json
* Start the app using node app.js command
* After this API server must become available at [http://localhost:3003/](http://localhost:3003/).
* Use Postman to permform admin functions using these APIs

## Unit Test
Unit test cases have been written using moacha framework with supertest and should. To run the unit test cases
* Start the node.js app using node app.js.
* Then run mocha command on terminal.

## Known Issues
* More test cases should be written to check the roboustness of the API.