"use client";
import Loading from "@/components/Loading";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import React, { useEffect, useState } from "react";

export const AuthContext = React.createContext(null);

function AuthProvider({ children, token }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    if (token) {
      const response = await axios.post(
        window.location.origin + "/api/users/get-token-data",
        token
      );
      const user = await axios.get(
        window.location.origin +
          "/api/users/get-user?id=" +
          response.data.data._id
      );
      setUser(user.data.data);
    }
    setLoading(false);
  };

  const resetCredentials=()=>{
    setUser(null)
  }


  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser,resetCredentials }}>
      {loading ? <Loading/> : children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
