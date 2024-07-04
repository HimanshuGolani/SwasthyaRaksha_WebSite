import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import axios from "axios";

const AccessToUserCard = ({ name, email, symbolInButton, cuserId }) => {
  const removeAccess = async () => {
    try {
      const id = localStorage.getItem("userId");

      // Specify the endpoint for the PUT request
      const response = await axios.put(
        `https://swasthyaraksha-backend.onrender.com/api/user/removeAccess?userId=${id}&accessTo=${cuserId}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Card
        variant="outlined"
        className="w-full md:w-3/4 lg:w-1/2 xl:w-1/3 mx-auto mt-4 mb-4"
      >
        <CardContent className="flex flex-col justify-between">
          <div>
            <Typography variant="h5" component="div" className="mb-2">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary" className="mb-4">
              {email}
            </Typography>
          </div>
          <div className="flex justify-end">
            <Button onClick={removeAccess} variant="contained" color="primary">
              {symbolInButton ? symbolInButton : "Add"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default AccessToUserCard;
