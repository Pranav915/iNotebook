import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  let navigate = useNavigate();
  const host = "https://i-notebook915.herokuapp.com";
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = `${host}/api/auth/login`;
    const response = await fetch(url, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    // console.log(json);
    if (json.success === true) {
      localStorage.setItem("token", json.authToken);
      localStorage.setItem("name", json.userName);
      props.showAlert(`Welcome ${localStorage.getItem("name")}`, "success");
      navigate("/");
    } else {
      // alert("Invalid Credentials")
      props.showAlert("Invalid Credentials", "danger");
    }
  };
  return (
    <div className="mt-3">
      <h2 className="text-center">Login to continue to iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={credentials.email}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
