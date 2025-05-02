import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import signUpSchema from "../validators/signUpSchema";

import axiosInstance from "../api/axiosInstance";

import Footer from "../components/Footer";
import Header from "../components/Header";
import CustomInput from "../components/CustomInput";
import handleAxiosError from "../utils/handleAxiosError";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router";

interface ISignUpFormValues {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  confirm_password: string;
}

const SignUp = () => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ISignUpFormValues>({ resolver: yupResolver(signUpSchema) });

  const onSubmit: SubmitHandler<ISignUpFormValues> = async (values) => {
    toast.loading("Creating new profile...");
    setSubmitting(true);
    try {
      await axiosInstance.post("/signUp", values);
      toast.dismiss();
      toast.success("Profile created successfully!");
      navigate("/login", { replace: true });
      reset();
    } catch (error) {
      handleAxiosError(error, "Failed to Sign Up!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main className="p-6 sm:px-[5%] py-10 gap-5 items-center justify-center">
        <h1 className="text-[26px] text-center font-semibold">
          Sign Up @Sheetpost
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 bg-surface p-5 sm:p-8 w-full sm:w-[500px] rounded-lg drop-shadow-[4px, 0px, 4px] drop-shadow-primary"
        >
          <CustomInput
            register={register}
            name="firstName"
            placeholder="Example: John"
            labelText="First Name:"
            type="text"
            errorMessage={errors.firstName?.message}
          />
          <CustomInput
            register={register}
            name="lastName"
            placeholder="Example: Doe"
            labelText="Last Name:"
            type="text"
            errorMessage={errors.lastName?.message}
          />
          <CustomInput
            register={register}
            name="username"
            placeholder="Example: johndoe123"
            labelText="Username (must be unique):"
            type="text"
            errorMessage={errors.username?.message}
          />
          <CustomInput
            register={register}
            name="password"
            placeholder="Example: 123456"
            labelText="Password:"
            type="password"
            errorMessage={errors.password?.message}
          />

          <CustomInput
            register={register}
            name="confirm_password"
            placeholder="Re-enter password"
            labelText="Re-enter the password:"
            type="password"
            errorMessage={errors.confirm_password?.message}
          />

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 text-md font-semibold cursor-pointer text-primary-txt  bg-primary px-4 py-2 rounded-lg hover:bg-primary-hover transition"
          >
            Create new profile
          </button>
        </form>
        <p>
          Already have an account?{" "}
          <NavLink
            to="/login"
            className="text-primary underline hover:text-primary-hover transition"
          >
            Login
          </NavLink>
        </p>
      </main>

      <Footer />
    </>
  );
};

export default SignUp;
