import React, { useState } from "react";
import { Button, Input, CircularProgress } from "@mui/material";
import axios from "axios";
import UserCard from "../../Components/UserCard";
import UserAccessCard from "../../Components/UserAccessCard";

const LoadingSpinner = () => (
  <div className="flex justify-center items-center mt-4">
    <CircularProgress color="primary" />
  </div>
);

const SetUserAccess = () => {
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const { _id } = JSON.parse(localStorage.getItem("userInfo"));

  const searchUser = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://swasthyaraksha-backend.onrender.com/api/user/searchUser/?search=${search}&userId=${_id}`
      );
      setResult(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching user:", error);
      setError("Error fetching user. Please try again later.");
      setResult([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="m-auto flex mt-3 w-full max-w-[928px]">
        <div className="flex-auto">
          <div className="flex gap-3 justify-between px-4 py-3 bg-white rounded-xl border border-solid border-gray-300">
            <Input
              placeholder="Search user by name or email"
              className="flex-grow"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={searchUser}>
              Search
            </Button>
          </div>
        </div>
      </div>
      {loading && <LoadingSpinner />}{" "}
      {error && <p className="text-red-500">{error}</p>}
      {result.length === 0 ? (
        <></>
      ) : (
        <div className="m-auto flex justify-center align-center flex-col">
          {result.map((item) => (
            <UserAccessCard key={item._id} user={item} />
          ))}
        </div>
      )}
    </>
  );
};

export default SetUserAccess;
