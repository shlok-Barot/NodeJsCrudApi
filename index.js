const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

/*------------------parse application/json------------------------ */
app.use(bodyParser.json());
app.use(cors());

/*------------------Database Connection------------------------ */
const Conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root@1234",
  database: "testdemo",
});

/*------------------Shows Mysql Connect------------------------ */
Conn.connect((err) => {
  if (err) throw err;
  console.log("Mysql Connected...");
});

/**
 * Get All Employee
 *
 * @return response()
 */
app.get("/api/getEmployeeData", (req, res) => {
  let sqlQuery = "Select * from employee";

  let query = Conn.query(sqlQuery, (err, result) => {
    if (err) throw err;
    res.send(apiResponse(result));
  });
});

/**
 * Get Single Employee
 *
 * @return response()
 */
app.get("/api/getEmployee/:id", (req, res) => {
  let sqlQuery = "Select * from employee where Id=" + req.params.id;

  let query = Conn.query(sqlQuery, (err, result) => {
    if (err) throw err;
    res.send(apiResponse(result));
  });
});

/**
 * Create New Employee
 *
 * @return response()
 */
app.post("/api/addEmployee", (req, res) => {
  let reqData = {
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    EmailId: req.body.Email,
    MobileNo: req.body.MobileNo,
    Gender: req.body.Gender,
    Address: req.body.Address,
    Designation: req.body.Designation,
    City: req.body.City,
    State: req.body.State,
    Country: req.body.Country,
  };
  let sqlQuery = "Insert into employee set ?";

  let query = Conn.query(sqlQuery, reqData, (err, result) => {
    if (err) throw err;
    res.send(apiResponse(result));
  });
});

/**
 * Update Employee
 *
 * @return response()
 */
app.put("/api/updateEmployee/:id", (req, res) => {
  console.log(req.body, "body---");
  let sqlQuery =
    "Update employee set FirstName='" +
    req.body.FirstName +
    "', LastName='" +
    req.body.LastName +
    "', EmailId='" +
    req.body.Email +
    "', MobileNo='" +
    req.body.MobileNo +
    "', Gender='" +
    req.body.Gender +
    "', Address='" +
    req.body.Address +
    "', Designation='" +
    req.body.Designation +
    "', City='" +
    req.body.City +
    "', State='" +
    req.body.State +
    "', Country='" +
    req.body.Country +
    "' WHERE Id=" +
    req.params.id;

  let query = Conn.query(sqlQuery, (err, result) => {
    if (err) throw err;
    res.send(apiResponse(result));
  });
});

/**
 * Delete Employee
 *
 * @return response()
 */
app.delete("/api/EmployeeDelete/:id", (req, res) => {
  let sqlQuery = "Delete from employee where Id=" + req.params.id + "";

  let query = Conn.query(sqlQuery, (err, result) => {
    if (err) throw err;
    res.send(apiResponse(result));
  });
});
/**
 * API Response
 *
 * @return response()
 */
function apiResponse(results) {
  return { status: 200, error: null, response: results };
  //   return JSON.stringify({ status: 200, error: null, response: results });
}

/*------------------Server listening------------------------ */

app.listen(8080, () => {
  console.log("Server started on port 8080...");
});
