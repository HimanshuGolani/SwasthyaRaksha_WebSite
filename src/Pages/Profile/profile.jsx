import React, { useState, useEffect } from "react";
import axios from "axios";
import AccessToUserCard from "./AccessToUserCard";
import PatientCard from "./PatientCard";
import CircularProgress from "@mui/material/CircularProgress";
import ViewList from "../../Components/ViewList";

const LoadingSpinner = () => (
  <div className="flex justify-center items-center mt-8">
    <CircularProgress color="primary" />
  </div>
);

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [accessTo, setAccessTo] = useState([]);
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewedData, setViewedData] = useState([]);
  const getViewedData = async () => {
    try {
      const id = localStorage.getItem("userId");
      setLoading(true);
      const response = await axios.get(
        `https://swasthyaraksha-backend.onrender.com/api/healthprofiles/getProfileViewLogs?userId=${id}`
      );

      if (response.data.logs) {
        const logsArray = Object.entries(response.data.logs).map(
          ([userId, log]) => ({
            userId,
            name: log.name,
            email: log.email,
            viewedDates: log.viewedDate,
          })
        );

        setViewedData(logsArray);
      } else {
        console.error("No logs found in the response");
      }
    } catch (error) {
      console.error("Error fetching viewed data:", error);
    } finally {
      setLoading(false);
    }
  }; // gets health profile of the user
  const getUserData = async () => {
    const id = localStorage.getItem("userId");
    try {
      const response = await axios.get(
        `https://swasthyaraksha-backend.onrender.com/api/healthprofiles/${id}`
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
        `https://swasthyaraksha-backend.onrender.com/api/user/getAccessUsersInfo?userId=${id}`
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
        `https://swasthyaraksha-backend.onrender.com/api/user/getAccessForData?userId=${id}`
      );
      setListData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAccessTo();
    getUserData();
    getForData();
    getViewedData();
  }, []);

  return (
    <div className="container mx-auto mt-5 px-4">
      <h1 className="text-center text-4xl font-bold mb-8 text-gray-800 font-serif">
        Your Health Profile
      </h1>
      {/* Profile Card Section */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="bg-gray-100 shadow-lg rounded-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-red-500 rounded-full flex justify-center items-center">
              <span className="text-white font-bold text-lg">
                {profileData ? profileData.name[0] : ""}
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
            <div className="text-base text-gray-700">
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
            </div>
          </div>
        </div>
      )}
      {/* Access List Section */}
      {loading ? null : (
        <div className="bg-gray-100 shadow-lg rounded-lg p-8 mb-8">
          <h1 className="text-center text-4xl font-bold mb-8 text-gray-800 font-serif">
            Users with Access to Your Data
          </h1>
          {accessTo.length > 0 ? (
            <>
              {accessTo.map((user, index) => (
                <AccessToUserCard
                  name={user.name}
                  email={user.email}
                  symbolInButton={"Remove"}
                  cuserId={user._id}
                  key={index}
                />
              ))}
            </>
          ) : (
            <>
              {" "}
              <p className="text-center text-gray-700">
                You have not given access to anyone.
              </p>
            </>
          )}
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
      {/* The List of people viewed your profile and when they viewed it . */}
      {loading ? null : (
        <div className="bg-gray-100 shadow-lg rounded-lg p-8 mt-10 mb-10">
          <h1 className="text-center text-4xl font-bold mb-8 text-gray-800 font-serif">
            Who Viewed Your Data?
          </h1>
          {viewedData.length > 0 ? (
            <>
              {viewedData.map((item, index) => (
                <ViewList key={index} viewedData={item} />
              ))}
            </>
          ) : (
            <p className="text-center text-gray-700">
              No one has viewed your data yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
