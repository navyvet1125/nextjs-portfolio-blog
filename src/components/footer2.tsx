import { Footer, FooterCopyright, FooterLink, FooterLinkGroup } from "flowbite-react";

export function Foot() {
  return (
    <Footer container className="bg-inherit">
      <FooterCopyright href="#" by="Evan J. Washington" year={new Date().getFullYear()} />
      <FooterLinkGroup>
        <FooterLink href="/#about">About</FooterLink>
        <FooterLink href="/#skills">Skills</FooterLink>
        <FooterLink href="/blog">Blog</FooterLink>
      </FooterLinkGroup>
    </Footer>
  );
}
