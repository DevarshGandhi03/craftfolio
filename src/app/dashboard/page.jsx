"use client"
import { AuthContext } from '@/context/authContext'
import React, { useContext } from 'react'

function Dashboard() {
  const {user}=useContext(AuthContext)
  return (
    <div>
      {user.username}
    </div>
  )
}

export default Dashboard