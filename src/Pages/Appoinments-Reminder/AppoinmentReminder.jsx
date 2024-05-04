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
        "http://localhost:4500/api/appoinmentreminder/setReminderMail",
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
    <div className="flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">
          Enter the details to get the email reminder
        </h3>
        <form onSubmit={handleSubmit}>
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
