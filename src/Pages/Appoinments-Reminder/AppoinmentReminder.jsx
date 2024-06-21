import React, { useState, useEffect } from "react";
import axios from "axios";

const AppointmentReminder = () => {
  const [formData, setFormData] = useState({
    email: "",
    hospitalName: "",
    doctorName: "",
    reasonForVisit: "",
    appointmentDate: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [currentStep, setCurrentStep] = useState(null); // Using null to denote no step initially
  const [loadingAppointments, setLoadingAppointments] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAppointments(); // Fetch appointments on component mount
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSetReminder = () => {
    setCurrentStep("setReminder");
    setMessage("");
  };

  const fetchAppointments = async () => {
    setLoadingAppointments(true);
    try {
      const response = await axios.get(
        "http://localhost:4500/api/appointments"
      );
      setAppointments(response.data);
      setError("");
    } catch (error) {
      console.error("Error occurred while fetching appointments:", error);
      setError("Failed to fetch appointments. Please try again later.");
    } finally {
      setLoadingAppointments(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        "http://localhost:4500/api/appointments/setReminderMail",
        formData
      );
      setMessage("Reminder set successfully!");
      console.log("Reminder set successfully!", response.data);
      await fetchAppointments(); // Refresh appointments after setting reminder
      setCurrentStep("viewAppointments");
    } catch (error) {
      setMessage("Error occurred while setting reminder.");
      console.error("Error occurred while setting reminder:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToChoices = () => {
    setMessage("");
    setCurrentStep(null);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          {currentStep === null && (
            <>
              <h2 className="text-2xl font-semibold mb-6 text-blue-600">
                Choose an Action
              </h2>
              <button
                onClick={handleSetReminder}
                className="block w-full py-3 px-4 mb-4 rounded-md text-white bg-blue-500 hover:bg-blue-600 transition-colors"
              >
                Set Appointment Reminder
              </button>
              <button
                onClick={() => {
                  fetchAppointments();
                  setCurrentStep("viewAppointments");
                }}
                className="block w-full py-3 px-4 mb-4 rounded-md text-white bg-blue-500 hover:bg-blue-600 transition-colors"
              >
                View Appointments
              </button>
            </>
          )}
          {currentStep === "setReminder" && (
            <>
              <h2 className="text-2xl font-semibold mb-6 text-blue-600">
                Set Appointment Reminder
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { label: "Email", name: "email", type: "email" },
                  {
                    label: "Hospital Name",
                    name: "hospitalName",
                    type: "text",
                  },
                  { label: "Doctor Name", name: "doctorName", type: "text" },
                  {
                    label: "Reason for Visit",
                    name: "reasonForVisit",
                    type: "text",
                  },
                  {
                    label: "Appointment Date",
                    name: "appointmentDate",
                    type: "datetime-local",
                  },
                ].map(({ label, name, type }) => (
                  <div key={name}>
                    <label
                      htmlFor={name}
                      className="block text-sm font-medium text-gray-700"
                    >
                      {label}
                    </label>
                    <input
                      type={type}
                      id={name}
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      className="mt-1 border border-black block w-full rounded-md h-8 px-3 shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                ))}
                <button
                  type="submit"
                  className={`w-full py-3 px-4 rounded-md text-white transition-colors ${
                    isSubmitting
                      ? "bg-gray-500"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Setting Reminder..." : "Set Reminder"}
                </button>
                {message && (
                  <div
                    className={`mt-4 text-center text-sm ${
                      message.includes("successfully")
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {message}
                  </div>
                )}
                <button
                  onClick={handleBackToChoices}
                  className="block w-full py-3 px-4 mt-4 rounded-md text-white bg-blue-500 hover:bg-blue-600 transition-colors"
                >
                  Back to Choices
                </button>
              </form>
            </>
          )}
          {currentStep === "viewAppointments" && (
            <>
              <h2 className="text-2xl font-semibold mb-6 text-blue-600">
                View Appointments
              </h2>
              {loadingAppointments ? (
                <p className="text-center">Loading appointments...</p>
              ) : error ? (
                <p className="text-center text-red-500">{error}</p>
              ) : appointments.length > 0 ? (
                <div className="space-y-4">
                  {appointments.map((appointment, index) => (
                    <div
                      key={index}
                      className="border p-4 rounded-md shadow-sm"
                    >
                      <p>
                        <strong>Email:</strong> {appointment.email}
                      </p>
                      <p>
                        <strong>Hospital:</strong> {appointment.hospitalName}
                      </p>
                      <p>
                        <strong>Doctor:</strong> {appointment.doctorName}
                      </p>
                      <p>
                        <strong>Reason:</strong> {appointment.reasonForVisit}
                      </p>
                      <p>
                        <strong>Date:</strong>{" "}
                        {new Date(appointment.appointmentDate).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center">No appointments found.</p>
              )}
              <button
                onClick={handleBackToChoices}
                className="block w-full py-3 px-4 mt-4 rounded-md text-white bg-blue-500 hover:bg-blue-600 transition-colors"
              >
                Back to Choices
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentReminder;
