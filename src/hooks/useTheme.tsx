import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("Theme not found");
  }

  return context;
};

export default useTheme;
