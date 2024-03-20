import React from "react";

const Card = ({  url, contentH, contentD }) => {
 

  return (
   
      <div className="flex flex-col ml-2 w-[44%] max-md:ml-0 max-md:w-full">
        <div className="flex flex-col grow pb-9 max-md:mt-3">
          <img
            src={url} 
            className="w-full object-cover aspect-[1.79] rounded-xl"
            alt="Card Image"
          />
          <div className="mt-3 text-base font-medium leading-6 whitespace-nowrap text-neutral-900">
            {contentH}
          </div>
          <div className="text-sm leading-5 text-neutral-500">{contentD}</div>
        </div>
      </div>
    
  );
};

export default Card;
