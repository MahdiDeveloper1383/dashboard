'use client'
import React, { useEffect, useState } from 'react'
import { User } from '../interfaces/IUser'
import axios from 'axios'

export default function Dashboard() {
  const [users,setusers]=useState<User[]>([])
  useEffect(()=>{
    const Getusers=async()=>{
      try{
        const respone= await axios.get('http://localhost:3000/api/users')
        setusers(respone.data)
      }catch(err:any){

      }
    }
    Getusers()
  },[])  
  return (
    <div className='flex justify-center '>
      <div className='w-[1200px] h-[700px] flex border border-white bg-blue-500 rounded-2xl shadow-2xl mt-3 mb-3'>
        <div className='w-64 h-full border-r border-r-white'>
          
        </div>
      </div>
    </div>
  )
}
