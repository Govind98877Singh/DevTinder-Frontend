import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../constant";

const Login = () => {
  const [emailId, setEmailId] = useState("Doreamon@gmail.com");
  const [password, setPassword] = useState("Doreamon@123");
  const [isError, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault(); // Prevents page reload
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (error) {
      setError(error?.response?.data || "Login failed. Please try again.");
      // console.error(error);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 my-16">
      <div className="px-6 py-4">
        {/* Logo */}
        <div className="flex justify-center mx-auto">
          <img
            className="w-auto  sm:h-16 rounded-4xl"
            src="https://static.vecteezy.com/system/resources/previews/023/986/672/non_2x/tinder-app-logo-tinder-app-logo-transparent-tinder-app-icon-transparent-free-free-png.png"
            alt="Logo"
          />
        </div>

        <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
          Welcome Back
        </h3>
        <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
          Login or create account
        </p>

        {/* Form */}
        <form onSubmit={loginHandler}>
          {/* Email */}
          <div className="w-full mt-4">
            <input
              type="email"
              placeholder="Email Address"
              aria-label="Email Address"
              required
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg 
              dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 
              dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Password */}
          <div className="w-full mt-4">
            <input
              type="password"
              placeholder="Password"
              aria-label="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg 
              dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 
              dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Error */}
          {isError && (
            <p className="text-sm text-red-500 mt-2 text-center">{isError}</p>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between mt-4">
            <a
              href="#"
              className="text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500"
            >
              Forget Password?
            </a>
            <button
              type="submit"
              className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize 
              transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 
              focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
        <span className="text-sm text-gray-600 dark:text-gray-200">
          Don't have an account?{" "}
        </span>
        <Link
          to={"/signUp"}
          href="#"
          className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
