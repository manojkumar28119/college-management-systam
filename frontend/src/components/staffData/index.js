import React, { useState } from 'react';

const StaffData = () => {
    const [newStaff, setNewStaff] = useState({ name: "", email: "", phone: "" });
    const [responseText, setResponseText] = useState("");

    const addStaff = async (e) => {
        e.preventDefault(); // Prevent form submission from reloading the page

        const url = "http://localhost:4000/add-staff";

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
            <h2>Staff Management</h2>
            <form onSubmit={addStaff}>
                <input
                    type="text"
                    name='name'
                    value={newStaff.name}
                    onChange={handleChange}
                    placeholder="Enter staff name"
                    required
                />
                <input
                    type="email"
                    name='email'
                    value={newStaff.email}
                    onChange={handleChange}
                    placeholder="Enter staff email"
                    required
                />
                <input
                    type="number"
                    name='phone'
                    value={newStaff.phone}
                    onChange={handleChange}
                    placeholder="Enter staff mobile number"
                    required
                />
                <button type='submit'>Add Staff</button>
            </form>
            {responseText && <p>{responseText}</p>}
        </div>
    );
};

export default StaffData;
