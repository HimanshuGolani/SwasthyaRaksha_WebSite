import React, { useState } from "react";

const PrescriptionCard = ({
  prescUrl,
  DoctorName,
  HospitalName,
  DateOfReport,
}) => {
  const [enlarged, setEnlarged] = useState(false);

  const handleImageClick = () => {
    setEnlarged(!enlarged);
  };

  return (
    <>
      <div className="flex gap-5 justify-between px-4 py-2 mt-2 w-full bg-white leading-[150%] max-w-[960px] max-md:flex-wrap max-md:max-w-full">
        <div className="flex gap-4 justify-between pr-20 max-md:flex-wrap max-md:max-w-full">
          <img
            src={prescUrl}
            className={`w-20 aspect-square rounded shadow-lg hover:w-full h-auto ${
              enlarged ? "enlarge" : ""
            }`}
            onClick={handleImageClick}
          />
          <div className="flex flex-col flex-1 justify-center my-auto">
            <div className="text-base font-medium text-neutral-900">
              {DoctorName}
            </div>
            <div className="text-sm whitespace-nowrap text-neutral-500">
              {HospitalName}
            </div>
          </div>
        </div>
        <div className="my-auto text-base text-neutral-900">{DateOfReport}</div>
      </div>
    </>
  );
};

export default PrescriptionCard;
