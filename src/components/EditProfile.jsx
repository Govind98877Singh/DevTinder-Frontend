import { useState } from "react";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../constant";
import { addUser } from "../utils/userSlice";

const EditProfile = () => {
  const user = useSelector((store) => store.user);
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [bio, setBio] = useState(user?.bio || "");

  const [isError, setError] = useState("");
  const dispatch = useDispatch();
  const [toastShow, setToastShow] = useState(false);

  const handleUpdation = async () => {
    try {
      setError("");
      setToastShow(false);
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          photoUrl,
          bio,
        },
        { withCredentials: true }
      );
      // console.log(res.data);
      dispatch(addUser(res.data));
      setToastShow(true);
      setTimeout(() => {
        setToastShow(false);
      }, 2000);
    } catch (error) {
      if (
        error.response.data ===
        "User validation failed: photoUrl: Invalid Photo Url Format"
      ) {
        setError("Invalid Photo Url Format");
      } else if (
        error.response.data ===
        "User validation failed: gender: Gender data is not valid, photoUrl: Invalid Photo Url Format"
      ) {
        setError("Select Gender and Enter valid PhotoUrl");
      } else {
        setError(error.response.data);
      }
      // console.error(error.response?.data); // logs AxiosError with all details
      setError(error.response?.data || error.message || "Something went wrong");
      setToastShow(false);
    }
  };

  return (
    <div>
      {toastShow && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
            Profile Update Successfully.
          </div>
        </div>
      )}

      <div className="flex justify-center items-center  gap-14">
        <div className="w-full max-w-sm  overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 my-14">
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
              Edit Profile
            </h3>

            {/* Form */}
            <div>
              {/* First Name */}
              <div className="w-full mt-4">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="block w-full px-4 py-2 mt-1 text-gray-700 placeholder-gray-500 bg-white border rounded-lg 
    dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 
    dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>

              {/* Last Name */}
              <div className="w-full mt-4">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg 
              dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 
              dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              {/* Age */}
              <div className="w-full mt-4">
                <label
                  htmlFor="age"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Age
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg 
              dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 
              dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              {/* Gender*/}
              <fieldset className="fieldset ">
                <legend className="fieldset-legend  block text-sm font-medium text-gray-700 dark:text-gray-300 ">
                  Gender
                </legend>
                <select
                  defaultValue="Choose a gender"
                  onChange={(e) => setGender(e.target.value)}
                  className="select border-1 h-[43px]  rounded-lg  w-full border-black "
                >
                  <option>male</option>
                  <option>female</option>
                  <option>others</option>
                </select>
              </fieldset>
              {/* photo Url */}
              <div className="w-full mt-4">
                <label
                  htmlFor="photo url"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Photo Url
                </label>
                <input
                  type="url"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg 
              dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 
              dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              {/* Bio */}
              <div className="mb-4">
                <label
                  htmlFor="bio"
                  className="block text-gray-700 mb-1 font-medium"
                >
                  Bio
                </label>
                <textarea
                  name="bio"
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows="2"
                  placeholder="Tell us about yourself..."
                  className="w-full px-4 py-2 border  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                ></textarea>
              </div>

              {/* Error */}
              {isError && (
                <p className="text-sm text-red-500 mt-2 text-center">
                  {isError}
                </p>
              )}

              {/* Actions */}
              <div className="flex items-center justify-center mt-4">
                <button
                  type="submit"
                  onClick={handleUpdation}
                  className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize 
              transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 
              focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                >
                  {" "}
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Card user={{ firstName, lastName, age, gender, bio, photoUrl }} />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
