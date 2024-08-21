const express = require("express");
const jwt = require('jsonwebtoken')
const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
app.use(express.json());

const dbPath = path.join(__dirname, "collegeData.db");

let db = null;


 

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    
    app.listen(4000, () => {
      console.log("Server Running at http://localhost:4000/");
    })


    
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};


app.post("/login", async (request, response) => {
    const { username, password } = request.body;
 
    console.log(username)
    console.log(password)


    if (password === "Harini@173" && username === "harinisrilekha173@gmail.com")
    {
        const payload = {username}
        const jwtToken = jwt.sign(payload, "MY_SECRET_TOKEN");
        response.status(200)
        response.send({ jwtToken });
    }else {
      response.status(400);
      response.send("Invalid User");
    } 
});


// API to Get All Data from Students, Staff, and Courses Tables
app.get("/alldata", async (req, res) => {
    try {
      const staffQuery = `SELECT * FROM staff;`;
      const studentsQuery = `SELECT * FROM students;`;
      const coursesQuery = `SELECT * FROM courses;`;
  
      const staffData = await db.all(staffQuery);
      const studentsData = await db.all(studentsQuery);
      const coursesData = await db.all(coursesQuery);
  
      res.status(200).json({
        staff: staffData,
        students: studentsData,
        courses: coursesData,
      });
  
    } catch (error) {
      res.status(500).send("Error fetching data");
    }
  });



// API to Add New Staff

app.post("/add-staff", async (req, res) => {
  const { name,  email, phone} = req.body;
  const query = `
    INSERT INTO staff (name, email, phone)
    VALUES ('${name}', '${email}',  '${phone}');
  `;
  await db.run(query);
  res.status(200).send("Staff added successfully!");
});


// appi to  delete staff member

app.delete("/staff/:id/", async (request, response) => {
    const { id } = request.params;
    const query = `
      DELETE
        FROM staff
      WHERE
        staff_id = ${id};`;
    await db.run(query);
    response.send(`sucessfully delted ${id}`)
});




// API to Add New Student
app.post("/add-student", async (req, res) => {
  const { name, email, phone } = req.body;
  const query = `
    INSERT INTO students (name,email,phone)
    VALUES ('${name}', '${email}',  '${phone}');
  `;
  await db.run(query);
  res.status(200).send("Student added successfully!");
});


// api to delete student 


app.delete("/student/:id/", async (request, response) => {
    const { id } = request.params;
    const query = `
      DELETE
        FROM students
      WHERE
        student_id = ${id};`;
    await db.run(query);
    response.send(`sucessfully deleted ${id}`)
});


// API to Add New Course
app.post("/add-course", async (req, res) => {
  const { courseName} = req.body;

  const sql = `SELECT * FROM courses WHERE course_name='${courseName}';`

  const data = await db.all(sql);

  if(data.length === 0)
  {
    const query = `
    INSERT INTO courses (course_name)
    VALUES ('${courseName}');
    `
    await db.run(query);
    res.status(200).send("Course added successfully!");
  }else{
    res.send("Course already existed")
    res.status(400);
  }

});





initializeDBAndServer();


