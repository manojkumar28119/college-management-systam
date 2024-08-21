// src/components/StudentData.js
import React, { useState } from 'react';

const StudentData = () => {
    const [newStaff, setNewStaff] = useState({ name: "", email: "", phone: "" });
    const [responseText, setResponseText] = useState("");

    const addStaff = async (e) => {
        e.preventDefault(); // Prevent form submission from reloading the page

        const url = "http://localhost:4000/add-student";

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newStaff)
            });

            const result = await response.text();
            setResponseText(result);

            setNewStaff({ name: "", email: "", phone: "" }); // Clear the form
        } catch (error) {
            console.error("Error adding staff:", error);
            setResponseText("Failed to add staff. Please try again.");
        }
    };

    const handleChange = (e) => {
        setNewStaff({
            ...newStaff,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div>
            <h2>Student Management</h2>
            <form onSubmit={addStaff}>
                <input
                    type="text"
                    name='name'
                    value={newStaff.name}
                    onChange={handleChange}
                    placeholder="Enter Student name"
                    required
                />
                <input
                    type="email"
                    name='email'
                    value={newStaff.email}
                    onChange={handleChange}
                    placeholder="Enter Student email"
                    required
                />
                <input
                    type="number"
                    name='phone'
                    value={newStaff.phone}
                    onChange={handleChange}
                    placeholder="Enter mobile number"
                    required
                />
                <button type='submit'>Add Student</button>
            </form>
            {responseText && <p>{responseText}</p>}
        </div>
    );
};

export default StudentData;
