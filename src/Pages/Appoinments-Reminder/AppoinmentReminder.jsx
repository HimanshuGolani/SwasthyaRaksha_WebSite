import React, { useState } from "react";
import axios from "axios";

const AppointmentReminder = () => {
  const [email, setEmail] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [reasonForVisit, setReasonForVisit] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleHospitalNameChange = (e) => {
    setHospitalName(e.target.value);
  };

  const handleDoctorNameChange = (e) => {
    setDoctorName(e.target.value);
  };

  const handleReasonForVisitChange = (e) => {
    setReasonForVisit(e.target.value);
  };

  const handleAppointmentDateChange = (e) => {
    setAppointmentDate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:4500/api/appoinmnets/setReminderMail",
        {
          email,
          hospitalName,
          doctorName,
          reasonForVisit,
          appointmentDate,
        }
      );
      console.log("Reminder set successfully!");
    } catch (error) {
      console.error("Error occurred while setting reminder:", error);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">
          Enter the details to get the email reminder
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="hospital"
              className="block text-sm font-medium text-gray-700"
            >
              Hospital Name
            </label>
            <input
              type="text"
              id="hospital"
              name="hospital"
              value={hospitalName}
              onChange={handleHospitalNameChange}
              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="doctor"
              className="block text-sm font-medium text-gray-700"
            >
              Doctor Name
            </label>
            <input
              type="text"
              id="doctor"
              name="doctor"
              value={doctorName}
              onChange={handleDoctorNameChange}
              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="reason"
              className="block text-sm font-medium text-gray-700"
            >
              Reason for Visit
            </label>
            <input
              type="text"
              id="reason"
              name="reason"
              value={reasonForVisit}
              onChange={handleReasonForVisitChange}
              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Appointment Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={appointmentDate}
              onChange={handleAppointmentDateChange}
              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Set Reminder
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentReminder;
