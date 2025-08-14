const Card = ({ user, handleIgnoreOrInterested }) => {
  // console.log(user);
  const truncateBio = (text) =>
    text.length > 100 ? text.slice(0, 100) + "..." : text;

  return (
    <div className="card bg-base-100 w-96 shadow-sm  ">
      <figure className="w-full h-80 overflow-hidden">
        <img
          src={user.photoUrl}
          alt={user.firstName}
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {user.firstName + " " + user.lastName}
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <div className="font-bold flex gap-6">
          <h4>{user.age}</h4>
          <h4>{user.gender}</h4>
        </div>
        <p className="whitespace-pre-wrap break-words">
          {user.bio ? truncateBio(user.bio) : "No bio available"}
        </p>

        <div className="card-actions justify-end">
          <div
            className="badge badge-outline  cursor-pointer"
            onClick={() => handleIgnoreOrInterested("ignored", user._id)}
          >
            Ignore
          </div>
          <div
            className="badge badge-outline  cursor-pointer"
            onClick={() => handleIgnoreOrInterested("interested", user._id)}
          >
            Interested
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
