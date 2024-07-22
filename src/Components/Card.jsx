import React from "react";

const Card = ({ url, contentH, contentD }) => {
  return (
    <div className="flex flex-col ml-2 w-[44%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col grow pb-9 max-md:mt-3 bg-white shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-105">
        <img
          src={url}
          className="w-full object-cover aspect-[1.79] rounded-t-xl"
          alt="Card Image"
          loading="lazy"
        />
        <div className="mt-3 px-4">
          <div className="text-lg font-semibold leading-6 text-neutral-900">
            {contentH}
          </div>
          <div className="text-sm leading-5 text-neutral-500 mt-2">
            {contentD}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
