// src/components/courseData.js

import React, { useState } from "react";

const CourseData = (props) => {
  const { courses,getData } = props;



  const [newCourse, setNewCourse] = useState("");

  const [responseText, setResponseText] = useState("");

  const addCourse = async () => {
    const url = "http://localhost:4000/add-course";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ courseName: newCourse }),
    });

    setResponseText(await response.text());

    getData();

    setNewCourse("");
  };

  return (
    <div>
      <h2>Course Management</h2>
      <input
        type="text"
        className="form-control"
        value={newCourse}
        onChange={(e) => setNewCourse(e.target.value)}
        placeholder="Enter course name"
      />
      <button className="btn btn-primary" onClick={addCourse}>
        Add Course
      </button>
      {responseText !== "" && <p>{responseText}</p>}
      <table className="table table-bordered border-primary table-hover">
        <thead>
          <tr>
            <th scope="col">Course Id</th>
            <th scope="col">Course Name</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={course.course_id}>
              <th scope="row">{index + 1}</th>
              <td>{course.course_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseData;
