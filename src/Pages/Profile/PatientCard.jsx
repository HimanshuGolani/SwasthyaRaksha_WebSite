import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const PatientCard = ({ name, email, prescriptions, labReports }) => {
  return (
    <Card className="max-w-xl mx-auto my-4 p-4">
      <CardContent>
        <Typography variant="h5" component="h2" className="mb-4">
          {name}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Email: {email}
        </Typography>

        <Accordion className="my-4">
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" component="h3" className="mb-2">
              Prescriptions
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container>
              {prescriptions.map((prescription, index) => (
                <Grid item xs={12} key={index} className="mb-2">
                  <Typography variant="body1" component="p" className="mb-1">
                    Doctor Name: {prescription.DoctorName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Date: {prescription.prescDate}
                  </Typography>
                  <img
                    src={prescription.image}
                    alt="Prescription"
                    className="mt-2 w-1/2"
                  />
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>

        <Accordion className="my-4">
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" component="h3" className="mb-2">
              Lab Reports
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container>
              {labReports.map((report, index) => (
                <Grid item xs={12} key={index} className="mb-2">
                  <Typography variant="body1" component="p" className="mb-1">
                    Report Name: {report.ReportName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Date: {report.ReportDate}
                  </Typography>
                  <img
                    src={report.image}
                    alt="Lab Report"
                    className="mt-2 w-1/2"
                  />
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default PatientCard;
