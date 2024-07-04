import React, { useState } from "react";
import { Button, Input, CircularProgress } from "@mui/material";
import axios from "axios";
import UserCard from "../../Components/UserCard";

const LoadingSpinner = () => (
  <div className="m-auto flex justify-center items-center h-32">
    <CircularProgress color="primary" size={64} thickness={4} />
  </div>
);

const SearchUser = () => {
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);

  const searchUser = async () => {
    if (!search.trim()) {
      setError("Please enter a search query.");
      return;
    }

    setLoading(true);
    try {
      const id = localStorage.getItem("userId");
      const response = await axios.get(
        `https://swasthyaraksha-backend.onrender.com/api/user/searchUser/?search=${search}&userId=${id}`
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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchUser();
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
              onKeyPress={handleKeyPress}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={searchUser}
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </Button>
          </div>
        </div>
      </div>
      {loading && <LoadingSpinner />}
      {error && <p className="text-red-500">{error}</p>}
      {result.length === 0 && !loading && (
        <p className="text-gray-500 text-center mt-10">No users found.</p>
      )}
      {result.length > 0 && (
        <div className="m-auto flex justify-center align-center flex-col">
          {result.map((item) => (
            <UserCard
              key={item._id}
              healthProfileId={item.healthProfile}
              user={item}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default SearchUser;
