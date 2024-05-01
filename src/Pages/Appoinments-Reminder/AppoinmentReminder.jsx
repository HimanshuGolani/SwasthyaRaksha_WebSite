import React from "react";
import { useState } from "react";

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

  const handleAppointmentDateChange = (date) => {
    setAppointmentDate(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your submission logic here
    console.log("Form submitted");
  };

  return (
    <div className="flex justify-center items-center  bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">
          Enter the details to get the email reminder
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email-input" className="block mb-1">
              Email address
            </label>
            <input
              type="email"
              id="email-input"
              className="w-full border rounded-md px-3 py-2"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="hospital-input" className="block mb-1">
              Hospital Name
            </label>
            <input
              type="text"
              id="hospital-input"
              className="w-full border rounded-md px-3 py-2"
              value={hospitalName}
              onChange={handleHospitalNameChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="doctor-input" className="block mb-1">
              Doctor Name
            </label>
            <input
              type="text"
              id="doctor-input"
              className="w-full border rounded-md px-3 py-2"
              value={doctorName}
              onChange={handleDoctorNameChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="reason-input" className="block mb-1">
              Reason for Visit
            </label>
            <input
              type="text"
              id="reason-input"
              className="w-full border rounded-md px-3 py-2"
              value={reasonForVisit}
              onChange={handleReasonForVisitChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="date-input" className="block mb-1">
              Appointment Date
            </label>
            <input
              type="date"
              id="date-input"
              className="w-full border rounded-md px-3 py-2"
              value={appointmentDate}
              onChange={(e) => handleAppointmentDateChange(e.target.value)}
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
