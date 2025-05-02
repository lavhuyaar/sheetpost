import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import useAuth from "../hooks/useAuth";
import handleAxiosError from "../utils/handleAxiosError";

import Header from "../components/Header";
import CustomInput from "../components/CustomInput";
import Footer from "../components/Footer";

import loginSchema from "../validators/loginSchema";

interface LoginFormValues {
  username: string;
  password: string;
}

const Login = () => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { userInfo, loginUser, logoutUser } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    //Redirects to the protected route after user logs in
    if (userInfo) {
      const searchParams = new URLSearchParams(location.search);
      const goToPath = searchParams.get("redirect");
      navigate(goToPath || location.pathname, { replace: true });
    }
  }, [userInfo]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: yupResolver(loginSchema) });

  const onSubmit: SubmitHandler<LoginFormValues> = async (values) => {
    toast.loading("Logging in...");
    setSubmitting(true);
    try {
      await loginUser(values); //Logs in User
      toast.dismiss();
      toast.success(`Welcome User!`);
    } catch (error) {
      handleAxiosError(error, "Failed to Login");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main className="p-6 sm:px-[5%] py-10 gap-5 items-center justify-center">
        {userInfo ? (
          <div className="bg-surface p-5 sm:p-8 rounded-lg flex flex-col items-center gap-3">
            <h2 className="text-2xl text-center font-mormal">
              Hey {userInfo?.firstName}, you're already logged in!
            </h2>
            <button
              className="text-md cursor-pointer font-semibold text-primary-txt  bg-primary px-4 py-2 rounded-lg hover:bg-primary-hover transition"
              onClick={() => {
                logoutUser();
                toast.success("User logged out sucessfully!");
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <h1 className="text-[26px] text-center font-semibold">
              Login @Sheetpost
            </h1>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-3 bg-surface p-5 sm:p-8 w-full sm:w-[500px] rounded-lg "
            >
              <CustomInput
                register={register}
                name="username"
                placeholder="Example: johndoe123"
                labelText="Your Username:"
                type="text"
                errorMessage={errors.username?.message}
              />
              <CustomInput
                register={register}
                name="password"
                placeholder="Example: 123456"
                labelText="Your Password:"
                type="password"
                errorMessage={errors.password?.message}
              />

              <button
                type="submit"
                disabled={submitting}
                className="mt-2 text-md cursor-pointer font-semibold text-primary-txt  bg-primary px-4 py-2 rounded-lg hover:bg-primary-hover transition"
              >
                Login
              </button>
            </form>
            <p>
              Don't have an account?{" "}
              <NavLink
                to="/sign-up"
                className="text-primary underline hover:text-primary-hover transition"
              >
                Sign Up
              </NavLink>
            </p>
          </>
        )}
      </main>

      <Footer />
    </>
  );
};

export default Login;
