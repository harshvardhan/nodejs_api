// will contain all of the admin related routes
const express = require('express')
const mysql = require('mysql')
const router = express.Router()

/**
 * @api {post} /api/register This API registers student with the teachers. The list of student and the teacher is given in the post body.
 * @apiName RegisterStudent
 * @apiGroup Admin
 *
 * @apiParam {String} [teacher]  Email ID of Teacher.
 * @apiParam {Array} [students]  Email ID of Student.
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *  "teacher": "teacherken@gmail.com",
 *  "students":
 *   [
 *      "studentjon@gmail.com",
 *      "studenthon@gmail.com"
 *   ]
 * }
 */
router.post("/api/register", (req, res) => {
  console.log("Trying to register students with teacher...")
  console.log("Teacher's email ID: " + req.body.teacher)
  const teacherEmail = req.body.teacher
  const studentEmails = req.body.students
  //check validity of body params and return error if there is any discrepancy
  var validInput = true
  var message = ""
  if (teacherEmail == undefined || teacherEmail == ""){
    validInput = false
    message = "Teacher Email ID not present"
  }
  if (studentEmails === undefined || studentEmails.length == 0) {
    validInput = false
    message = "No Student Email ID present"
  }
  if (!validInput){
    console.log("Input params not valid")
    res.status(400).json({"message": message})
    return
  }

  const connection = getConnection()

  //find if the teacher is present in users
  //return an error the teacher is not there in the system
  const queryString = "SELECT * FROM users where email_id=" + mysql.escape(teacherEmail) + " limit 1"
  connection.query(queryString, (err, rows, fields) => {
    if (err) {
        console.log("Failed to query for users: " + err)
        console.error(err);
        res.status(500).json({"message": "Some Internal Error Occured"})
        return
    }
    if (rows === undefined || rows.length == 0) {
      // rows empty or does not exist
      console.log("No teacher found with mentioned email id: " + teacherEmail)
      res.status(400).json({"message": "No teacher found with mentioned email id " + teacherEmail})
      return
    }
    //find if all the students are present in the users
    //return an error if a student is not there in the system
    //assign all the students to the given teacher if all the students are present
    const studentTeacherInsertString = "INSERT INTO register (teacher_email, student_email, valid) VALUES ?"
    var values = studentEmails.map((studentEmail) => {
      return [teacherEmail, studentEmail, 1]
    })
    connection.query(studentTeacherInsertString, [values], (errStudentTeacherInsert, resultsStudentTeacherInsert, fieldsStudentTeacherInsert) => {
      if (errStudentTeacherInsert) {
        console.log("Failed to insert new association: " + errStudentTeacherInsert)
        res.status(400).json({"message": errStudentTeacherInsert.message})
        return
      }
      console.log("Inserted new associations");
      res.status(204).json({"message": "New Associations Done"})
    })
  })
})

/**
 * @api {get} /api/commonstudents This API retrieves list of common students for the given list of teachers.
 * @apiName Common Students
 * @apiGroup Admin
 *
 * @apiParam {String} [teacher]  Email ID of Teacher.
 * 
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *  {
 *    "students" :
 *    [
 *      "commonstudent1@gmail.com",
 *      "commonstudent2@gmail.com",
 *      "student_only_under_teacher_ken@gmail.com"
 *    ]
 *  }
 */
router.get("/api/commonstudents", (req, res) => {
  console.log("Trying to retrieve common students of given teachers...")
  console.log("Teacher's email IDs: " + req.query.teacher)
  var commonStudents
  var issueWithParams = false
  var message = ""
  const teacherEmailIDs = req.query.teacher
  console.log(typeof req.query.teacher)
  if (typeof req.query.teacher == "string") {
    console.log("Aborting execution and sending back 400 since it takes two to tango")
    message = "More then one teacher required to get common students"
    issueWithParams = true
  }
  else if (req.query.teacher === undefined){
    console.log("Aborting execution and sending back 400 since there are no arguments")
    message = "No arguments provided"
    issueWithParams = true
  }
  if (issueWithParams) {
    res.status(400).json({"message": message})
    return
  }

  const connection = getConnection()
  console.log("teachers are : " + teacherEmailIDs)
  const commonStudentsForTeachersQueryString = "SELECT a.student_email FROM register a JOIN register b ON a.teacher_email = b.teacher_email WHERE a.teacher_email IN (?) And a.valid=1 GROUP BY a.student_email HAVING COUNT(DISTINCT a.teacher_email)=?;"
  connection.query(commonStudentsForTeachersQueryString, [teacherEmailIDs, teacherEmailIDs.length], (errCommonStudentTeacher, rowsCommonStudentTeacher) => {
    if (errCommonStudentTeacher) {
      console.log("Failed to query for users: " + errCommonStudentTeacher)
      console.error(errCommonStudentTeacher);
      res.status(500).json({"message": "Some Internal Error Occured"})
      return
    }
    if (rowsCommonStudentTeacher === undefined || rowsCommonStudentTeacher.length == 0) {
      //rows empty or does not exist
      console.log("No common students")
      commonStudents = []
    }
    else{
      //common students found
      console.log("Common students Found" + rowsCommonStudentTeacher.length)

      commonStudents = rowsCommonStudentTeacher.map((commonStudent) => {
        return commonStudent.student_email
      })
    }
    res.status(200).json({"students": commonStudents})
  })
})

/**
 * @api {post} /api/suspend This API marks a student as suspendes in register table
 * @apiName SuspendStudent
 * @apiGroup Admin
 *
 * @apiParam {String} [student]  Email ID of Student.
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *   "student": "studentjon@gmail.com"
 * }
 */
