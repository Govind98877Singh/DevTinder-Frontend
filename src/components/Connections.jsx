import axios from "axios";
import { BASE_URL } from "../constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/ConnectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const Connection = useSelector((store) => store.connection);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
      // console.log(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!Connection) return;

  if (Connection.length === 0) return <h1>No data Found</h1>;

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-center">Connections</h1>
      </div>
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 ">
        {Connection && Connection.length > 0 ? (
          Connection.map((data) => {
            return (
              <div key={data._id} className="stats shadow flex my-6 w-lg ">
                <div className="stat">
                  <div className="stat-figure text-secondary">
                    <div className="avatar avatar-online">
                      <div className="w-16 rounded-full">
                        <img src={data.photoUrl} />
                      </div>
                    </div>
                  </div>
                  <div className="stat-value text-2xl">
                    {data.firstName + " " + data.lastName}{" "}
                  </div>
                  <div className="flex gap-10  font-bold">
                    <h2>{data.age}</h2>
                    <h2>{data.gender}</h2>
                  </div>
                  <div className="w-96 text-[13px]">{data.bio}</div>
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

export default Connections;
