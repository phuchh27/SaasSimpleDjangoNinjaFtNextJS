"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  createContext,
  useContext,
  ReactNode,
  FC,
  useState,
  useMemo,
  useEffect
} from "react";

interface AuthContextProps {
  username: string;
  isAuthenticated: boolean;
  login: (username: string) => void;
  logout: () => void;
  logoutRequiredRedirect: () => void;
}
const LOGIN_REDIRECT_URL = "/";
const LOGOUT_REDIRECT_URL = "/login";
const LOGIN_REQUIRED_URL = "/login";
const LOCAL_STORAGE_KEY = "is-logged-in";
const LOCAL_STORAGE_USERNAME_KEY = "username";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedAuth = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedAuth) {
      const storedAuthStatusInt = parseInt(storedAuth);
      setIsAuthenticated(storedAuthStatusInt === 1);
    }
    const storedUn = localStorage.getItem(LOCAL_STORAGE_USERNAME_KEY);
    if (storedUn) {
      setUsername(storedUn);
    }
  }, []);

  const login = (username: string) => {
    setIsAuthenticated(true);
    localStorage.setItem(LOCAL_STORAGE_KEY, "1");

    if (username) {
      localStorage.setItem(LOCAL_STORAGE_USERNAME_KEY, `${username}`);
      setUsername(username);
    } else localStorage.removeItem(LOCAL_STORAGE_USERNAME_KEY);

    const nextUrl = searchParams.get("next");
    const invalidNextUrl = ["/login", "/logout"];
    const nextUrlValid =
      nextUrl && nextUrl.startsWith("/") && !invalidNextUrl.includes(nextUrl);
    if (nextUrlValid) {
      router.replace(nextUrl);
    } else {
      router.replace(LOGIN_REDIRECT_URL);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem(LOCAL_STORAGE_KEY, "0");
    router.replace(LOGOUT_REDIRECT_URL);
  };

  const logoutRequiredRedirect = () => {
    setIsAuthenticated(false);
    localStorage.setItem(LOCAL_STORAGE_KEY, "0");
    let loginWithNextUrl = `${LOGIN_REQUIRED_URL}?next=${pathName}`;
    if (LOGIN_REQUIRED_URL === pathName) {
      loginWithNextUrl = `${LOGIN_REQUIRED_URL}`;
    }
    router.replace(loginWithNextUrl);
  };

  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      login,
      logout,
      logoutRequiredRedirect,
      username
    }),
    [isAuthenticated]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
