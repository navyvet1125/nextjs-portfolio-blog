'use client'
import React, {useState, useEffect} from 'react'
import { useSession, SessionProvider } from 'next-auth/react';
import OffCanvasMenu from './offCanvasMenu';
import MenuLink from './menuLink';
import { signOut } from 'next-auth/react';


const LargeHeader = () => {
  const session = useSession();
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    if (session.data) {
      setUserName(session.data.user?.name || null); // Handle potential undefined user
    } else {
      setUserName(null);
    }
  }, [session]); 

  const handleSignout = async () => {
    try{
      await signOut();
    } catch (error) {
      console.error('Sign out error', error);
    }
  }

  return (
    <header className='p-4'>
      <nav className='flex justify-between items-center max-w-7xl mx-auto'>
        <MenuLink href='/' className='font-bold'>Evan J. Washington</MenuLink>
        <ul className='flex space-x-4'>
          <li className='ml-4'>
            <MenuLink href='/' className='hover:underline'>Home</MenuLink>
          </li> 
          <li className='ml-4'>
            <MenuLink href='#about' className='hover:underline'>About</MenuLink>
          </li>
          <li className='ml-4'>
            <MenuLink href='#skills' className='hover:underline'>Skills</MenuLink>
          </li>
          <li className='ml-4'>
            <MenuLink href='/blog' className='hover:underline'>Blog</MenuLink>
          </li>
          {/* {userName ? (
            <li className='ml-4'>
              <MenuLink onClick={handleSignout}>Sign Out</MenuLink>
            </li>
          ):(
            <li className='ml-4'>
              <MenuLink href='/api/auth/signin'>Sign In</MenuLink>
            </li>
          )} */}
        </ul>
      </nav>
    </header>
  )
}

const SmallHeader = () => {
  return (
    <>
    {/* <header className='p-4'>
      <nav className='flex justify-between items-center max-w-7xl mx-auto'>
          <MenuLink href='/' className='font-bold'>Evan J. Washington</MenuLink>
        <ul className='flex space-x-4'>
        </ul>
      </nav>
    </header> */}
    <OffCanvasMenu />
    </>
  )
}

interface ScreenSize {
  width: number | undefined;
  height: number | undefined;
}

const Header = () => {
  const [screenSize, setScreenSize] = useState<ScreenSize>({ 
    width: undefined,
    height: undefined
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set initial size
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty dependency array means this effect runs once on mount

  return screenSize.width && screenSize.width > 768 ? <LargeHeader /> : <SmallHeader />;
};

export default Header