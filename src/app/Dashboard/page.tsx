"use client";
import React, { useEffect, useState } from "react";
import { User } from "../interfaces/IUser";
import axios from "axios";
import UserCard from "../_Components/UserCard";
import Edit_User from "../_Components/Edituser";
import { useRouter } from "next/navigation";
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
      } else if (!userId) {
        alert('323')
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
        <div className="w-[1400px] h-[700px]   flex bg-gray-100 rounded-2xl shadow-2xl mt-3 mb-3">

          <div className="w-64 h-full bg-gradient-to-b from-gray-200 to-gray-50 text-gray-800 flex flex-col items-center p-4">
            <img src={currentuser?.avatar} width={120} className="rounded-full mt-2 border-4 border-white" />
            <h4 className="mt-2 text-2xl font-bold">{currentuser?.username}</h4>
            <span className="mt-1 px-3 py-1 bg-white text-blue-700 rounded-full text-sm">{currentuser?.role}</span>

            <p className="mt-3 font-black">{currentuser?.job}</p>
            <p className="text-sm flex items-center">📍 {currentuser?.location}</p>
            <p className="text-lg mt-1">Age: {currentuser?.age}</p>
            <p className="text-lg mt-1">Email: {currentuser?.email}</p>

            <button onClick={() => setedit(!edit)} className="mt-4 bg-white text-blue-900 px-4 py-2 rounded hover:bg-blue-100">{edit ? 'close' : 'Edit Profile'}</button>
            <button onClick={Logout} className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Logout</button>
          </div>


          <div className="flex-1 grid grid-cols-3 gap-4 p-4 overflow-y-auto">
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
