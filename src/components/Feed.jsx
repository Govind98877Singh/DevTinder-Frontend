import axios from "axios";
import { BASE_URL } from "../constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeedUser, removeFeedUser } from "../utils/feedSlice";
import { useEffect } from "react";
import Card from "./Card";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const handleFeed = async () => {
    if (Array.isArray(feed) && feed.length > 0) return;

    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeedUser(res.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    handleFeed();
  }, []);

  const handleIgnoreOrInterested = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeedUser(_id));
    } catch (error) {
      console.error(error);
    }
  };

  if (!feed) return;

  return (
    <div className="flex justify-center my-12 ">
      {Array.isArray(feed) && feed.length > 0 ? (
        feed.map((data) => {
          return (
            <Card
              key={data._id}
              handleIgnoreOrInterested={handleIgnoreOrInterested}
              user={data}
            />
          );
        })
      ) : (
        <p> No feed data </p>
      )}
    </div>
  );
};

export default Feed;
