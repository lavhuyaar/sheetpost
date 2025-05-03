import { NavLink, useNavigate } from "react-router";
import { toast } from "react-toastify";

import useAuth from "../hooks/useAuth";
import useTheme from "../hooks/useTheme";

import ThemeToggler from "./ThemeToggler";

const Header = () => {
  const { userInfo, logoutUser } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const logOut = () => {
    logoutUser();
    toast.success("User logged out sucessfully!");
    navigate("/login", { replace: true });
  };

  return (
    <header className="w-full flex items-center justify-center sticky bg-primary text-primary-txt z-999 top-0">
      <nav className="w-full max-w-screen-2xl flex items-center justify-between px-4 py-2">
        <NavLink to="/" className="text-3xl font-bold align-middle">
          <img
            src={`/images/sheetpost_logo_${
              theme === "dark" ? "light" : "dark"
            }.png`}
            alt=""
            className="size-12"
          />
        </NavLink>

        <div className="flex items-center gap-4">
          <ThemeToggler />
          {userInfo ? (
            <button
              onClick={logOut}
              className="px-2 py-1 rounded-lg cursor-pointer hover:bg-primary-hover transition text-primary-txt font-semibold"
            >
              Log out
            </button>
          ) : (
            <>
              <NavLink
                className="px-2 py-1 rounded-lg hover:bg-primary-hover transition font-semibold"
                to="/sign-up"
              >
                Sign Up
              </NavLink>
              <NavLink
                className="px-2 py-1 rounded-lg hover:bg-primary-hover transition font-semibold"
                to="/login"
              >
                Login
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
