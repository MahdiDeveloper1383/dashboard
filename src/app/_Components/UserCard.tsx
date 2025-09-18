import { User } from "../interfaces/IUser";

const UserCard = ({ user }: { user: User }) => {
  return (
    <div
      className="bg-white rounded-xl shadow-2xl p-4 flex flex-col sm:flex-row items-center sm:justify-between w-full h-auto sm:h-32 gap-4"
    >
      <div className="flex flex-col items-center sm:items-start">
        <img
          src={user.avatar}
          alt={user.username}
          className="w-10 h-10 sm:w-15 sm:h-15 rounded-full mb-2"
        />
        <h2 className="text-base sm:text-lg font-bold">{user.username}</h2>
        <span
          className={`text-xs px-2 py-1 rounded-full 
            ${user.role === "admin"
              ? "bg-red-200 text-red-700"
              : "bg-green-200 text-green-700"
            }`}
        >
          {user.role}
        </span>
      </div>

      <div className="flex flex-col justify-center items-center text-center sm:text-left mt-2 sm:mt-0">
        <p className="text-gray-500 text-sm sm:text-base">{user.job}</p>
        <p className="text-gray-400 text-xs sm:text-sm">📍 {user.location}</p>
      </div>
    </div>
  );
};

export default UserCard;
