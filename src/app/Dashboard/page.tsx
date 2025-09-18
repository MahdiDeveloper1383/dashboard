"use client";
import React, { useEffect, useState } from "react";
import { User } from "../interfaces/IUser";
import axios from "axios";
import UserCard from "../_Components/UserCard";
import Edit_User from "../_Components/Edituser";
import { useRouter } from "next/navigation";
import UserProfile from "../_Components/userprofile";
export default function Dashboard() {
  const [users, setusers] = useState<User[]>([]);
  const [currentuser, setcurrentuser] = useState<User>();
  const [loading, setloading] = useState<boolean>(false)
  const [error, seterror] = useState<string>('')
  const [edit, setedit] = useState<boolean>(false)
  const router = useRouter()
  const Getusers = async () => {
    setloading(true)
    seterror('')
    try {
      const respone = await axios.get("http://localhost:3000/api/users");
      const allUsers: User[] = respone.data;
      setusers(allUsers);

      const userId = localStorage.getItem('userId');
      if (userId) {
        const currentUser = allUsers.find(
          (u) => u.id === Number(userId)
        );

        setcurrentuser(currentUser);
      } 
      console.log(localStorage.getItem('userId'))
      setcurrentuser(allUsers.find((u) => u.id === Number(userId)));
    } catch (err: unknown) {
      seterror('Error fetching users. Try again.');
    } finally {
      setloading(false)
    }
  };
  useEffect(() => {
    Getusers();
  }, []);
  const Logout=()=>{
    localStorage.removeItem('userId')
    router.push('/')
  }
  return (
    <React.Fragment>
      <title>Dashboard</title>
      <div className="flex justify-center ">
       <div className="w-full max-w-[1400px] h-auto flex flex-col md:flex-row bg-gray-100 rounded-2xl shadow-2xl mt-3 mb-3">

            {currentuser && (
      <UserProfile
        user={currentuser}
        onEdit={() => setedit(!edit)}
        onLogout={Logout}
      />
    )}

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 overflow-y-auto">

            {loading && <p>loading...</p>}
            {error &&
              <div>
                <p className="text-red-600">{error}</p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={Getusers}>
                  Retry
                </button>
              </div>
            }
            {!loading && !error && users.length === 0 && (
              <div>
                <p>No users found.</p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={Getusers}>
                  Refresh
                </button>
              </div>
            )}
            {!loading && !error && users.length > 0 && !edit &&
              users.map((user) => (
                <UserCard key={user.id} user={user} />
              ))
            }
            {
              edit &&
              currentuser && <Edit_User onSave={(updateuser) => {
                setcurrentuser(updateuser); setusers((prev) =>
                  prev.map((u) => (u.id === updateuser.id ? updateuser : u))
                );
              }} user={currentuser} />

            }
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
