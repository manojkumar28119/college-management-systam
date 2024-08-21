import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseData from '../courseData';
import StaffData from "../staffData";
import StudentData from "../StudentData";
import "./index.css"


function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [isLoaded,setloaded] = useState(false)


  const getData = async () => {
    setloaded(false)
    const response = await fetch("http://localhost:4000/alldata");

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setData(data);
      setloaded(true)
    } else {
      console.error("Failed to fetch data");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token'); // Get the JWT token from localStorage

    

    if (!token) {
      navigate('/signin'); // Redirect to signin if no token is found
    } else {
      getData(); // Call getData if token exists
    }
  }, [navigate]); // Add navigate as a dependency

  return (
    <div className='home'>
      <h1>Welcome to Home Page</h1>
      {/* Your home page content */}
      {isLoaded && <>
        <CourseData courses = {data.courses} getData = {getData} />
        <StaffData staff = {data.staff} getData = {getData} />
        <StudentData students = {data.students} getData = {getData} />
      </>}
    </div>
  );
}

export default Home;
