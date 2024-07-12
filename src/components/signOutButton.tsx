'use client'
import React from 'react'
import { signOut } from 'next-auth/react';


const SignOutButton = () => {
  return (
    <button onClick={()=> signOut()} className='text-white p-2 border-blue-500 hover:border hover:border-white'>
        Log Out
    </button>

  )
}

export default SignOutButton
