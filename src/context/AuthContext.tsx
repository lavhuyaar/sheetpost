import { createContext, ReactNode, useState } from "react";
import { useNavigate } from "react-router";

// import axiosInstance from "../api/axiosInstance";
import handleAxiosError from "../utils/handleAxiosError";

import { IUser } from "../interfaces";

interface IAuth {
  userInfo: IUser | null;
  loginUser: (credentials: {
    username: string;
    password: string;
  }) => Promise<void>;
  logoutUser: () => void;
}

const AuthContext = createContext<IAuth | null>(null);

export const AuthProvider = ({ children }: { children?: ReactNode }) => {
  const [userInfo, setUserInfo] = useState<IUser | null>(null);
  const navigate = useNavigate();

  const loginUser = async (credentials: {
    username: string;
    password: string;
  }) => {
    try {
      // const response = await axiosInstance.post("/loginAdmin", credentials);
      // const { author, token } = response.data;
      // setUserInfo(author);
      const searchParams = new URLSearchParams(location.search);
      const goToPath = searchParams.get("redirect");
      navigate(goToPath || location.pathname, { replace: true });

      //Stores credentials and authToken in localStorage
      localStorage.setItem("userCredentials", JSON.stringify(credentials));
      // localStorage.setItem("authToken", token);
    } catch (error) {
      handleAxiosError(error, "Failed to login user!");
      setUserInfo(null);
    }
  };

  const logoutUser = () => {
    setUserInfo(null); //Removes userInfo

    //Clears localStorage
    localStorage.removeItem("userCredentials");
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ userInfo, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
