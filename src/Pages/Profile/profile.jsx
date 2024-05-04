import { useState, useEffect } from "react";
import axios from "axios";
import AccessToUserCard from "./AccessToUserCard";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [accessTo, setAccessTo] = useState([]);

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

  const getAccessTo = async () => {
    const id = localStorage.getItem("userId");

    try {
      const response = await axios.get(
        `http://localhost:4500/api/user/getAccessUsersInfo?userId=${id}`
      );
      setAccessTo(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAccessTo();
    getUserData();
  }, []);

  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-center text-3xl font-bold mb-5">
        Your Health Profile
      </h1>
      <div className="flex flex-col gap-6 md:flex-row">
        {/* Health Profile Section */}
        <div className="max-w-md bg-white rounded-lg shadow-md m-auto">
          <div className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-red-500 rounded-full flex justify-center items-center">
                <span className="text-white font-bold text-lg">
                  {profileData?.name[0]}
                </span>
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-semibold">{profileData?.name}</h2>
                <p className="text-gray-600">{profileData?.email}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-700">
                <strong>Age:</strong> {profileData?.age}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Gender:</strong> {profileData?.gender}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Diabetes:</strong> {profileData?.diabetes}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Phone Number:</strong> {profileData?.phoneNumber}
              </p>
              <p className="text-sm text-gray-700">
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
        </div>
      </div>
      <div className="container mx-auto mt-5">
        <h1 className="text-center text-3xl font-bold mb-5">
          The list of the users that have access to your data
        </h1>
        {/* Access List Section */}

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
    </div>
  );
};

export default Profile;
