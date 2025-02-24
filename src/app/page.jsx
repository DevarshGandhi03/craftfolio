"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, ScrollText } from "lucide-react";
import { MdOutlineRocketLaunch } from "react-icons/md";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/authContext";
import Animation from "../../public/Animation.json";
import Lootie from "lottie-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import axios from "axios";
import Loading from "@/components/Loading";

function Home() {
  const { user } = useContext(AuthContext);
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  function truncateWords(str, maxWords) {
    const words = str.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return str;
  }

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const res = await axios.get("/api/users/get-all-portfolio");
        setPortfolios(await res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, []);
  return loading ? (
    <Loading />
  ) : (
    <div className="min-h-screen flex flex-col">
      <header className="flex px-4 lg:px-6 py-4 items-center justify-between text-center shadow-sm w-full">
        <Link href="/" className="flex items-center space-x-2">
          <ScrollText size={40} />
          <p className="text-gray-800 text-2xl">CraftFolio</p>
        </Link>
        <Link href={user ? "/dashboard/profile" : "/signup"}>
          <Button className="p-4 flex items-center space-x-2">
            <span>{user ? "Go to Dashboard" : "Create Account"}</span>
            <MdOutlineRocketLaunch />
          </Button>
        </Link>
      </header>
      <div className="flex flex-col md:min-h-[90vh] min-h-[80vh] items-center text-center px-4 py-10 md:px-10">
        <Lootie
          className="w-48 md:w-56"
          animationData={Animation}
          loop
          autoplay
        />
        <h1 className="text-4xl md:text-6xl font-bold mt-6 mb-4">
          Welcome to <span className="text-[#a694f2]">CraftFolio</span>
        </h1>
        <h2 className="text-lg md:text-2xl font-semibold leading-snug ">
          Showcase your <span className="text-[#a694f2]">skills</span>,
          <span className="text-[#a694f2]"> experience</span>, and
          <span className="text-[#a694f2]"> achievements</span> with ease.
          <br />
          <span className="bg-[#a694f2] text-white px-3 py-1 rounded-lg mt-2 md:block inline-block">
            CraftFolio helps you build a professional online portfolio website
            or resume in minutes.
          </span>
        </h2>
        <div className="flex flex-col md:flex-row items-center mt-8 space-y-4 md:space-y-0 md:space-x-4">
          <Link href={user ? "/dashboard/profile" : "/signup"}>
            <Button className="p-4 flex items-center ">
              <span>{user ? "Go to Dashboard" : "Get Started"}</span>
              <MdOutlineRocketLaunch />
            </Button>
          </Link>
          <a href="https://github.com/DevarshGandhi03/craftfolio" target="_blank">
            <Button
              className="p-4 flex items-center space-x-2"
              variant="outline"
            >
              <FaGithub />
              <span>View on Github</span>
            </Button>
          </a>
        </div>
      </div>
      <div className="steps bg-white p-8 w-full ">
        <h1 className="md:text-4xl text-3xl font-bold mb-6 text-gray-800 ">
          Steps to Build Your Professional Portfolio Website
        </h1>
        <ul className="md:text-lg text-base  text-gray-600 list-none space-y-4">
          <li className="flex items-start space-x-3">
            <span className="text-[#a694f2] font-semibold">1.</span>
            <span>Register for an account</span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="text-[#a694f2] font-semibold">2.</span>
            <span>Provide your personal information</span>
          </li>
          <li className="flex  items-start space-x-3">
            <span className="text-[#a694f2] font-semibold">3.</span>
            <span>Showcase your projects</span>
          </li>
          <li className="flex  items-start space-x-3">
            <span className="text-[#a694f2] font-semibold">4.</span>
            <span>Include your educational background</span>
          </li>
          <li className="flex  items-start space-x-3">
            <span className="text-[#a694f2] font-semibold">5.</span>
            <span>Detail your professional experience</span>
          </li>
          <li className="flex  items-start space-x-3">
            <span className="text-[#a694f2] font-semibold">6.</span>
            <span>Highlight your skills and add social media links</span>
          </li>
        </ul>
        <p className="md:text-lg text-base text-gray-700 font-medium text-center mt-6">
          <span className="block bg-[#a694f2] text-white md:text-lg text-base font-semibold px-6 py-3 rounded-lg shadow-md mt-6">
            🎉 Congratulations! Your portfolio is now ready to be generated from
            the <strong>Portfolio</strong> section.
          </span>
        </p>
        <p className="md:text-lg text-base text-gray-700 font-medium text-center mt-4">
          🌟 Additionally, you can link your <strong>Hashnode</strong> account
          to your portfolio through the <strong>Blog</strong> section, making it
          easier to share your articles and insights.
        </p>
      </div>
      <div className="md:mt-12 mt-5 bg-white  md:p-8 p-6 w-full  mx-auto">
        <h2 className="md:text-4xl text-3xl font-bold mb-8 text-gray-800 text-center md:text-start ">
        Our Newest Members 🚀
        </h2>
        <div>
          <div className="flex  justify-center items-center ">
            {portfolios.map(
              (user, index) =>
                user.isPublished && (
                  <div
                    key={index}
                    className="min-w-[80vw] flex-col md:flex-row  w-full justify-start  p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex md:items-start items-center gap-6"
                  >
                    {/* Portfolio Iframe */}
                    <div className="w-64 h-[10.2rem]">
                      <iframe
                        src={`https://craftfolio-rouge.vercel.app/portfolio/${user.userName}`}
                        style={{
                          width: "1280px", // Desktop width inside iframe
                          height: "800px", // Desktop height inside iframe
                          transform: `scale(0.2)`, // Scale down to fit preview
                          transformOrigin: "top left",
                          border: "none",
                        }}
                        tabIndex="-1"
                      ></iframe>
                    </div>

                    {/* User Info */}
                    <div className="flex flex-col md:items-start items-center">
                      <p className="text-lg font-semibold text-gray-900">
                        {user.fullName}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {truncateWords(user.userDescription, 50)}
                      </p>
                      <Button className="mt-4 w-40 px-4 py-2   font-semibold rounded-lg  flex items-center gap-2">
                        View <ArrowRight size={18} />
                      </Button>
                    </div>
                  </div>
                ) 
            )}
          </div>
        </div>
      </div>
      <footer className="bg-gray-900 text-white mt-20 py-8 border-t border-gray-800">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Left Section - Logo & Description */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-white">CraftFolio</h2>
          <p className="text-gray-400 mt-2 text-sm">
            Showcase your skills, experience, and achievements with ease.
          </p>
        </div>

        {/* Middle Section - Navigation Links & Socials */}
        <div className="flex gap-6 text-sm md:text-base mt-4 md:mt-0 items-center">
          <Link
            href={user ? "/dashboard/profile" : "/signup"}
            className="text-gray-300 hover:text-white transition"
          >
            Create Account
          </Link>
          <a
            href="https://www.linkedin.com/in/devarsh-gandhi-733826224/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition flex items-center gap-1"
          >
            <FaLinkedin className="w-5 h-5" />
            LinkedIn
          </a>
          <a
            href="https://github.com/DevarshGandhi03/craftfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition flex items-center gap-1"
          >
            <FaGithub className="w-5 h-5" />
            GitHub
          </a>
        </div>
      </div>

      {/* Bottom Section - Copyright */}
      <div className="text-center flex flex-col justify-center items-center text-gray-500 text-sm mt-6 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} CraftFolio. All rights reserved.
        <p className="mt-2">Built by Devarsh Gandhi.</p>
      </div>
    </footer>
 
    </div>
  );
}

export default Home;
