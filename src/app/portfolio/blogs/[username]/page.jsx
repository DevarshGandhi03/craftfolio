"use client";
import Loading from "@/components/Loading";
import NotFound from "@/components/Notfound";
import Portfolio_1 from "@/components/PortfolioThemeComponents/Portfolio_1";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Home, Menu, X } from "lucide-react";

function Portfolio() {
  const [userPortfolioDetails, setUserPortfolioDetails] = useState(null);
  const [fetchingUserDetails, setFetchingUserDetails] = useState(true);
  const [isAvailable, setIsAvailable] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const params = useParams();
  const username = params.username;

  useEffect(() => {
    if (userPortfolioDetails?.hashnodeUsername) {
      fetchPosts();
    }
  }, [userPortfolioDetails]);

  async function fetchPosts() {
    try {
      const response = await axios.get(
        `/api/hashnode?username=${userPortfolioDetails.hashnodeUsername.trim()}`
      );
      if (!response.data.success)
        throw new Error("Failed to fetch posts. Please check the username.");

      setPosts(response.data.data);
    } catch (error) {}
  }

  async function getPortfolioDetails() {
    try {
      const response = await axios.get(
        window.location.origin +
          "/api/users/get-portfolio-details-by-username?username=" +
          username
      );
      if (response.data.success) {
        if (response.data.data.hashnodeUsername) {
          setIsAvailable(true);
        }
        setUserPortfolioDetails(response.data.data);
      }
    } catch (error) {
      setFetchingUserDetails(false);
    } finally {
      setFetchingUserDetails(false);
    }
  }

  useEffect(() => {
    getPortfolioDetails();
  }, []);

  return (
    <>
      <nav className="bg-white sticky top-0 z-50 p-3 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="text-3xl ml-2 lg:ml-5 md:ml-5 text-black flex items-end">
            {userPortfolioDetails?.fullName}{" "}
            <div className="ml-1 mb-1 bg-red-500 h-1 w-1 rounded-full"></div>
          </div>

          <div className="hidden md:flex space-x-6">
            <Link
              href={`/portfolio/${username}`}
              className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out"
              passHref
            >
              <Home size={26} />
            </Link>
          </div>

          <div className="md:hidden">
            <button
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed z-50 right-0 h-[calc(100%-4rem)] w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="px-6 py-4 space-y-4">
          <Link
            href={`/portfolio/${username}`}
            className="flex items-center text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-md transition duration-200 ease-in-out text-lg"
            passHref
          >
            <Home size={24} className="mr-2" /> Home
          </Link>
        </div>
      </div>

      {fetchingUserDetails ? (
        <Loading />
      ) : isAvailable ? (
        <div className="p-6">
          <h2 className="text-4xl font-semibold text-gray-800 text-center lg:text-start mb-6">
            Hashnode Blogs
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <Card
                key={index}
                className="group overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out"
              >
                <CardHeader className="p-0">
                  <img
                    src={post.coverImage?.url || "/placeholder.jpg"}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105"
                  />
                </CardHeader>
                <CardContent className="p-5">
                  <CardTitle className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 mt-2 text-sm line-clamp-3">
                    {post.brief}
                  </CardDescription>
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white font-medium text-sm rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                  >
                    Read More →
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
}

export default Portfolio;
