import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState("");
  const [healthProfile, setHealthProfile] = useState("");
  const [isAuth, setIsAuth] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo) {
      navigate("/");
    }
  }, [user]);

  return (
    <AppContext.Provider
      value={{
        userId,
        setUserId,
        healthProfile,
        setHealthProfile,
        isAuth,
        setIsAuth,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => {
  return useContext(AppContext);
};

export default UserProvider;
