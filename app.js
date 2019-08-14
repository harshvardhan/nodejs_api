// load our app server using express.
const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')

const bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(express.static('./public'))

app.use(morgan('short'))

const useRouter = require('./routes/user.js')
const adminRouter = require('./routes/admin.js')

app.use(useRouter)
app.use(adminRouter)

app.get("/", (req, res) => {
  console.log("Responding to root route")
  res.send("Hello from ROOOOOTTTT")
})

app.listen(3003, () => {
  console.log("Server is up and listening on 3003...")
})