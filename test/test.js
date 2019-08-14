var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:3003");

// UNIT test begin

describe("Home Page Access",function(){
  it("Return Home Page",function(done){

    // calling home page api
    server
    .get("/")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      console.log("Res Status is " + res.status);
      res.status.should.equal(200);
      done();
    });
  });

});

describe("Get All users test",function(){

    //should return list of all users in users table
      it("Get All users test",function(done){
  
      // calling get users api
      server
      .get("/api/users")
      .expect("Content-type",/json/)
      .expect(200) // THis is HTTP response
      .end(function(err,res){
        // HTTP status should be 200
        console.log("Res Status is " + res.status);
        console.log("Res Status is " + res.body);
        res.status.should.equal(200);
        done();
      });
    });
  
  });

  // UNIT test begin for register APi

  describe("Register students with a teacher",function(){

    //Resgister the list of student with a given teacher
  
    it("Register students with a teacher",function(done){
  
      // calling get users api
      server
      .post("/api/register")
      .send({
        "teacher": "Tom@gmail.com",
        "students":
          [
            "Fensuk@gmail.com",
            "Taz@gmail.com"
          ]
      })
      .expect("Content-type",/json/)
      .expect(200) // THis is HTTP response
      .end(function(err,res){
        // HTTP status should be 204
        console.log("Res Status is " + res.status);
        res.status.should.equal(204);
        done();
      });
    });
  });

  describe("Register students with a teacher who is not in the system",function(){

    //Resgister the list of student with a given teacher who is not in the system
  
    it("Register students with a teacher who is not in the system",function(done){
  
      // calling get users api
      server
      .post("/api/register")
      .send({
        "teacher": "Tom1@gmail.com",
        "students":
          [
            "Fensuk@gmail.com",
            "Taz@gmail.com"
          ]
      })
      .expect("Content-type",/json/)
      .expect(400) // THis is HTTP response
      .end(function(err,res){
        // HTTP status should be 400
        console.log("Res Status is " + res.status);
        res.status.should.equal(400);
        done();
      });
    });
  
  });

  // UNIT test end for register API

  // UNIT test begin for suspend API
  describe("Suspend student",function(){

    //Suspend a student with given email id
  
    it("Suspend student",function(done){
  
      // calling get users api
      server
      .post("/api/suspend")
      .send({
        "student" : "jerry@gmail.com"
      })
      .expect("Content-type",/json/)
      .expect(204) // THis is HTTP response
      .end(function(err,res){
        // HTTP status should be 204
        console.log("Res Status is " + res.status);
        res.status.should.equal(204);
        done();
      });
    });
  });

  describe("Suspend student who is not in the system",function(){

    //Suspend student who is not in the system
  
    it("Suspend student who is not in the system",function(done){
  
      // calling get users api
      server
      .post("/api/suspend")
      .send({
        "student" : "jerry1@gmail.com"
      })
      .expect("Content-type",/json/)
      .expect(400) // THis is HTTP response
      .end(function(err,res){
        // HTTP status should be 400
        console.log("Res Status is " + res.status);
        res.status.should.equal(400);
        done();
      });
    });
  });

  // UNIT test end for suspend API

  // UNIT test begin for receivefornotification API
  describe("Receive For Notification",function(){

    //Receive list of students given in the string for notification and 
    //are associated with the given teacher and are valid
  
    it("Receive For Notification Positive case",function(done){
  
      // calling get Receive For Notification api
      server
      .post("/api/retrievefornotifications")
      .send({
        "teacher":  "gerrad@gmail.com",
        "notification": "Hello students! @Piniyara@gmail.com @Mustafa@gmail.com"
      })
      .expect("Content-type",/json/)
      .expect(200) // THis is HTTP response
      .end(function(err,res){
        // HTTP status should be 200
        console.log("Res Status is " + res.status);
        res.status.should.equal(200);
        done();
      });
    });
  });

  describe("Receive For Notification Invalid teacher email id",function(){

    //Receive For Notification Invalid teacher email id
  
    it("Receive For Notification Invalid teacher email id",function(done){
  
      // calling get retrievefornotifications api
      server
      .post("/api/retrievefornotifications")
      .send({
        "teacher":  "gerrad1@gmail.com",
        "notification": "Hello students! @Piniyara@gmail.com @Mustafa@gmail.com"
      })
      .expect("Content-type",/json/)
      .expect(400) // THis is HTTP response
      .end(function(err,res){
        // HTTP status should be 400
        console.log("Res Status is " + res.status);
        res.status.should.equal(400);
        done();
      });
    });
  });


  // UNIT test end for commonstudents API

  // UNIT test begin for receivefornotification API
  describe("Receive For Notification",function(){

    //Receive list of students given in the string for notification and 
    //are associated with the given teacher and are valid
  
    it("Receive For Notification Positive case",function(done){
  
      // calling get Receive For Notification api
      server
      .post("/api/retrievefornotifications")
      .send({
        "teacher":  "gerrad@gmail.com",
        "notification": "Hello students! @Piniyara@gmail.com @Mustafa@gmail.com"
      })
      .expect("Content-type",/json/)
      .expect(200) // THis is HTTP response
      .end(function(err,res){
        // HTTP status should be 200
        console.log("Res Status is " + res.status);
        res.status.should.equal(200);
        done();
      });
    });
  });

  describe("Receive For Notification Invalid teacher email id",function(){

    //Receive For Notification Invalid teacher email id
  
    it("Receive For Notification Invalid teacher email id",function(done){
  
      // calling get retrievefornotifications api
      server
      .post("/api/retrievefornotifications")
      .send({
        "teacher":  "gerrad1@gmail.com",
        "notification": "Hello students! @Piniyara@gmail.com @Mustafa@gmail.com"
      })
      .expect("Content-type",/json/)
      .expect(400) // THis is HTTP response
      .end(function(err,res){
        // HTTP status should be 400
        console.log("Res Status is " + res.status);
        res.status.should.equal(400);
        done();
      });
    });
  });


  // UNIT test end for receivefornotification API