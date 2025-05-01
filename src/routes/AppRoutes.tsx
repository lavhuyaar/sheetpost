import { useEffect } from "react";
import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";

import useTheme from "../hooks/useTheme";
import useAuth from "../hooks/useAuth";

//Pages
import Home from "../pages/Home";

import ScrollToTop from "../components/ScrollToTop";

const AppRoutes = () => {
  const { theme } = useTheme();
  const { logoutUser, loginUser } = useAuth();

  //Logs in User automatically if there exists credentials in localStorage
  useEffect(() => {
    const credentials = JSON.parse(
      localStorage.getItem("userCredentials") || "null"
    );

    if (!credentials) {
      logoutUser();
    } else {
      loginUser(credentials);
    }
  }, []);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <ToastContainer theme={theme} pauseOnHover={false} draggable={false} />
    </>
  );
};

export default AppRoutes;
