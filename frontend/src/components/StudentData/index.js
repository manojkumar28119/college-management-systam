import React, { useState } from "react";

const StudentData = (props) => {
  const { students, getData } = props;
  console.log(students);

  const [newStudent, setNewStudent] = useState({ name: "", email: "", phone: "" });
  const [responseText, setResponseText] = useState("");

  const addStudent = async (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page

    const url = "http://localhost:4000/add-student";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStudent),
      });

      const result = await response.text();
      setResponseText(result);

      getData(); // Refresh the student data after adding a new student

      setNewStudent({ name: "", email: "", phone: "" }); // Clear the form
    } catch (error) {
      console.error("Error adding student:", error);
      setResponseText("Failed to add student. Please try again.");
    }
  };

  const handleChange = (e) => {
    setNewStudent({
      ...newStudent,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h2>Student Management</h2>
      <form onSubmit={addStudent}>
        <input
          type="text"
          name="name"
          value={newStudent.name}
          onChange={handleChange}
          placeholder="Enter student name"
          className="form-control"
          required
        />
        <input
          type="email"
          name="email"
          value={newStudent.email}
          onChange={handleChange}
          placeholder="Enter student email"
          className="form-control"
          required
        />
        <input
          type="number"
          name="phone"
          value={newStudent.phone}
          onChange={handleChange}
          placeholder="Enter mobile number"
          className="form-control"
          required
        />
        <button type="submit" className="btn btn-primary mt-3">
          Add Student
        </button>
      </form>
      {responseText && <p>{responseText}</p>}

      <table className="table mt-4 table-bordered border-primary table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.student_id}>
              <th scope="row">{index + 1}</th>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentData;
