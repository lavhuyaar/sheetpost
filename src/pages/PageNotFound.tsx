import { NavLink } from "react-router";

import Footer from "../components/Footer";
import Header from "../components/Header";

const PageNotFound = () => {
  return (
    <>
      <Header />
      <main className="items-center justify-center p-6 sm:px-[5%]">
        <h2 className="text-[4rem] sm:text-[8rem] font-bold text-center col-span-full">
          404
        </h2>
        <p className="text-center relative bottom-4 text-2xl col-span-full">
          Page not found
        </p>
        <NavLink
          to="/dashboard"
          replace
          className="mt-2 text-md font-semibold cursor-pointer text-primary-txt  bg-primary px-4 py-2 rounded-lg hover:bg-primary-hover transition"
        >
          Go to dashboard
        </NavLink>
      </main>
      <Footer />
    </>
  );
};

export default PageNotFound;
