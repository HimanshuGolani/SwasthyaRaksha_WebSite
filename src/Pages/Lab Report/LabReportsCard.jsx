import React, { useState, useEffect, useRef } from "react";

const LabReportsCard = ({ ReportType, ReportDate, ReportImage }) => {
  const [hovered, setHovered] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
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
          data-src={ReportImage}
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
            <a
              href="#"
              className="bg-green-500 text-white font-bold py-1 px-3 rounded"
              download={ReportImage}
            >
              Download
            </a>
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
