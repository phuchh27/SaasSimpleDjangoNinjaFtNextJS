"use client";
import Link from "next/link";
import React from "react";
import { useAuth } from "../auth.provider";
import { NavLinks, NonUserLinks } from "./NavLink";
import BrandLink from "./BrandLink";
import { MobileNavbar } from "./MobileNav";
import { AccountDropdown } from "./AccountDropdown";

interface NavbarProps {
  classname: string;
}

export const Navbar: React.FC<NavbarProps> = ({ classname }) => {
  const finalClass =
    classname ||
    "sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6";
  const auth = useAuth();
  return (
    <header className={finalClass}>
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <BrandLink displayName={true} classname={""} />
        {NavLinks.map((navLinkItem, idx) => {
          const shouldHide = !auth.isAuthenticated && navLinkItem.authRequired;
          return shouldHide ? null : (
            <Link
              key={`nav-link-a-${idx}`}
              href={navLinkItem.href}
              className="text-muted-foreground hover:text-foreground"
            >
              {navLinkItem.label}
            </Link>
          );
        })}
      </nav>
      <MobileNavbar classname={""} />
      <div className="md:hidden">
        <BrandLink displayName={true} classname="" />
      </div>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        {auth.isAuthenticated ? (
          <div className="ml-auto">
            <AccountDropdown classname="" />
          </div>
        ) : (
          <div className="ml-auto space-x-2">
            {NonUserLinks.map((navLinkItem, idx) => {
              const shouldHide =
                !auth.isAuthenticated && navLinkItem.authRequired;
              return shouldHide ? null : (
                <Link
                  key={`nav-link-d-${idx}`}
                  href={navLinkItem.href}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {navLinkItem.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};
