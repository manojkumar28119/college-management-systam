import React, { useState } from "react";
 
const SignIn = ({ setAuthToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
       const response = await fetch("http://localhost:4000/login",{
        method:"POST",
        headers:{
            "Content-Type": "application/json "
        },
        body: JSON.stringify({username,password})
      })

      console.log(response)

      

      if(response.ok)
      {
        const { jwtToken } = await response.json();
        console.log(jwtToken)
        localStorage.setItem("token", jwtToken);
      }else{
        setError("Inavlid Password")
      }

  
  };


  console.log(username)
  console.log(password)

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <input
          type="email"
          value={username}
          placeholder="Email"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SignIn;
