import React, { useState, useEffect } from "react";
import axios from "axios";
import AccessToUserCard from "./AccessToUserCard";
import PatientCard from "./PatientCard";
import CircularProgress from "@mui/material/CircularProgress";

const LoadingSpinner = () => (
  <div className="flex justify-center items-center mt-8">
    <CircularProgress color="primary" />
  </div>
);

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [accessTo, setAccessTo] = useState([]);
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(true); // Initially set loading to true

  // gets health profile of the user
  const getUserData = async () => {
    const id = localStorage.getItem("userId");
    try {
      const response = await axios.get(
        `http://localhost:4500/api/healthprofiles/${id}`
      );
      setProfileData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // gets the list of the users that the current user have given the access to
  const getAccessTo = async () => {
    const id = localStorage.getItem("userId");

    try {
      const response = await axios.get(
        `http://localhost:4500/api/user/getAccessUsersInfo?userId=${id}`
      );
      setAccessTo(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // get the individual data of the user that the current user can access
  const getForData = async () => {
    const id = localStorage.getItem("userId");

    try {
      const response = await axios.get(
        `http://localhost:4500/api/user/getAccessForData?userId=${id}`
      );
      setListData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  useEffect(() => {
    getAccessTo();
    getUserData();
    getForData();
  }, []);

  return (
    <div className="container mx-auto mt-5 px-4">
      <h1 className="text-center text-4xl font-bold mb-8 text-gray-800 font-serif">
        Your Health Profile
      </h1>

      {/* Profile Card Section */}
      {loading ? (
        <LoadingSpinner /> // Show loading spinner while loading
      ) : (
        <div className="bg-gray-100 shadow-lg rounded-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-red-500 rounded-full flex justify-center items-center">
              <span className="text-white font-bold text-lg">
                {profileData?.name[0]}
              </span>
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-gray-800 font-serif">
                {profileData?.name}
              </h2>
              <p className="text-gray-600">{profileData?.email}</p>
            </div>
          </div>
          <div>
            <p className="text-base text-gray-700">
              <strong>Age:</strong> {profileData?.age}
            </p>
            <p className="text-base text-gray-700">
              <strong>Gender:</strong> {profileData?.gender}
            </p>
            <p className="text-base text-gray-700">
              <strong>Diabetes:</strong> {profileData?.diabetes}
            </p>
            <p className="text-base text-gray-700">
              <strong>Phone Number:</strong> {profileData?.phoneNumber}
            </p>
            <p className="text-base text-gray-700">
              <strong>Allergies:</strong>{" "}
              {profileData?.allergies && profileData.allergies.length > 0 ? (
                <ul>
                  {profileData.allergies.map((allergy, index) => (
                    <li key={index}>{allergy}</li>
                  ))}
                </ul>
              ) : (
                "None"
              )}
            </p>
          </div>
        </div>
      )}

      {/* Access List Section */}
      {loading ? null : (
        <div className="bg-gray-100 shadow-lg rounded-lg p-8 mb-8">
          <h1 className="text-center text-4xl font-bold mb-8 text-gray-800 font-serif">
            Users with Access to Your Data
          </h1>
          {accessTo.map((user, index) => (
            <AccessToUserCard
              name={user.name}
              email={user.email}
              symbolInButton={"Remove"}
              cuserId={user._id}
              key={index}
            />
          ))}
        </div>
      )}

      {/* Users Data List Section */}
      {loading ? null : (
        <div className="bg-gray-100 shadow-lg rounded-lg p-8">
          <h1 className="text-center text-4xl font-bold mb-8 text-gray-800 font-serif">
            Users Data You Can Access
          </h1>
          {listData.length > 0 ? (
            <>
              {listData.map((item) => (
                <PatientCard
                  name={item.name}
                  email={item.email}
                  prescriptions={item.allPrescD}
                  labReports={item.allLabR}
                  key={item._id}
                />
              ))}
            </>
          ) : (
            <p className="text-center text-gray-700">
              You don't have access to any user's data.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
