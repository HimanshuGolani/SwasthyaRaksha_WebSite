
SwasthyaRaksha

A brief description of what this project does and who it's for

 SwasthyaRaksha

SwasthyaRaksha_WebSite is a MERN (MongoDB, Express.js, React.js, Node.js) stack project aimed at providing users with a platform to store and share their health-related data securely. It allows users to maintain their health profiles, prescriptions, lab reports, and appointment reminders, facilitating easy access to crucial health information during emergencies.

## Features

- **User Management:** Sign up and login functionality for users.
- **Profile Management:** Create and maintain personal health profiles.
- **Prescription Management:** Add, update, and delete prescriptions.
- **Lab Report Management:** Add and delete lab reports.
- **Appointment Reminder:** Set reminders for appointments via email.
- **Access Control:** Allow users to grant access to their health data to others.
- **Search Functionality:** Search for users by username.
- **Secure Authentication:** Authentication and authorization mechanisms to ensure data security.

## Technologies Used

- **Frontend:** React.js, Material UI
- **Backend:** Node.js with Express.js
- **Database:** MongoDB
- **Other Tools:** NodeMailer to send mail reminders of the appointment, bcrypt.js to encrypt the data, etc.

## Installation

1. **Install dependencies:**
   ```bash
   npm i



## API Endpoints

### User Routes

- **GET /api/user:** Get all users.
- **POST /api/user/signup:** Sign up a new user.
- **POST /api/user/login:** Login an existing user.
- **GET /api/user/searchUser:** Search for users by username.
- **POST /api/user/addAccess/:userId:** Grant access to user's health data.
- **PUT /api/user/removeAccess/:userId:** Remove access to user's health data.
- **GET /api/user/getAccessUsersInfo:** Fetch details of users with access.
- **GET /api/user/getAccessForData:** Fetch access granted for user's data.

### Health Profile Routes

- **GET /api/healthprofiles/:userId:** Get health profile by user ID.
- **POST /api/healthprofiles/create:** Create a new health profile.

### Prescription Routes

- **GET /api/prescription/:id:** Get all prescriptions for a user.
- **POST /api/prescription/add:** Add a new prescription.
- **PUT /api/prescription/update/:id:** Update a prescription.
- **GET /api/prescription/user/:id:** Get prescriptions by user ID.
- **DELETE /api/prescription/delete/:id:** Delete a prescription.

### Lab Report Routes

- **GET /api/labR/:id:** Get all lab reports for a user.
- **POST /api/labR/add:** Add a new lab report.
- **DELETE /api/labR/deleteLabR/:id:** Delete a lab report.

### Appointment Reminder Routes

- **POST /api/appoinmentreminder/setReminderMail:** Set an appointment reminder via email.

## Usage

1. **Sign Up or Log In:** After installing the application, sign up or log in to your account.
2. **Manage Health Data:** Navigate through the different sections to manage your health data, including health profiles, prescriptions, lab reports, and appointment reminders.
3. **Search Functionality:** Utilize the search functionality to find other users by username.
4. **Grant Access:** Grant access to your health data to trusted individuals if needed.
5. **Set Appointment Reminders:** Set appointment reminders for important events.

## Contributors
- [Himanshu Golani](https://github.com/HimanshuGolani)
```
