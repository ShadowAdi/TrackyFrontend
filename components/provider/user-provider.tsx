"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";

export interface UserProps {
  username: string;
  first_name?: string;
  last_name?: string;
  email: string;
  linked_in_url?: string;
  github_url?: string;
  photo?: string;
  resume?: string;
  id?:number
}

interface AuthContextProps {
  user: UserProps | null;
  setUser: (user: UserProps | null) => void;
  loading: boolean;
}
// Create the AuthContext
const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUser: () => {},
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get("http://127.0.0.1:8000/api/token/", {
            headers: {
              Authorization: `Token ${token}`,
            },
          });
          setUser(response.data.user);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
      setLoading(false);
    };
    fetchUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for accessing AuthContext
export const useAuth = () => useContext(AuthContext);
