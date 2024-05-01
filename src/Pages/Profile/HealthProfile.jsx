// import React, { useState } from "react";
// import "./HealthCard.css";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const HealthProfile = () => {
//   const navigator = useNavigate();

//   const [bloodGroup, setBloodGroup] = useState("");
//   const [age, setAge] = useState("");
//   const [pancreatic, setPancreatic] = useState(false);
//   const [sugarType, setSugarType] = useState("");
//   const [diabetic, setDiabetic] = useState(false);

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     const user = localStorage.getItem("userId");
//     try {
//       const response = await axios.post(
//         `http://localhost:4500/api/healthprofiles/create`,
//         {
//           user,
//           bloodGroup,
//           age,
//           pancreatic,
//           sugarType,
//           diabetic,
//         }
//       );
//       console.log("Health profile created:", response.data);
//       navigator("/profile");
//     } catch (error) {
//       console.error("Error creating health profile:", error);
//     }
//   };

//   return (
//     <>
//       <div className="main-container">
//         <div className="sub-container"></div>
//         <div className="right-sub-container">
//           <form onSubmit={handleFormSubmit}>
//             <div>
//               <label htmlFor="sugarType">Sugar Type ?</label>
//               <div>
//                 <input
//                   type="radio"
//                   id="high-bp"
//                   name="sugarType"
//                   value="high-bp"
//                   checked={sugarType === "high-bp"}
//                   onChange={() => setSugarType("high-bp")}
//                 />
//                 <label htmlFor="high-bp">High Blood Pressure</label>
//                 <input
//                   type="radio"
//                   id="low-bp"
//                   name="sugarType"
//                   value="low-bp"
//                   checked={sugarType === "low-bp"}
//                   onChange={() => setSugarType("low-bp")}
//                 />
//                 <label htmlFor="low-bp">Low Blood Pressure</label>
//               </div>
//             </div>

//             <div>
//               <label htmlFor="bloodGroup">Blood Group:</label>
//               <input
//                 type="text"
//                 id="bloodGroup"
//                 value={bloodGroup}
//                 onChange={(event) => setBloodGroup(event.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="age">Age:</label>
//               <input
//                 type="text"
//                 id="age"
//                 value={age}
//                 onChange={(event) => setAge(event.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="diabetic">Any Diabetic issue ? :</label>
//               <input
//                 type="checkbox"
//                 id="diabetic"
//                 checked={diabetic}
//                 onChange={(event) => setDiabetic(event.target.checked)}
//               />
//             </div>
//             <div>
//               <label htmlFor="pancreatic">Any Pancreatic issue ? :</label>
//               <input
//                 type="checkbox"
//                 id="pancreatic"
//                 checked={pancreatic}
//                 onChange={(event) => setPancreatic(event.target.checked)}
//               />
//             </div>
//             <button type="submit" className="submit-btn">
//               Submit
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default HealthProfile;
