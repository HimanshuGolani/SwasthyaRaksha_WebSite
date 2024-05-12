import React from "react";
import { Link, useNavigate } from "react-router-dom";
import profileImg from "../assets/images/profile-img.png";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/index";

const NavBar = () => {
  const isAuth = useSelector((state) => state.isLoggedIn);
  console.log(isAuth);
  const dispatch = useDispatch();
  const userStored = localStorage.getItem("userId");
  const navigator = useNavigate();

  const userInfoString = localStorage.getItem("userInfo");

  if (userInfoString) {
    var { role } = JSON.parse(userInfoString);
  }

  const logOut = () => {
    dispatch(authActions.logout());
    navigator("/");
  };

  return (
    <div className="flex gap-5 justify-between self-stretch px-10 py-3.5 w-full font-bold border-b border-solid border-b-gray-200 text-neutral-900 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
      <div className="flex gap-4 my-auto text-lg tracking-tight">
        <Link className="flex" to={"/"}>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b6df77626506ca479d6b63ddec401fe3499be1da824802fc78fd2555bc989754?apiKey=4d1bf6d258fc42d5be2015d33b15f80c&"
            className="my-auto w-4 aspect-square"
            alt="Logo"
          />
          <div className="flex-auto">Health Tracker</div>
        </Link>
      </div>
      <div className="flex gap-5 max-md:flex-wrap max-md:max-w-full">
        {!userStored && !isAuth ? (
          <div className="flex gap-2 text-sm tracking-wide leading-5 whitespace-nowrap">
            <div className="flex flex-col justify-center px-5 py-2.5 bg-green-500 rounded-xl max-md:px-5">
              <div className="justify-center bg-green-500 aspect-[2]">
                <Link to="/login">Log in</Link>
              </div>
            </div>
            <div className="flex flex-col justify-center px-4 py-2.5 bg-gray-100 rounded-xl">
              <div className="justify-center bg-gray-100 aspect-[2.48]">
                <Link to="/signup">Sign up</Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex gap-5 py-2.5 text-sm font-medium leading-5 text-neutral-900 max-md:flex-wrap max-md:max-w-full">
            <Link to="/labReport" className="grow mt-2">
              Lab Reports
            </Link>
            <Link to="/prescription" className="grow mt-2">
              Prescription
            </Link>
            <Link to="/appoinmentReminder" className="grow mt-2">
              Appointment Reminder
            </Link>

            {role === "Doctor" ? (
              <Link to="/search" className="grow mt-2">
                Search Users
              </Link>
            ) : (
              <>
                <Link to="/setaccess" className="grow mt-2">
                  Share You Info
                </Link>
              </>
            )}
            <Link to="/profile">
              <img
                src={profileImg}
                className="grow w-10 aspect-square"
                alt="Profile"
              />
            </Link>
            <div className="flex flex-col justify-center px-4 py-2.5 bg-gray-100 rounded-xl">
              <div className="justify-center bg-gray-100 aspect-[2.48]">
                <button onClick={logOut}>Log-out</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
