import { User } from "../interfaces/IUser";

const UserCard = ({user}:{user:User}) => {
    return (  <div
              key={user.id}
              className="bg-white rounded-xl shadow-2xl p-4 flex flex-row items-center justify-between w-full h-32 gap-4"
            >
              <div className="flex flex-col items-center">
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="w-15 h-15 rounded-full mb-2"
                />
                <h2 className="text-lg font-bold">{user.username}</h2>
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
              <div className="flex flex-col justify-center text-center">
                <p className="text-gray-500 text-sm">{user.job}</p>
                <p className="text-gray-400 text-xs">📍 {user.location}</p>
              </div>
            </div> );
}
 
export default UserCard;