router.post("/api/suspend", (req, res) => {
  console.log("Trying to mark a student as suspended..")
  console.log("Student's email ID: " + req.body.student)
  //Send error and return if there is no student parameter in body
  if (req.body.student === undefined || req.body.student.trim() === ""){
    console.log("No student parameter provided")
    res.status(400).json({"message" : "Email ID for student is not provided"})
    return
  }
  //Update the rows where the student_email matches the given email
  //Return error if there isn't one.
  //Return bad request if there is no rows affects meaning there is no user matching given criteria
  const queryString = "UPDATE register SET valid=? where student_email=?"
  const connection = getConnection()
  connection.query(queryString, [0, req.body.student], (err, results) => {
    console.log('Rows affected:', results.affectedRows);
    if (err) {
      console.log("Failed to query for :"+ mysql.escape(req.body.student) + " : " + err)
      console.error(err);
      res.status(500).json({"message": "Some Internal Error Occured"})
      return
    }
    if (results.affectedRows === 0) {
      //rows empty or does not exist
      console.log("Student with email id " + req.body.student + " doesn't exists in the system")
      res.status(400).json({"message" : "No such student exists : " + req.body.student})
    }
    else {
      console.log("Student with email id " + req.body.student + " has been marked suspended for all teachers")
      res.status(204).json({"message": "Student with email id " + req.body.student + " has been marked suspended for all teachers"})
    }
  })
})

/**
 * @api {post} /api/retrievefornotifications This API retrives list of student associated with a teacher and the students mentioned with @ annotation.
 * @apiName RetrieveForNotifications
 * @apiGroup Admin
 *
 * @apiParam {String} [teacher]  Email ID of teacher.
 * @apiParam {String} [notification]  Content of notification with email IDs of students intended for receiving notification.
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *  "teacher":  "teacherken@gmail.com",
 *  "notification": "Hello students! @studentagnes@gmail.com @studentmiche@gmail.com"
 * }
 * 
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 * "recipients" :
 *  [
 *    "commonstudent1@gmail.com",
 *    "commonstudent2@gmail.com",
 *    "student_only_under_teacher_ken@gmail.com"
 *  ]
 * }
 */
router.post("/api/retrievefornotifications", (req, res) => {
  console.log("Retriving list of student associated with a teacher and the students mentioned with @ annotation..");
  console.log("Teachers's email ID: " + mysql.escape(req.body.teacher));
  const teacherEmail = req.body.teacher;
  var studentEmails;
  var validStudentEmails = [];
  const notificationMessage = req.body.notification;
  //check validity of body params and return error if there is any discrepancy
  var validInput = true;
  var message = "";
  if (teacherEmail == undefined || teacherEmail.trim() == ""){
    validInput = false;
    message = "Email ID for teacher is not provided";
  }
  if (notificationMessage === undefined || notificationMessage.trim().length == 0) {
    validInput = false;
    message = "Notification message is not provided";
  }
  if (!validInput){
    console.log("Input params not valid");
    res.status(400).json({"message": message});
    return;
  }

  //Check if teacher exists in the system.
  //Return error if there isn't one.
  //Get union of all the students associated with the teacher which are valid too with
  //and all the students mentioned in message with @ annotation which are valid.
  //Return the distinct list of students found.

  //find if the teacher is present in users
  //return an error the teacher is not there in the system
  const queryString = "SELECT * FROM users where email_id=" + mysql.escape(teacherEmail) + " limit 1";
  const connection = getConnection();
  var query = connection.query(queryString, (err, rows) => {
    if (err) {
        console.log("Failed to query for users: " + err)
        console.error(err);
        res.status(500).json({"message": "Some Internal Error Occured"})
        return
      }
    if (rows === undefined || rows.length == 0) {
      // rows empty or does not exist
      console.log("No teacher found with mentioned email id: " + teacherEmail)
      res.status(400).json({"message": "No teacher found with mentioned email id " + teacherEmail})
      return
    }
    else{
      //meaning teacher is present in the system
      //extract the email ids from notification message
      studentEmails = extractEmails(notificationMessage)
      
      if (studentEmails)
        console.log("Students in notification :: " + studentEmails)

      const studentQueryString ="select a.student_email from register a where a.student_email in (?) and a.valid=? UNION select student_email from register where teacher_email=? and valid=?";
      var studentQuery = connection.query(studentQueryString, [studentEmails, 1, teacherEmail, 1], (errStudent, rowsStudent) => {
        if (errStudent) {
          console.log("Failed to query for users: " + errStudent)
          res.status(500).json({"message": "Some Internal Error Occured"})
          return
        }
        if (rowsStudent === undefined || rowsStudent.length == 0) {
          // rows empty or does not exist
          console.log("No Students found for this query")
          res.status(400).json({"message": "No Students found for this query"})
          return
        }
        else{
          //students exists
          console.log("Num of Students found with email id: " + rowsStudent.length)
          validStudentEmails = rowsStudent.map((row) => {
            return row.student_email
          })
          console.log("Valid students :: " + validStudentEmails.length)
          res.status(200).json({"recipients": validStudentEmails})
        }
      })
    }
  })
})

/**
 * 
 * This function returns list of email ids found in the given text.
 * 
**/
function extractEmails(text){
  return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
}

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'jacksparrow',
    database: 'school_project'
})

/**
 * 
 * This function returns a pool of connection with limit of 10
 * 
**/
function getConnection() {
    return pool
}

module.exports = router