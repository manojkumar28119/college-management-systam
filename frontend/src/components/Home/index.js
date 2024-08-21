import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseData from '../courseData';
import StaffData from "../staffData";
import StudentData from "../StudentData";

function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token'); // Get the JWT token from localStorage

    const getData = async () => {
      const response = await fetch("http://localhost:4000/alldata");

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setData(data);
      } else {
        console.error("Failed to fetch data");
      }
    };

    if (!token) {
      navigate('/signin'); // Redirect to signin if no token is found
    } else {
      getData(); // Call getData if token exists
    }
  }, [navigate]); // Add navigate as a dependency

  return (
    <div>
      <h1>Welcome to Home Page</h1>
      {/* Your home page content */}
      <CourseData />
      <StaffData />
      <StudentData />
    </div>
  );
}

export default Home;
