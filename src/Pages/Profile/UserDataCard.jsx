import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const UserDataCard = ({ userData }) => {
  const { name, email, prescriptions, labReports } = userData;

  return (
    <Card
      variant="outlined"
      className="w-full md:w-3/4 lg:w-1/2 xl:w-1/3 mx-auto mt-4 mb-4"
    >
      <CardContent className="flex flex-col justify-between h-full">
        <div>
          <Typography variant="h5" component="div" className="mb-2">
            Name: {name}
          </Typography>
          <Typography variant="body2" color="text.secondary" className="mb-2">
            Email: {email}
          </Typography>
          <Typography variant="body2" color="text.secondary" className="mb-2">
            Prescriptions:
            {prescriptions.map((prescription, index) => (
              <span key={index}>{prescription}, </span>
            ))}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lab Reports:
            {labReports.map((labReport, index) => (
              <span key={index}>{labReport}, </span>
            ))}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserDataCard;
