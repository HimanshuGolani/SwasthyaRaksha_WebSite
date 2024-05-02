import React, { useState } from "react";
import "../assets/login.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";
import CircularProgressWithLabel from "./CircularProgressWithLabel";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [userEmail, setuserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const loginReq = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:4500/api/user/login`,
        {
          email: userEmail,
          password: password,
        }
      );
      setuserEmail("");
      setPassword("");
      setLoading(false);
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      setLoading(false);
      return null;
    }
  };

  const handleLogin = async () => {
    const data = await loginReq();
    if (data) {
      toast.success("Login successful!", {
        onClose: () => {
          localStorage.setItem("userId", data.id);
          localStorage.setItem("userInfo", JSON.stringify(data.userData));

          dispatch(authActions.login());
          navigate("/");
        },
      });
    } else {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <>
      <ToastContainer />
      {!loading ? (
        <div className="main-div">
          <div className="login-form">
            <div className="form-heading">
              <h1 className="">Login</h1>
            </div>
            <div className="form-inputs">
              <input
                type="text"
                placeholder="Enter Email"
                className="user-input border border-sky-900 rounded"
                value={userEmail}
                onChange={(e) => setuserEmail(e.target.value)}
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
                <button onClick={handleLogin}>Login</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="m-auto">
            <CircularProgressWithLabel />
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
