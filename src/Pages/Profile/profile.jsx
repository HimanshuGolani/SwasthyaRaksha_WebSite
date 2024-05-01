import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
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

    getUserData();
  }, []);

  return (
    <div className="flex items-center justify-center mt-5">
      {profileData ? (
        <Card sx={{ maxWidth: 345, transition: "all 0.3s ease" }} elevation={4}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }}>{profileData.name[0]}</Avatar>
            }
            title={profileData.name}
            subheader={profileData.email}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              <strong>Age:</strong> {profileData.age}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              <strong>Gender:</strong> {profileData.gender}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              <strong>Diabetes:</strong> {profileData.diabetes}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              <strong>Phone Number:</strong> {profileData.phoneNumber}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              <strong>Allergies:</strong>{" "}
              {profileData.allergies && profileData.allergies.length > 0 ? (
                <ul>
                  {profileData.allergies.map((allergy, index) => (
                    <li key={index}>{allergy}</li>
                  ))}
                </ul>
              ) : (
                "None"
              )}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Typography variant="h6" color="text.secondary">
          Loading...
        </Typography>
      )}
    </div>
  );
};

export default Profile;
