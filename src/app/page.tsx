'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Login() {
  const router = useRouter()
  const [username, setusername] = useState<string>('')
  const [password, setpassword] = useState<string>('')
  const [loading, setloading] = useState<boolean>(false)
  const [error, seterror] = useState<string>('')
  const handlelogin = async (e: React.FormEvent) => {
    e.preventDefault()
    seterror('')
    setloading(false)
    try {
      await axios.post('http://localhost:3000/api/auth', { username, password }, { withCredentials: true })
      router.push('/Dashboard')

    } catch (err: unknown) {
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
    } finally {
      setloading(false)
    }
  }
  return (
    <React.Fragment>
      <div className="login-dev flex bg-gray-100 w-full h-screen items-center justify-center">
        <div className="w-full max-w-md bg-white shadow-2xl rounded-lg p-8">
          <form onSubmit={handlelogin}>
            <h1 className="text-5xl text-center font-extrabold text-blue-950 mb-8">Login</h1>

            <div className="flex flex-col mb-4">
              <label htmlFor="username" className="text-2xl font-bold mb-2">Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setusername(e.target.value)}
                name="username"
                className="p-3 bg-gray-200 text-xl rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-2xl transition-shadow delay-75"
                placeholder="Enter Username"
              />
            </div>

            <div className="flex flex-col mb-4">
              <label htmlFor="password" className="text-2xl font-bold mb-2">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                name="password"
                className="p-3 bg-gray-200 text-xl rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-2xl transition-shadow delay-75"
                placeholder="Enter Password"
              />
            </div>

            {error && <p className="text-red-600 text-center mb-4">{error}</p>}

            <input
              type="submit"
              value={loading ? 'Loading...' : 'Login'}
              className="w-full p-3 bg-blue-800 text-2xl text-white rounded cursor-pointer hover:bg-blue-900 transition-colors hover:shadow-2xl delay-75"
            />
          </form>
        </div>
      </div>

    </React.Fragment>
  );
}
