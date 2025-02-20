"use client";
import Loading from "@/components/Loading";
import axios from "axios";
import React, { useEffect, useState } from "react";

export const AuthContext = React.createContext(null);

function AuthProvider({ children, token }) {
  const [user, setUser] = useState(null);
  const [userPortfolioDetails, setUserPortfolioDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchingUserDetails, setFetchingUserDetails] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [calledOnce, setCalledOnce] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  async function getPortfolioDetails() {
    if (user) {
      try {
        const response = await axios.get(
          window.location.origin +
            "/api/users/get-portfolio-details?id=" +
            user._id
        );

        if (response.data.success) {
          if (response.data.data.isPublished) {
            setIsPublished(true);
          }
          setUserPortfolioDetails(response.data.data);
          setIsSubmitted(true);
          setCalledOnce(true);
          setFetchingUserDetails(false);
        }
      } catch (error) {
        setUserPortfolioDetails(false);
        setFetchingUserDetails(false);
      }
    } else {
      setFetchingUserDetails(false);
    }
  }

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

  const resetCredentials = () => {
    setUser(null);
  };

  useEffect(() => {
    checkAuth();
  }, []);
  useEffect(() => {
    getPortfolioDetails();
  }, [isSubmitted, user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        resetCredentials,
        setIsSubmitted,
        isSubmitted,
        userPortfolioDetails,
        calledOnce,
        setCalledOnce,
        isPublished,
        setIsPublished,getPortfolioDetails
      }}
    >
      {loading || fetchingUserDetails ? <Loading /> : children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
