import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import CircularProgressWithLabel from "./CircularProgressWithLabel";
import { useNavigate } from "react-router-dom";

const SignupStepper = () => {
  const [userId, setUserId] = useState();

  const [formData, setFormData] = useState({
    role: "Normal-User",
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    city: "",
    pincode: "",
    heartDisease: false,
    hypertension: false,
    allergies: [],
    diabetes: "No",
  });
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:4500/api/user/signup",
        {
          role: formData.role,
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );
      console.log(response.data);
      setUserId(response.data.user._id);
      console.log(userId);
      await createHealthProfile(userId);
      toast.success("User created successfully!");
      navigator("/");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const createHealthProfile = async (userId) => {
    try {
      await axios.post("http://localhost:4500/api/healthprofiles/create", {
        user: userId,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        city: formData.city,
        pincode: formData.pincode,
        heartDisease: formData.heartDisease,
        hypertension: formData.hypertension,
        allergies: formData.allergies,
        diabetes: formData.diabetes,
      });
    } catch (error) {
      console.error("Error creating health profile:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <h1 className="text-center text-3xl font-bold mb-4">Signup</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="role"
              >
                Select User Type:
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="input-field"
              >
                <option value="Normal-User">Normal User</option>
                <option value="Doctor">Doctor</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name:
              </label>
              <input
                type="text"
                placeholder="Enter Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email:
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password:
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phoneNumber"
              >
                Phone Number:
              </label>
              <input
                type="text"
                placeholder="Enter Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="address"
              >
                Address:
              </label>
              <input
                type="text"
                placeholder="Enter Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="city"
              >
                City:
              </label>
              <input
                type="text"
                placeholder="Enter City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="pincode"
              >
                Pincode:
              </label>
              <input
                type="text"
                placeholder="Enter Pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Health Information:
              </label>
              <div className="mb-2">
                <input
                  type="checkbox"
                  id="heartDisease"
                  name="heartDisease"
                  checked={formData.heartDisease}
                  onChange={handleChange}
                />
                <label htmlFor="heartDisease" className="ml-2">
                  Heart Disease
                </label>
              </div>
              <div className="mb-2">
                <input
                  type="checkbox"
                  id="hypertension"
                  name="hypertension"
                  checked={formData.hypertension}
                  onChange={handleChange}
                />
                <label htmlFor="hypertension" className="ml-2">
                  Hypertension
                </label>
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Allergies:
                </label>
                <input
                  type="text"
                  placeholder="Enter Allergies"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Diabetes:
                </label>
                <div>
                  <input
                    type="radio"
                    id="diabetes-yes"
                    name="diabetes"
                    value="Yes"
                    checked={formData.diabetes === "Yes"}
                    onChange={handleChange}
                  />
                  <label htmlFor="diabetes-yes" className="ml-2">
                    Yes
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="diabetes-no"
                    name="diabetes"
                    value="No"
                    checked={formData.diabetes === "No"}
                    onChange={handleChange}
                  />
                  <label htmlFor="diabetes-no" className="ml-2">
                    No
                  </label>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button
                className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? <CircularProgressWithLabel value={0} /> : "Sign Up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupStepper;
