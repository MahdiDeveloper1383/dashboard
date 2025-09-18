"use client";
import React, { useEffect, useState } from "react";
import { User } from "../interfaces/IUser";
import UserCard from "../_Components/UserCard";
import Edit_User from "../_Components/Edituser";
import { useRouter } from "next/navigation";
import UserProfile from "../_Components/userprofile";
import { useUsers } from "../_Hooks/useUsers";


export default function Dashboard() {
  const { data: users = [], isLoading, isError, refetch } = useUsers()
  const [currentuser, setcurrentuser] = useState<User>()
  const [edit, setedit] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    if (users.length > 0) {
      const userId = localStorage.getItem('userId')
      if (userId) {
        const u = users.find(u => u.id === Number(userId))
        setcurrentuser(u)
      }
    }
  }, [users])

  const Logout = () => {
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
            {isLoading && <p>loading...</p>}
            {isError && (
              <div>
                <p className="text-red-600">Error fetching users.</p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => refetch()}>
                  Retry
                </button>
              </div>
            )}

            {!isLoading && !isError && users.length === 0 && (
              <div>
                <p>No users found.</p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => refetch()}>
                  Refresh
                </button>
              </div>
            )}

            {!isLoading && !isError && users.length > 0 && !edit &&
              users.map((user) => (
                <UserCard key={user.id} user={user} />
              ))
            }

            {
              edit && currentuser && (
                <Edit_User
                  onSave={(updateuser) => {
                    setcurrentuser(updateuser)
                
                    refetch()
                  }}
                  user={currentuser}
                />
              )
            }
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
