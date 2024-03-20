import React, { useState } from "react";
import "../assets/login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="main-div">
        <div className="login-form">
          <div className="form-heading">
            <h1 className="">Login</h1>
          </div>
          <div className="form-inputs">
            <input
              type="text"
              placeholder="Username"
              className="user-input border border-sky-900 rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="password-input border border-sky-900 rounded">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="toggle-password"
                onClick={handlePasswordVisibility}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
            <div className="submit-btn">
              <button>Login</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
