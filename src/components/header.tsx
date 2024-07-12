import React from 'react'
import Link from 'next/link'
import SignOutButton from './signOutButton';
import { getCurrentUser } from '@/lib/session';

const header = async () => {
  const user = await getCurrentUser();
  return (
    <header className='bg-blue-500 p-4'>
      <nav className='flex justify-between items-center max-w-7xl mx-auto'>
        <Link href='/' className='text-white text-2xl font-bold p-2 '>Evan J. Washington</Link>
        <ul className='flex space-x-4'>
          <li className='ml-4'>
            <Link href='/' className='text-white p-2 border-blue-500 hover:border hover:border-white'>Home</Link>
          </li> 
          <li className='ml-4'>
            <Link href='#about' className='text-white p-2 border-blue-500 hover:border hover:border-white'>About</Link>
          </li>
          <li className='ml-4'>
            <Link href='#projects' className='text-white p-2 border-blue-500 hover:border hover:border-white'>Projects</Link>
          </li>
          <li className='ml-4'>
            <Link href='/blog' className='text-white p-2 border-blue-500 hover:border hover:border-white'>Blog</Link>
          </li>
          <li className='ml-4'>
            <Link href='#contact' className='text-white p-2 border-blue-500 hover:border hover:border-white'>Contact</Link>
          </li>
          {user?.name ? (
            <li className='ml-4'>
              <SignOutButton />
            </li>
          ):(
            <li className='ml-4'>
              <Link href='/api/auth/signin' className='text-white p-2 border-blue-500 hover:border hover:border-white'>Sign In</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default header