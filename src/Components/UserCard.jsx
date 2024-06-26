import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { green } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { Avatar, Box } from "@mui/material";

const UserCard = ({ user, healthProfileId }) => {
  const { _id } = user;
  const [expanded, setExpanded] = useState(false);
  const [healthProfile, setHealthProfile] = useState(null);
  const [error, setError] = useState(null);

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const getHealthProfileData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4500/api/healthprofiles/${_id}`
      );
      setHealthProfile(response.data);
    } catch (error) {
      setError("Error fetching health profile data");
    }
  };

  useEffect(() => {
    getHealthProfileData();
  }, [_id]);

  if (error) {
    return <Typography variant="body1">{error}</Typography>;
  }

  const addUserDateTime = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const name = localStorage.getItem("userName");
      const email = localStorage.getItem("userEmail");

      console.log("====================================");
      console.log(userId, name, email, healthProfileId);
      console.log("====================================");

      const response = await axios.post(
        `http://localhost:4500/api/healthprofiles/whoViewdProfile/?userId=${userId}&name=${name}&email=${email}&healthProfileId=${healthProfileId}`
      );

      console.log(response.data);
    } catch (error) {
      console.error("Error logging profile view:", error);
    }
  };

  return (
    <Box mx="auto" my={2} width="100%" maxWidth={345}>
      <Card>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: green[500] }} aria-label="user">
              {user.name.charAt(0)}
            </Avatar>
          }
          title={user.name}
          subheader={user.email}
        />

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {healthProfile ? (
              <>Phone Number: {healthProfile.phoneNumber}</>
            ) : (
              <>Loading...</>
            )}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <ExpandMore
            expand={expanded}
            onClick={() => {
              setExpanded(!expanded);
              if (expanded) {
                addUserDateTime();
              }
            }}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Health Profile:</Typography>
            {healthProfile ? (
              <>
                <Typography paragraph>Age: {healthProfile.age}</Typography>
                <Typography paragraph>
                  Gender: {healthProfile.gender}
                </Typography>
                <Typography paragraph>
                  Heart Disease: {healthProfile.heartDisease ? "Yes" : "No"}
                </Typography>
                <Typography paragraph>
                  Hypertension: {healthProfile.hypertension ? "Yes" : "No"}
                </Typography>
                <Typography paragraph>
                  Allergies: {healthProfile.allergies.join(", ")}
                </Typography>
                <Typography paragraph>
                  Diabetes: {healthProfile.diabetes ? "Yes" : "No"}
                </Typography>
              </>
            ) : (
              <Typography>Not filled the health profile</Typography>
            )}
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  );
};

export default UserCard;
