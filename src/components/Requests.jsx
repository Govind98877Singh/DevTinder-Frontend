import axios from "axios";
import { BASE_URL } from "../constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);

  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/recived/requests", {
        withCredentials: true,
      });

      dispatch(addRequests(res.data.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (!requests) return;

  if (requests.length === 0) return <h1>No Request Connections data Found</h1>;

  const handleAcceptOrReject = async (status, id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + id,
        {},
        { withCredentials: true }
      );
      // console.log(res);
      dispatch(removeRequest(id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-center">Request Connections</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        {requests && requests.length > 0 ? (
          requests.map((data) => {
            const { firstName, photoUrl, lastName, age, gender, bio, _id } =
              data.fromUserId;
            return (
              <div
                key={_id}
                className="flex  my-6 shadow-lg rounded-lg p-4 relative justify-centre items-center "
              >
                {/* Photo */}
                <div className="flex-shrink-0 ">
                  <div className="avatar avatar-online">
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      <img src={photoUrl} alt={`${firstName} ${lastName}`} />
                    </div>
                  </div>
                </div>

                {/* Name, age, gender, bio */}
                <div className="ml-28">
                  <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold">
                      {firstName} {lastName}
                    </div>
                    {/* Success & Error badges */}
                    <div className=" flex gap-2 ml-2 ">
                      <div
                        className="badge badge-success flex items-center gap-1 cursor-pointer"
                        onClick={() =>
                          handleAcceptOrReject("accepted", data._id)
                        }
                      >
                        <svg
                          className="size-[1em]"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <g fill="currentColor">
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            ></circle>
                            <polyline
                              points="7 13 10 16 17 8"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            ></polyline>
                          </g>
                        </svg>
                        Accept
                      </div>

                      <div
                        className="badge badge-error flex items-center gap-1 cursor-pointer"
                        onClick={() =>
                          handleAcceptOrReject("rejected", data._id)
                        }
                      >
                        <svg
                          className="size-[1em]"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <g fill="currentColor">
                            <rect
                              x="1.972"
                              y="11"
                              width="20.056"
                              height="2"
                              transform="translate(-4.971 12) rotate(-45)"
                            ></rect>
                            <path d="m12,23c-6.065,0-11-4.935-11-11S5.935,1,12,1s11,4.935,11,11-4.935,11-11,11Zm0-20C7.038,3,3,7.037,3,12s4.038,9,9,9,9-4.037,9-9S16.962,3,12,3Z"></path>
                          </g>
                        </svg>
                        Reject
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 font-semibold">
                    <span>{age}</span>
                    <span>{gender}</span>
                  </div>
                  <div className="text-sm max-w-xs">{bio}</div>
                </div>
              </div>
            );
          })
        ) : (
          <div>Loading connections...</div>
        )}
      </div>
    </div>
  );
};

export default Requests;
