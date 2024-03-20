import React from "react";

const LabReportsCard = ({ ReportName, ReportDate, ReportType }) => {
  return (
    <>
      <div className="flex gap-5 justify-around  py-2 pr-20 pl-4 border-t border-solid border-t-gray-200 max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
        <div className="w-12 h-25 mx-10 hover:w-full enlarge">
          <img src="https://files.readme.io/4461f3f-q.png" alt="" />
        </div>

        <div className="grow text-center mx-auto my-auto">
          <h2 className="text-base">{"Blood test"}</h2>
        </div>
        <div className="grow text-center my-auto">
          <h2 className="text-base">{"July 28, 2029"}</h2>
        </div>
      </div>
    </>
  );
};

export default LabReportsCard;
