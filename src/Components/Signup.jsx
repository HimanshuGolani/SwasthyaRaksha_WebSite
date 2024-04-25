import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgressWithLabel from "./CircularProgressWithLabel";
import { useNavigate } from "react-router-dom";

const SignupStepper = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();
  let userId;
  const [formData, setFormData] = useState({
    role: "Normal-User",
    userName: "",
    userEmail: "",
    password: "",
    bloodGroup: "",
    age: "",
    pancreatic: false,
    sugarType: "",
    diabetic: false,
    phoneNumber: "",
    address: "",
    city: "",
    pincode: "",
    image: "",
  });

  useEffect(() => {
    const updateProgressBar = () => {
      const progressBar = document.getElementById("progress-bar");
      const progress = ((currentStep - 1) / 3) * 100;
      progressBar.style.width = `${progress}%`;
    };
    updateProgressBar();
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
      // Last step, perform signup
      signup();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  const signup = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:4500/api/user/signup",
        {
          role: formData.role,
          name: formData.userName,
          email: formData.userEmail,
          password: formData.password,
        }
      );
      console.log(response);
      userId = await response.data.user._id;
      // Assuming signup is successful, proceed to create health profile
      await createHealthProfile();
      toast.success("User created successfully!");
      navigator("/");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const createHealthProfile = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4500/api/healthprofiles/create",
        {
          user: userId,
          phoneNumber: formData.phoneNumber,
          address: formData.address,
          city: formData.city,
          pincode: formData.pincode,
          bloodGroup: formData.bloodGroup,
          age: formData.age,
          pancreatic: formData.pancreatic,
          sugarType: formData.sugarType,
          diabetic: formData.diabetic,
        }
      );
      console.log("Health profile created:", response.data);
    } catch (error) {
      console.error("Error creating health profile:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer />

      <div className="flex justify-center ml-auto mr-auto align-center flex-col">
        <div className="stepper flex items-center justify-center mb-8">
          <div
            className={`step ${currentStep > 1 ? "complete" : ""} ${
              currentStep === 1 ? "active" : ""
            } mx-2`}
          >
            <div className="step-number w-10 h-10 flex items-center justify-center rounded-full bg-gray-300">
              1
            </div>
            <div className="step-name mt-2">User Type</div>
          </div>
          <div
            className={`step ${currentStep > 2 ? "complete" : ""} ${
              currentStep === 2 ? "active" : ""
            } mx-2`}
          >
            <div className="step-number w-10 h-10 flex items-center justify-center rounded-full bg-gray-300">
              2
            </div>
            <div className="step-name mt-2">User Info</div>
          </div>
          <div className={`step ${currentStep === 3 ? "active" : ""} mx-2`}>
            <div className="step-number w-10 h-10 flex items-center justify-center rounded-full bg-gray-300">
              3
            </div>
            <div className="step-name mt-2">Health Card</div>
          </div>
        </div>
        <div className="progress-bar relative flex items-center h-2 w-full max-w-screen-lg mx-auto bg-gray-400 rounded-full">
          <div
            id="progress-bar"
            className="progress absolute h-full bg-blue-500 rounded-full"
            style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="step-component mt-8">
        {currentStep === 1 && (
          <div>
            <label htmlFor="role">Select User Type:</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="input-field"
            >
              <option value="user">Normal User</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>
        )}
        {currentStep === 2 && (
          <div>
            <input
              type="text"
              placeholder="Enter Name"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Enter Email"
              name="userEmail"
              value={formData.userEmail}
              onChange={handleChange}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Enter Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input-field"
            />
          </div>
        )}
        {currentStep === 3 && (
          <div>
            {/* Health profile fields */}
            <input
              type="text"
              placeholder="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="input-field"
            />
            <input
              type="text"
              placeholder="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="input-field"
            />
            {/* Additional fields */}
            <input
              type="text"
              placeholder="Blood Group"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="input-field"
            />
            <div className="radio-group">
              <label htmlFor="sugarType">Blood Pressure Type:</label>
              <div>
                <input
                  type="radio"
                  id="high-bp"
                  name="sugarType"
                  value="high-bp"
                  checked={formData.sugarType === "high-bp"}
                  onChange={handleChange}
                />
                <label htmlFor="high-bp">High Blood Pressure</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="low-bp"
                  name="sugarType"
                  value="low-bp"
                  checked={formData.sugarType === "low-bp"}
                  onChange={handleChange}
                />
                <label htmlFor="low-bp">Low Blood Pressure</label>
              </div>
            </div>
            <div className="checkbox-group">
              <label htmlFor="diabetic">Any Diabetic issue?</label>
              <input
                type="checkbox"
                id="diabetic"
                name="diabetic"
                checked={formData.diabetic}
                onChange={handleCheckboxChange}
              />
            </div>
          </div>
        )}
      </div>

      <div className="buttons-container mt-8">
        {currentStep > 1 && (
          <button
            className="btn bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-4"
            onClick={handlePrevious}
          >
            Previous
          </button>
        )}
        {!loading && (
          <button
            className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleNext}
          >
            {currentStep === 3 ? "Sign Up" : "Next"}
          </button>
        )}
        {loading && (
          <div className="mt-8">
            <CircularProgressWithLabel value={0} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupStepper;
