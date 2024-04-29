import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios, { formToJSON } from "axios";

const Profile = () => {
  const [expanded, setExpanded] = React.useState(false);
  const [profileData, setProfileData] = useState({});

  let userName = "";
  const getUserData = async () => {
    const id = localStorage.getItem("userId");
    try {
      const response = await axios.get(
        `http://localhost:4500/api/healthprofiles/${id}`
      );
      const data = response.data;
      console.log(data);

      userName = response.data.profileData.name;
      console.log(response.data);
      setProfileData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <div className="flex items-center justify-center mt-5">
        <div className="flex items-center justify-center text-lg">
          <div className="text-center md:text-green-600 text-5xl font-extrabold tracking-tighter max-md:mt-10 max-md:max-w-full max-md:text-3xl">
            <h3>Please fill the form... </h3>{" "}
            <em className="underline">
              <Link to="/HealthProfile">Form</Link>
            </em>
          </div>
        </div>
      </div>
      {profileData ? (
        <div className="flex items-center justify-center mt-5 ">
          <Card sx={{ maxWidth: 345, width: 350 }}>
            <CardHeader
              sx={{ fontSize: "bold" }}
              avatar={<Avatar sx={{ bgcolor: red[500] }}></Avatar>}
              title="User Name"
            />

            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Age: {profileData.age}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Blood Group: {profileData.bloodGroup}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Diabetic: {profileData.diabetic ? "Yes" : "No"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pancreatic: {profileData.pancreatic ? "Yes" : "No"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sugar Type: {profileData.sugarType}
              </Typography>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="flex justify-center align-center md:text-green-500 mt-8">
          <h2>
            You havent filled the Card Data please fill it form the above form{" "}
          </h2>
        </div>
      )}
    </>
  );
};

export default Profile;
