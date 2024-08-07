import React, { useState } from "react";
import DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/Uploade.css";

const UploadinReports = () => {
  const navigator = useNavigate();

  const [reportData, setReportData] = useState({
    reportName: "",
    reportDate: "",
    reportImage: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReportData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   setReportData((prevData) => ({
  //     ...prevData,
  //     reportImage: file,
  //   }));
  // };

  const handleDateChange = (date) => {
    setReportData((prevData) => ({
      ...prevData,
      reportDate: date.format("DD-MM-YYYY"),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", reportData);
    navigator("/labReport");
  };

  const addLabReports = async () => {
    const response = await axios.post(
      `https://swasthyaraksha-backend.onrender.com/api/labR/add`,
      {
        ReportName: reportData.reportName,
        ReportDate: reportData.reportDate,
        image: reportData.reportImage,
        user: localStorage.getItem("userId"),
      }
    );
    const data = response.data;
    setReportData(data);
  };

  return (
    <>
      <div className="center-div">
        <h1 className="heading">Report Upload Page</h1>
        <div className="form-div">
          <form className="form" onSubmit={handleSubmit}>
            <ol>
              <li>
                <input
                  type="text"
                  name="reportName"
                  value={reportData.reportName}
                  onChange={handleInputChange}
                  placeholder="Enter the name of the report"
                />
              </li>
              <br />
              <hr />
              <br />

              <li>
                <label>Select the date of the report</label>
                <br />
                <DateTime
                  name="reportDate"
                  value={reportData.reportDate}
                  onChange={handleDateChange}
                  timeFormat={false}
                  inputProps={{ placeholder: "DD-MM-YYYY" }}
                />
              </li>
              <br />
              <hr />
              <br />

              <li>
                <p>Select the image from your files.</p>
                <br />
                {/* <input
                  onChange={handleFileChange}
                  type="file"
                  name="reportImage"
                /> */}
                <input
                  type="text"
                  name="reportImage"
                  value={reportData.reportImage}
                  onChange={handleInputChange}
                />
              </li>
            </ol>

            <button
              type="submit"
              className="bg-blue-900 text-white px-4 py-2 rounded-md mt-4"
              onClick={addLabReports}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UploadinReports;
