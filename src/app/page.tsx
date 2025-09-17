'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Login() {
  const router = useRouter()
  const [username,setusername] = useState<string>('')
  const [password,setpassword] = useState<string>('')
  const [loading,setloading] = useState<boolean>(false)
  const [error,seterror] = useState<string>('')
  const handlelogin=async(e:React.FormEvent)=>{
    e.preventDefault()
    seterror('')
    setloading(false)
    try{
       await axios.post('http://localhost:3000/api/auth',{username,password},{withCredentials:true})
       router.push('/Dashboard')
    
    }catch(err:unknown){
       if (axios.isAxiosError(err) && err.response) {
      if (err.response.status === 401) {
        seterror('username or password is wrong');
      } else if (err.response.status === 500) {
        seterror('connection failed');
      } else {
        seterror('Unknown Problem');
      }
    } else {
      seterror('Network error');
    }
    }finally{
      setloading(false)
    }
  }
  return (
    <React.Fragment>
    <title>Login</title>
    <div className="login-dev flex bg-gray-100 w-full h-screen items-center">
      <div className="lg:w-[450px] lg:h-[500px] w-[300px] h-[500px] md:w-[500px] flex flex-col mr-auto ml-auto shadow-2xl border-white bg-gray-100">
        <form action="" onSubmit={handlelogin}>
        <h1 className="text-5xl text-center font-extrabold text-blue-950">Login</h1>
        <div className="flex flex-col mt-8 p-5">
          <label htmlFor="Username" className="text-3xl font-bold">Username:</label>
          <input type="text" value={username} onChange={(e)=>setusername(e.target.value)} name="username" className="p-2 bg-gray-200 text-2xl" placeholder="Enter Username" />
        </div>
        <div className="flex flex-col mt-2 p-5">
          <label htmlFor="Password" className="text-3xl font-bold">Password:</label>
          <input type="password" value={password} onChange={(e)=>setpassword(e.target.value)} name="password" className="p-2 bg-gray-200 text-2xl" placeholder="Enter Password" />
        </div>
        {error&&<p className="text-2xl text-center font-serif text-red-600">{error}</p>}
        <div className="flex flex-col mt-2 p-5">
          <input type='submit' value={loading?'Loading...':'Login'} name="username" className="p-2 bg-blue-800 text-2xl cursor-pointer" placeholder="Username" />
        </div>
        </form>
      </div>
    </div>
    </React.Fragment>
  );
}
