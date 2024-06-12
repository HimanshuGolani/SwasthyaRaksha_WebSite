import React from "react";

function ViewList({ viewedData }) {
  const { name, viewedDates } = viewedData;

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  return (
    <>
      <div className="flex items-center justify-between bg-white p-4 mb-4 rounded-lg shadow">
        <div className="flex items-center space-x-4">
          <div className="bg-gray-300 h-12 w-12 rounded-full flex items-center justify-center text-gray-700 font-bold">
            {name}
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-800">{name}</p>
            <p className="text-sm text-gray-500">Viewed on</p>
            {viewedDates &&
              viewedDates.map((date, index) => (
                <p key={index}>{formatDate(date)}</p>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewList;
