"use client";
import Loading from "@/components/Loading";
import NotFound from "@/components/Notfound";
import Portfolio_1 from "@/components/PortfolioThemeComponents/Portfolio_1";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function Portfolio() {
  const [userPortfolioDetails, setUserPortfolioDetails] = useState(null);
  const [fetchingUserDetails, setFetchingUserDetails] = useState(true);
  const [isAvailable, setIsAvailable] = useState(false);

  const params = useParams();
  const username = params.username;
  async function getPortfolioDetails() {
    try {
      const response = await axios.get(
        window.location.origin +
          "/api/users/get-portfolio-details-by-username?username=" +
          username
      );
      if (response.data.success) {
        setIsAvailable(true);
        setUserPortfolioDetails(response.data.data);
        setFetchingUserDetails(false);
      }
    } catch (error) {
      setFetchingUserDetails(false);
    }
  }

  useEffect(() => {
    getPortfolioDetails();
  }, []);

  return fetchingUserDetails ? (
    <Loading />
  ) : isAvailable ? (
    userPortfolioDetails.portfolioTheme === "theme_1" && (
      <Portfolio_1 portfolioDetails={userPortfolioDetails} />
    )
  ) : (
    <NotFound />
  );
}

export default Portfolio;
