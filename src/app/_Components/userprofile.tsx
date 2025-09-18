import { User } from "../interfaces/IUser";

export default function UserProfile({
  user,
  onEdit,
  onLogout
}: {
  user: User;
  onEdit: () => void;
  onLogout: () => void;
}) {
  return (
    <div className="w-64 h-full bg-gradient-to-b from-gray-200 to-gray-50 text-gray-800 flex flex-col items-center p-4">
      <img src={user.avatar} width={120} className="rounded-full mt-2 border-4 border-white" />
      <h4 className="mt-2 text-2xl font-bold">{user.username}</h4>
      <span className="mt-1 px-3 py-1 bg-white text-blue-700 rounded-full text-sm">
        {user.role}
      </span>
      <p className="mt-3 font-black">{user.job}</p>
      <p className="text-sm flex items-center">📍 {user.location}</p>
      <p className="text-lg mt-1">Age: {user.age}</p>
      <p className="text-lg mt-1">Email: {user.email}</p>
      <button onClick={onEdit} className="mt-4 bg-white text-blue-900 px-4 py-2 rounded hover:bg-blue-100">
        Edit Profile
      </button>
      <button onClick={onLogout} className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
        Logout
      </button>
    </div>
  );
}
