import React from "react";
import PrescriptionCard from "../../Components/PrescriptionCard";
const Test = () => {
  return (
    <>
      <div className="flex flex-col items-center pb-5 bg-white">
        <div className="justify-center text-center	 items-start py-4 pr-16 pl-4 mt-5 max-w-full text-3xl font-bold tracking-tighter whitespace-nowrap text-neutral-900 w-[960px] max-md:pr-5">
          Prescriptions
        </div>
        <div className="flex flex-col px-4 mt-4 w-full max-w-[960px] max-md:max-w-full">
          <div className="flex gap-5 justify-between px-5 py-5 bg-white rounded-xl border border-solid border-neutral-200 max-md:flex-wrap max-md:max-w-full">
            <div className="flex flex-col text-base max-md:max-w-full">
              <div className="font-bold  text-neutral-900 max-md:max-w-full">
                Add Prescription
              </div>
              <div className="mt-1 leading-[150%] text-neutral-500 max-md:max-w-full">
                You can add a prescription from your camera roll or take a
                picture of it.
              </div>
            </div>
            <div className="flex flex-col justify-center px-4 py-1.5 my-auto text-sm font-medium leading-5 whitespace-nowrap bg-green-500 rounded-xl text-neutral-900">
              <div className="justify-center bg-green-500">
                Add from camera roll
              </div>
            </div>
          </div>
          <div className="mt-8 text-lg font-bold tracking-tight text-neutral-900 max-md:max-w-full">
            Prescriptions
          </div>
        </div>

        <PrescriptionCard />
      </div>
    </>
  );
};

export default Test;
