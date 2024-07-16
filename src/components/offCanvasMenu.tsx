'use client'
import React, { FC, useState } from 'react';
import Link from 'next/link';
import MenuLink from './menuLink';

const OffCanvasMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>

      {/* Button to toggle the off-canvas menu */}
      <a
        className="p-4 md:hidden flex flex-col justify-around h-6 w-6 text-2xl"
        onClick={() => setIsOpen(!isOpen)}
        title="Toggle menu" // Adding a title attribute
        aria-label="Toggle menu" // Adding an aria-label for screen readers
        >&#9776;</a>

      {/* Off-canvas menu */}
      <div
        className={`fixed top-0 left-0 w-full h-full backdrop-blur p-4 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50`}
      >
        <button className="text-white  p-2 text-3xl flex justify-end w-full" onClick={() => setIsOpen(false)}>&times;</button>
        {/* Menu content */}
        <nav className='text-white'>
          <MenuLink href="/" onClick={() => setIsOpen(false)}>Home</MenuLink>
          <MenuLink href="#about" onClick={() => setIsOpen(false)}>About</MenuLink>
          <MenuLink href="/#portfolio" onClick={() => setIsOpen(false)}>Portfolio</MenuLink>
          <MenuLink href="/blog" onClick={() => setIsOpen(false)}>Blog</MenuLink>
        </nav>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default OffCanvasMenu;