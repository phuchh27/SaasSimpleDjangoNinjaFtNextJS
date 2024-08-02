"use client";
import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import React from "react";
import { useAuth } from "../auth.provider";
import { NavLinks, NonUserLinks } from "./NavLink";
import BrandLink from "./BrandLink";

interface NavbarProps {
  classname: string;
}

export const MobileNavbar: React.FC<NavbarProps> = ({ classname }) => {
  const auth = useAuth();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav className="grid gap-6 text-lg font-medium">
          <BrandLink
            displayName={true}
            classname={"flex items-center gap-2 text-lg font-semibold"}
          />

          {NavLinks.map((navLinkItem, idx) => {
            const shouldHide =
              !auth.isAuthenticated && navLinkItem.authRequired;
            return shouldHide ? null : (
              <Link
                key={`nav-link-b-${idx}`}
                href={navLinkItem.href}
                className="text-muted-foreground hover:text-foreground"
              >
                {navLinkItem.label}
              </Link>
            );
          })}

          {auth.isAuthenticated ? (
            <Link
              href="/logout"
              className="text-muted-foreground hover:text-foreground"
            >
              Logout
            </Link>
          ) : (
            <>
              {NonUserLinks.map((navLinkItem, idx) => {
                const shouldHide =
                  !auth.isAuthenticated && navLinkItem.authRequired;
                return shouldHide ? null : (
                  <Link
                    key={`nav-link-c-${idx}`}
                    href={navLinkItem.href}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {navLinkItem.label}
                  </Link>
                );
              })}
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
