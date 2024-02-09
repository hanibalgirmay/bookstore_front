import axios from "axios";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { CInput, CProvider } from "../../component/form";

const SignUp = () => {
  const methods = useForm();
  const router = useNavigate();

  const handleSignup = async (data: any) => {
    console.log("====================================");
    console.log(data);
    console.log("====================================");
    // Handle login logic
    await axios
      .post(import.meta.env.VITE_APP_API_URL + "/auth/signup", data)
      .then((res) => {
        console.log(res.data);
        if (res.data.statusCode === 409) {
          toast.error(res.data?.message);
        }
        toast.success("Register successfully");
        return router("/auth/login");
      })
      .catch((err) => {
        console.error("err", err);
        if (typeof err?.response?.data?.message === "string") {
          toast.error(err?.response?.data?.message);
        } else {
          if (err?.response?.data?.message?.length > 0) {
            err?.response?.data?.message?.forEach((er: any) => {
              toast.error(er);
            });
          } else {
            toast.error(err?.response?.data?.message);
          }
        }
      });
  };

  return (
    <div className="w-full min-w-[350px] max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md">
      <div className="flex justify-center mx-auto">
        <img
          className="w-auto h-7 sm:h-8"
          src="../../assets/react.svg"
          alt=""
        />
      </div>

      <FormProvider {...methods}>
        <CProvider handleFormSubmit={methods.handleSubmit(handleSignup)}>
          <>
            <h3 className="font-bold text-2xl my-8">Welcome to Bookstore</h3>

            <CInput label="Name" name="name" placeholder="Enter your name" />
            <CInput label="Email" name="email" placeholder="Enter your email" />
            <CInput
              label="Password"
              name="password"
              placeholder="Enter your password"
            />

            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
              >
                Sign Up
              </button>
            </div>
          </>
        </CProvider>
      </FormProvider>

      <div className="flex items-center justify-between mt-4">
        <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>

        <a
          href="#"
          className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
        ></a>

        <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
      </div>

      <p className="mt-8 text-xs font-light text-center text-gray-400">
        {" "}
        Already have account?{" "}
        <Link
          to={"/auth/login"}
          className="font-medium text-gray-700 hover:underline"
        >
          Signin
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
