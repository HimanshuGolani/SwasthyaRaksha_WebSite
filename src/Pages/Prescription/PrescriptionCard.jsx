import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const PrescriptionCard = ({
  prescUrl,
  DoctorName,
  HospitalName,
  DateOfReport,
}) => {
  const [hovered, setHovered] = useState(false);
  const imageRef = useRef(null);

  const handleDownload = () => {
    axios
      .get(prescUrl, { responseType: "blob" })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "prescription_image.jpg");
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error downloading image:", error);
      });
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          lazyImage.src = prescUrl;
          observer.unobserve(lazyImage);
        }
      });
    });

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  return (
    <div
      className="bg-white shadow-md rounded-md overflow-hidden mt-5"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative">
        <img
          ref={imageRef}
          src=""
          data-src={prescUrl}
          alt="Report"
          className="w-full h-40 object-cover"
        />
        {hovered && (
          <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-40">
            <button
              className="bg-blue-500 text-white font-bold py-1 px-3 rounded mr-2"
              onClick={() => window.open(prescUrl, "_blank")}
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
        <h3 className="text-lg font-semibold mb-2">
          Name of Doctor : {DoctorName}
        </h3>
        <h3 className="text-lg font-semibold mb-2">
          Name of the Hospital : {HospitalName}
        </h3>
        <h3 className="text-sm text-gray-600">
          Date of Prescription : {DateOfReport}
        </h3>
      </div>
    </div>
  );
};

export default PrescriptionCard;
