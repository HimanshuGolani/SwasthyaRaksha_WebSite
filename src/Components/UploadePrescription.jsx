import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import "../assets/Uploade.css";
import axios from "axios";

const UploadePrescription = () => {
  const navigator = useNavigate();

  const [prescriptionData, setPrescriptionData] = useState({
    prescriptionImg: "",
    doctorName: "",
    dateOfPrescription: "",
    hospitalName: "",
  });

  const addPrescription = async () => {
    const response = await axios.post(
      `http://localhost:4500/api/prescription/add`,
      {
        DoctorName: prescriptionData.doctorName,
        HospitalName: prescriptionData.doctorName,
        image: prescriptionData.prescriptionImg,
        prescDate: prescriptionData.dateOfPrescription,
        user: localStorage.getItem("userId"),
      }
    );

    console.log(response);
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addPrescription();
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
                  value={prescriptionData.doctorName}
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
                  value={prescriptionData.dateOfPrescription}
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
                  value={prescriptionData.hospitalName}
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
                {/* <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                /> */}
                <input
                  type="text"
                  name="prescriptionImg"
                  value={prescriptionData.prescriptionImg}
                  onChange={handleInputChange}
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
