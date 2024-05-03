import React, { useState } from "react";
import { Card, CardContent, Typography, Button, Snackbar } from "@mui/material";
import axios from "axios";

const UserAccessCard = ({ user }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const setUserAccess = async () => {
    try {
      const { _id } = JSON.parse(localStorage.getItem("userInfo"));
      const cardUserId = user._id;

      const response = await axios.post(
        `http://localhost:4500/api/user/addAccess?userId=${_id}&accessTo=${cardUserId}`
      );

      setSnackbarMessage("User added successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error adding user:", error);
      setSnackbarMessage("Failed to add user");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const { name, email } = user;

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
            <Button onClick={setUserAccess} variant="contained" color="primary">
              Add
            </Button>
          </div>
        </CardContent>
      </Card>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </>
  );
};

export default UserAccessCard;
