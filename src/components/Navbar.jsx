import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../constant";
import { removeUser } from "../utils/userSlice";
import { addFeedUser } from "../utils/feedSlice";
import { addRequests } from "../utils/requestSlice";
import { addConnections } from "../utils/ConnectionSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlogout = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/logout",
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUser());
      navigate("/login");
      dispatch(addFeedUser(null));
      dispatch(addRequests(null));
      dispatch(addConnections(null));
    } catch (error) {
      // any error message
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-sm px-12">
      <div className="flex-1">
        <Link
          to={user === null ? "/login" : "/"}
          className="btn btn-ghost text-xl"
        >
          Tinder
        </Link>
      </div>

      {user && (
        <div className="flex gap-2">
          <p className="text-xs pt-3">{`Welcome->${user.firstName}`}</p>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="User avatar" src={user.photoUrl} />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] w-52 p-2 shadow bg-base-100 rounded-box"
            >
              <li>
                <Link to={"/profile/view"} className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to={"/Connections"}>Connections</Link>
              </li>
              <li>
                <Link to={"/requests"}>Requests</Link>
              </li>
              <li>
                <a onClick={() => handlogout()}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
