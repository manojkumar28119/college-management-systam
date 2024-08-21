import React, { useState } from "react";

const StaffData = (props) => {
  const { staff, getData } = props;

  const [newStaff, setNewStaff] = useState({ name: "", email: "", phone: "" });
  const [responseText, setResponseText] = useState("");

  const addStaff = async (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page

    const url = "http://localhost:4000/add-staff";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStaff),
      });

      const result = await response.text();
      setResponseText(result);

      getData(); // Refresh the staff data after adding a new staff member

      setNewStaff({ name: "", email: "", phone: "" }); // Clear the form
    } catch (error) {
      console.error("Error adding staff:", error);
      setResponseText("Failed to add staff. Please try again.");
    }
  };

  const handleChange = (e) => {
    setNewStaff({
      ...newStaff,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h2>Staff Management</h2>
      <form onSubmit={addStaff}>
        <input
          type="text"
          name="name"
          value={newStaff.name}
          onChange={handleChange}
          placeholder="Enter staff name"
          className="form-control"
          required
        />
        <input
          type="email"
          name="email"
          value={newStaff.email}
          onChange={handleChange}
          placeholder="Enter staff email"
          className="form-control"
          required
        />
        <input
          type="number"
          name="phone"
          value={newStaff.phone}
          onChange={handleChange}
          placeholder="Enter staff mobile number"
          className="form-control"
          required
        />
        <button type="submit" className="btn btn-primary mt-3">
          Add Staff
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
          {staff.map((staffMember, index) => (
            <tr key={staffMember.staff_id}>
              <th scope="row">{index + 1}</th>
              <td>{staffMember.name}</td>
              <td>{staffMember.email}</td>
              <td>{staffMember.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffData;
