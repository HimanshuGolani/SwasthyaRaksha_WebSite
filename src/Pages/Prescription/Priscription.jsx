import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PrescriptionCard from "./PrescriptionCard";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

const LoadingSpinner = () => (
  <div className="m-auto flex justify-center items-center h-32">
    <CircularProgress color="primary" size={64} thickness={4} />
  </div>
);

const Prescription = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllPrescriptions = async () => {
    try {
      const id = localStorage.getItem("userId");
      const response = await axios.get(
        `https://swasthyaraksha-backend.onrender.com/api/prescription/${id}`
      );
      const data = response.data.prescription;
      setPrescriptions(data.prescriptions);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPrescriptions();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center pb-5 bg-white">
        <div className="justify-center text-center items-start py-4 pr-16 pl-4 mt-5 max-w-full text-3xl font-bold tracking-tighter whitespace-nowrap text-neutral-900 w-[960px] max-md:pr-5">
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
                <Link to={"/uploadeP"}>Add Prescription</Link>
              </div>
            </div>
          </div>
          <div className="mt-8 text-lg font-bold tracking-tight text-neutral-900 max-md:max-w-full">
            {loading ? (
              <LoadingSpinner />
            ) : prescriptions.length > 0 ? (
              prescriptions.map((item, index) => (
                <PrescriptionCard
                  prescUrl={item.image}
                  DoctorName={item.DoctorName}
                  HospitalName={item.HospitalName}
                  DateOfReport={item.prescDate}
                  key={index}
                />
              ))
            ) : (
              <div className="flex justify-center align-center m-auto">
                <h1>No prescriptions added yet please add</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Prescription;
