
import Link from "next/link";
import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle, Avatar } from "flowbite-react";


export function Header() {
  return (
    <Navbar fluid rounded className="bg-inherit">
      <NavbarBrand as={Link} href="/">
        <Avatar img="/logo2.jpg" className="mr-3 h-6 sm:h-9" alt="Evan J. Washington logo" />
        <span className="self-center whitespace-nowrap text-2xl font-semibold">Evan J. Washington</span>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink href="/" active className=" text-xl">
          Home
        </NavbarLink>
        <NavbarLink as={Link} href="/#about" className=" text-xl">
          About
        </NavbarLink>
        <NavbarLink href="/#skills" className=" text-xl">
          Skills
        </NavbarLink>
        <NavbarLink href="/blog" className=" text-xl">
          Blog
        </NavbarLink>
        {/* <NavbarLink href="/api/auth/signin" className=" text-2xl">Sign In</NavbarLink> */}
      </NavbarCollapse>
    </Navbar>
  );
}