import React, { useState } from "react";
import { Button, Input } from "@mui/material";
import axios from "axios";
import UserCard from "./UserCard";

const SearchUser = () => {
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const [result, setResult] = useState([]);

  const searchUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4500/api/user/searchUser/?search=${search}`
      );
      setResult(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching user:", error);
      setError("Error fetching user. Please try again later.");
      setResult([]);
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
      {error && <p className="text-red-500">{error}</p>}
      {result.length === 0 ? (
        <></>
      ) : (
        <div className="m-auto flex justify-center align-center flex-col">
          {result.map((item) => (
            <UserCard key={item._id} user={item} />
          ))}
        </div>
      )}
    </>
  );
};

export default SearchUser;
