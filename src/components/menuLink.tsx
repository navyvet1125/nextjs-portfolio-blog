import React, { FC } from 'react'
import Link from 'next/link'

interface MenuLinkProps {
    href?: string;
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    }

const MenuLink: FC<MenuLinkProps> = ({href, children, onClick, className}) => {
  return (
    <Link href={href || '#'}
        onClick={onClick}
        className={`block p-2 text-2xl ${className}`}
    >
        {children}
    </Link>
    )
}

export default MenuLink
