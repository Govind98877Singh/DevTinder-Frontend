import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../constant";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const SingUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState();
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [isError, setIsError] = useState(false);
  const [whatError, setWhatError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUp = async (e) => {
    e.preventDefault(); // stop the page from refreshing
    setIsError(false);
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
          age,
          gender,
          bio,
          photoUrl,
        },
        { withCredentials: true }
      );
      // console.log(res.data);
      dispatch(addUser(res.data.data));
      return navigate("/");
    } catch (error) {
      if (error.response.data.message === "Email already exists") {
        setWhatError("User already exist! Please enter another email.");
      } else if (
        error.response.data ===
        "User validation failed: photoUrl: Invalid Photo Url Format"
      ) {
        setWhatError("Invalid Photo Url Format");
      } else if (
        error.response.data ===
        "User validation failed: gender: Gender data is not valid, photoUrl: Invalid Photo Url Format"
      ) {
        setWhatError("Select Gender and Enter valid PhotoUrl");
      } else {
        setWhatError(error.response.data);
      }
      console.log(error);
      setIsError(true);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-8 mt-12">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Create an Account
      </h2>

      <form onSubmit={handleSignUp}>
        <div className="flex gap-2">
          {/* First Name */}
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-gray-700 mb-1 font-medium"
            >
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              id="firstName"
              placeholder="John"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-gray-700 mb-1 font-medium"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              id="lastName"
              placeholder="Doe"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="emailId"
            className="block text-gray-700 mb-1 font-medium"
          >
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="emailId"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            id="emailId"
            placeholder="example@mail.com"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 mb-1 font-medium"
          >
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            placeholder="********"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex justify-between">
          {/* Age */}
          <div className="mb-4">
            <label
              htmlFor="age"
              className="block text-gray-700 mb-1 font-medium"
            >
              Age (18+)
            </label>
            <input
              type="number"
              name="age"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              min="18"
              placeholder="Your age"
              className="w-40 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Gender */}
          <div className="mb-4">
            <label
              htmlFor="gender"
              className="block text-gray-700 mb-1 font-medium"
            >
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              id="gender"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select gender</option>
              <option value="male">male</option>
              <option value="female">female</option>
              <option value="others">others</option>
            </select>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-4">
          <label htmlFor="bio" className="block text-gray-700 mb-1 font-medium">
            Bio
          </label>
          <textarea
            name="bio"
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows="2"
            placeholder="Tell us about yourself..."
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>

        {/* Photo URL */}
        <div className="mb-6">
          <label
            htmlFor="photoUrl"
            className="block text-gray-700 mb-1 font-medium"
          >
            Photo URL
          </label>
          <input
            type="url"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            name="photoUrl"
            id="photoUrl"
            placeholder="https://example.com/photo.jpg"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        {isError && (
          <div role="alert" className="alert alert-error mb-4 mt-[-10px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{whatError}</span>
          </div>
        )}
        <button
          type="submit"
          className="w-full cursor-pointer bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition-colors"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SingUp;
