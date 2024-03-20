import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import "../assets/Uploade.css";

const UploadePrescription = () => {
  const navigator = useNavigate();

  const [prescriptionData, setPrescriptionData] = useState({
    prescriptionImg: null,
    doctorName: "",
    dateOfPrescription: "",
    hospitalName: "",
  });

  const { doctorName, dateOfPrescription, hospitalName } = prescriptionData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPrescriptionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setPrescriptionData((prevData) => ({
      ...prevData,
      dateOfPrescription: date.format("DD-MM-YYYY"),
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPrescriptionData((prevData) => ({
      ...prevData,
      prescriptionImg: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", prescriptionData);
    navigator("/prescription");
  };

  return (
    <>
      <div className="center-div">
        <h1 className="heading">Prescription Upload Page</h1>
        <div className="form-div">
          <form className="form" onSubmit={handleSubmit}>
            <ol>
              <li>
                <input
                  type="text"
                  name="doctorName"
                  value={doctorName}
                  onChange={handleInputChange}
                  placeholder="Enter the doctor's name"
                />
              </li>
              <br />
              <hr />
              <br />

              <li>
                <label>Select the date of the report</label>
                <br />
                <DateTime
                  name="dateOfPrescription"
                  value={dateOfPrescription}
                  onChange={handleDateChange}
                  timeFormat={false}
                  inputProps={{ placeholder: "DD-MM-YYYY" }}
                />
              </li>
              <br />
              <hr />
              <br />

              <li>
                <input
                  type="text"
                  name="hospitalName"
                  value={hospitalName}
                  onChange={handleInputChange}
                  placeholder="Enter the hospital name"
                />
              </li>
              <br />
              <hr />
              <br />

              <li>
                <p>Select the prescription image from your files.</p>
                <br />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </li>
            </ol>
            <button
              type="submit"
              className="bg-blue-900 text-white px-4 py-2 rounded-md mt-4"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UploadePrescription;
