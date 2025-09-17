import { cookies } from 'next/headers'
import React from 'react'

export default async function Dashboard() {
    const cookiestore = await cookies()
    const token = cookiestore.get('token')
  return (
    <div>
      <h1>{token?.value}</h1>
    </div>
  )
}
