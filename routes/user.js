// will contain all of my user related routes
const express = require('express')
const mysql = require('mysql')
const router = express.Router()

/**
 * @api {get} /api/users This API retrieves list of all the users in the system.
 * @apiName Get All Users
 * @apiGroup Admin
 * 
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 * [
 *  {
 *    "id": 1,
 *    "first_name": "Tom",
 *    "second_name": "B. Erichsen",
 *    "email_id": "Tom@gmail.com",
 *    "type": "teacher"
 *  },
 *  {
 *    "id": 2,
 *    "first_name": "Nick",
 *    "second_name": "Cott",
 *    "email_id": "Nick@gmail.com",
 *    "type": "teacher"
 *  },
 *  {
 *    "id": 3,
 *    "first_name": "Patrik",
 *    "second_name": "Luq",
 *    "email_id": "Patrik@gmail.com",
 *    "type": "student"
 *  }
 * ]
 */
router.get("/api/users", (req, res) => {
    const connection = getConnection()
    const queryString = "SELECT * FROM users"
    connection.query(queryString, (err, rows, fields) => {
      if (err) {
        console.log("Failed to query for users: " + err)
        res.sendStatus(500)
        return
      }
      res.status(200).json(rows)
    })
  })

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'jacksparrow',
    database: 'school_project'
})

//Returns a pool of connection
function getConnection() {
    return pool
}

/**
 * @api {post} /user_create This API creats a user in the system.
 * @apiName UserCreate
 * @apiGroup Admin
 *
 * @apiParam {String} [firstName]  First name of user
 * @apiParam {String} [secondName]  Second name of user
 * @apiParam {String} [emailId]  EmailID of user
 * @apiParam {String} [type]  type of user - teacher/student
 * 
 */
router.post('/api/user_create', (req, res) => {
    console.log("Trying to create a new user...")
    console.log("How do we get the form data???")
  
    console.log("First name: " + req.body.create_first_name)
    const firstName = req.body.create_first_name
    const secondName = req.body.create_second_name
    const emailId = req.body.create_email_id
    const type = req.body.create_type

    const queryString = "INSERT INTO users (first_name, second_name, email_id, type) VALUES (?, ?, ?, ?)"
    getConnection().query(queryString, [firstName, secondName, emailId, type], (err, results, fields) => {
      if (err) {
        console.log("Failed to insert new user: " + err)
        res.sendStatus(500)
        return
      }
  
      console.log("Inserted a new user with id: ", results.insertId);
      res.sendStatus(200)
      res.end()
    })
  })
  
/**
 * @api {get} /api/user/:email_id This API retrieves list of user id with a given Email ID.
 * @apiName Get User by Email ID
 * @apiGroup Admin
 *
 * @apiParam {String} [teacher]  Email ID of Teacher.
 * 
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 * [
 *  {
 *    "id": 1,
 *    "first_name": "Tom",
 *    "second_name": "B. Erichsen",
 *    "email_id": "Tom@gmail.com",
 *    "type": "teacher"
 *  }
 * ]
 */
  router.get('/api/user/:email_id', (req, res) => {
      console.log("Fetching user with email: " + req.params.email_id)

      const connection = getConnection()

      const userEmailId = req.params.email_id
      const queryString = "SELECT * FROM users WHERE email_id = ?"
      connection.query(queryString, [userEmailId], (err, rows, fields) => {
          if (err) {
          console.log("Failed to query for users: " + err)
          res.sendStatus(500)
          return
          // throw err
          }

          console.log("I think we fetched users successfully")

          const users = rows.map((row) => {
          return {firstName: row.first_name, lastName: row.last_name}
          })

          res.json(rows)
      })
  })

module.exports = router