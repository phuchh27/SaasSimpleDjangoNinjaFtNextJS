export const NavLinks = [
  {
    label: "Dashboard",
    authRequired: false,
    href: "/"
  },
  {
    label: "WaitLists",
    authRequired: true,
    href: "/waitlists"
  }
];

export const NonUserLinks = [
  {
    label: "SignUp",
    authRequired: false,
    href: "/signup"
  },
  {
    label: "Login",
    authRequired: false,
    href: "/login"
  }
];
