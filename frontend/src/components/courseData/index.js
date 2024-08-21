// src/components/courseData.js

import React, { useState } from 'react';

const CourseData = () => {

    const [newCourse, setNewCourse] = useState("");

    const [responseText,setResponseText] = useState("")

    const addCourse = async () => {

        const url = "http://localhost:4000/add-course"

        const response = await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({courseName:newCourse})
        })

        setResponseText(await response.text())

        setNewCourse("");
    };

    return (
        <div>
            <h2>Course Management</h2>
            <input
                type="text"
                value={newCourse}
                onChange={(e) => setNewCourse(e.target.value)}
                placeholder="Enter course name"
            />
            <button onClick={addCourse}>Add Course</button>
            {responseText !== "" && <p>{responseText}</p>}
        </div>
    );
};

export default CourseData;
