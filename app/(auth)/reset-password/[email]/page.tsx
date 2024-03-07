"use client";
// Import necessary modules and dependencies
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { passwordStrength } from "check-password-strength";

// Define the functional component for resetting the password
export default function ReserPassword({
  params,
}: {
  params: { email: string };
}) {
  // Access and parse search parameters from the URL
  const searchParam = useSearchParams();

  // State variables to manage form data, loading state, and password strength message
  const [authState, setAuthState] = useState({
    password: "",
    cpassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Handle changes in the password input field
  const onPasswordChange = (e: any) => {
    setAuthState({ ...authState, password: e.target.value });
    setPassword(e.target.value);
  };

  // Update the password strength message when the password changes
  useEffect(() => {
    if (password) setMessage(passwordStrength(password).value);
  }, [password]);

  // Handle form submission
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    // Check if the password is strong enough
    if (message === "Strong") {
      axios
        .post("/api/auth/reset-password", {
          email: params.email,
          signature: searchParam.get("signature"),
          password: authState.password,
          password_confirmation: authState.cpassword,
        })
        .then((res) => {
          console.log(res);
          const response = res.data;
          console.log(response);
          // Handle different response statuses
          if (response?.status == 400) {
            // Display warning toast for validation errors
            for (const key in response.errors) {
              if (response.errors.hasOwnProperty(key)) {
                const errorMessage = response.errors[key].toLowerCase();
                displayWarningToast(`${errorMessage}`);
              }
            }
            displayWarningToast(`${response.message}`);
          } else if (response?.status == 200) {
            // Display success toast for a successful password reset
            displaySuccessToast(response.message.toLowerCase());
          }
        })
        .catch((err) => {
          // Handle and log errors
          setLoading(false);
          console.log("err..", err);
        });
    } else {
      // Display warning toast for using a weak password
      setLoading(false);
      displayWarningToast("Use a strong password");
    }
  };

  // Function to display warning toast messages
  const displaySuccessToast = (str: string) => {
    toast.success(str, {
      style: {
        border: "2px solid #111827",
        padding: "16px",
        color: "#fff",
        background: "green",
      },
      iconTheme: {
        primary: "white",
        secondary: "green",
      },
    });
  };
  const displayWarningToast = (str: string) => {
    toast.error(str, {
      style: {
        border: "2px solid #111827",
        padding: "16px",
        color: "#fff",
        background: "red",
      },
      iconTheme: {
        primary: "white",
        secondary: "red",
      },
    });
  };

  // JSX structure for the component
  return (
    <>
      {/* Container for the main content */}
      <section className="bg-gray-700">
        <div className="flex items-center justify-center px-4 sm:px-6 h-screen sm:py-16 lg:px-8 lg:py-24">
          <div className="className= bg-gray-900 rounded-3xl px-7 py-7 text-white w-[400px]">
            <div className="xl:mx-auto items-center xl:w-full xl:max-w-sm 2xl:max-w-md">
              <div className="mb-2 flex justify-center">
                {/* Link to the home page */}
                <Link href={"/"}>
                  <Image src="/logo.png" alt="logo" width={60} height={60} />
                </Link>
              </div>
              <h1 className="text-center text-2xl font-bold leading-tight text-white">
                Reset Password
              </h1>

              {/* Form for resetting the password */}
              <form>
                <div mt-3>
                  <div className="flex items-center justify-between">
                    {/* Label for the password input */}
                    <label
                      htmlFor=""
                      className="text-sm font-medium text-gray-300 block m-3"
                    >
                      {" "}
                      Password{" "}
                    </label>
                    {/* Display password strength message */}
                    <span className="text-gray-400 text-xs">
                      {message ? `Password is ${message.toLowerCase()}` : ""}
                    </span>
                  </div>

                  {/* Input field for entering the new password */}
                  <input
                    className="flex h-10 w-full rounded-md border text-white border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="Password"
                    placeholder="Enter Password"
                    onChange={onPasswordChange}
                  />
                </div>
                <div mt-3>
                  {/* Label for confirming the new password */}
                  <label
                    htmlFor=""
                    className="text-sm font-medium text-gray-300 block m-3"
                  >
                    Conform Password
                  </label>

                  {/* Input field for confirming the new password */}
                  <input
                    className="flex h-10 w-full rounded-md border text-white border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="Password"
                    placeholder="Enter conform Password"
                    onChange={(event) =>
                      setAuthState({
                        ...authState,
                        cpassword: event.target.value,
                      })
                    }
                  />
                </div>
                <div className="mt-5 mb-5">
                  {/* Submit button */}
                  <button
                    type="button"
                    className={`inline-flex w-full items-center justify-center text-white border-solid border-2 hover:bg-white hover:text-gray-900 rounded-full bg-transparent px-3.5 py-2.5 font-semibold leading-7`}
                    disabled={loading}
                    onClick={submit}
                  >
                    {loading ? "Processing" : "Submit"}
                  </button>
                </div>
                <div className="mt-5 mb-5">
                  {/* Link to go back to the login page */}
                  <Link href={"/login"}>
                    <button
                      type="button"
                      className={`inline-flex w-full items-center justify-center text-white border-solid border-2 hover:bg-white hover:text-gray-900 rounded-full bg-transparent px-3.5 py-2.5 font-semibold leading-7 ${
                        loading ? "bg-gray-500" : "bg-transparent"
                      }`}
                    >
                      Back To Login
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Container for displaying toasts */}
        <Toaster position="top-right" reverseOrder={false} />
      </section>
    </>
  );
}
