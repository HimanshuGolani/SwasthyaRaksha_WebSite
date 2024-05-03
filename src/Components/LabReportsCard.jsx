import React, { useState } from "react";
import axios from "axios";

const LabReportsCard = ({ ReportType, ReportDate, ReportImage }) => {
  const [hovered, setHovered] = useState(false);

  const handleDownload = () => {
    axios
      .get(ReportImage, { responseType: "blob" })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "report_image.jpg");
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error downloading image:", error);
      });
  };

  return (
    <div
      className="bg-white shadow-md rounded-md overflow-hidden mt-5"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative">
        <img
          src={ReportImage}
          alt="Report"
          className="w-full h-40 object-cover"
        />
        {hovered && (
          <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-40">
            <button
              className="bg-blue-500 text-white font-bold py-1 px-3 rounded mr-2"
              onClick={() => window.open(ReportImage, "_blank")}
            >
              View Fullscreen
            </button>
            <button
              className="bg-green-500 text-white font-bold py-1 px-3 rounded"
              onClick={handleDownload}
            >
              Download
            </button>
          </div>
        )}
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">
          Report Name : {ReportType}
        </h2>
        <h3 className="text-sm text-gray-600">Report Date : {ReportDate}</h3>
      </div>
    </div>
  );
};

export default LabReportsCard;
