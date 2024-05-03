import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LabReportsCard from "../../Components/LabReportsCard";
import axios from "axios";

const LabReport = () => {
  const [labReportData, setLabReportData] = useState([]);
  const id = localStorage.getItem("userId");
  const getLabR = async () => {
    const response = await axios.get(`http://localhost:4500/api/labR/${id}`);
    console.log(response.data.labReport);
    setLabReportData(response.data.labReport.labReports);
  };

  useEffect(() => {
    getLabR();
  }, []);
  return (
    <>
      <div className="flex flex-col items-center pb-12 bg-white text-neutral-900">
        <div className="flex gap-5 justify-between p-4 mt-5 w-full max-w-[960px] max-md:flex-wrap max-md:max-w-full">
          <div className="flex justify-center m-auto text-3xl font-bold tracking-tighter">
            Your reports
          </div>
        </div>
        <div className="flex  mt-3 w-full text-base leading-5 bg-gray-100 rounded-xl max-w-[928px] text-neutral-500 max-md:flex-wrap max-md:max-w-full">
          <div className="flex-auto max-md:max-w-full">
            <div className="flex gap-5 justify-between px-5 py-5 bg-white rounded-xl border border-solid border-neutral-200 max-md:flex-wrap max-md:max-w-full">
              <div className="flex flex-col text-base max-md:max-w-full">
                <div className="font-bold  text-neutral-900 max-md:max-w-full">
                  Add Reports
                </div>
                <div className="mt-1 leading-[150%] text-neutral-500 max-md:max-w-full">
                  You can add a prescription from your camera roll or take a
                  picture of it.
                </div>
              </div>
              <div className="flex flex-col justify-center px-4 py-1.5 my-auto text-sm font-medium leading-5 whitespace-nowrap bg-green-500 rounded-xl text-neutral-900">
                <div className="justify-center bg-green-500">
                  <Link to={"/uploadeR"}>Upload a report</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col p-px mt-6 w-full text-sm leading-5 bg-white rounded-xl border border-solid border-neutral-200 max-w-[928px] max-md:max-w-full">
          {labReportData.map((labReport, index) => (
            <LabReportsCard
              key={index}
              ReportImage={labReport.image}
              ReportType={labReport.ReportName}
              ReportDate={labReport.ReportDate}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default LabReport;
