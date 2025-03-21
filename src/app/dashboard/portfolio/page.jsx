"use client";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/context/authContext";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { Loader2, Upload, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Lootie from "lottie-react";
import AuthLoading from "../../../../public/CommingSoon.json";

export default function Portfolio() {
  const [theme, setTheme] = useState("theme_1");
  const {
    user,
    userPortfolioDetails,
    isPublished,
    setIsPublished,
    isSubmitted,
    getPortfolioDetails,
  } = useContext(AuthContext);
  const [scale, setScale] = useState(0.2);
  const [loading, setLoading] = useState(false);
  const [resumeLoading, setResumeLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeFileId, setResumeFileId] = useState(null);
  const [resumeFileUrl, setResumeFileUrl] = useState(null);
  const [userName, setUserName] = useState(null);
  const router = useRouter();

  function setUserDetails() {
    if (isSubmitted && userPortfolioDetails) {
      setResumeFileId(userPortfolioDetails.resumeId);
      setResumeFileUrl(userPortfolioDetails.resume);
      setUserName(user.username);
      setTheme(userPortfolioDetails.portfolioTheme || "theme_1");
    }
  }
  useEffect(() => {
    if (window.innerWidth <= 768) {
      setScale(0.25);
    } else {
      setScale(0.2);
    }
  }, []);
  useEffect(() => {
    if (!isSubmitted && userPortfolioDetails === false) {
      router.push("/dashboard/profile");
      toast({
        title: "Kindly provide your personal information first.",
        description:
          "To access this section, you will need to submit your personal information first.",
      });
    }
  }, [userPortfolioDetails, isSubmitted]);
  useEffect(() => {
    setUserDetails();
  }, [isSubmitted]);

  async function updatePortfolioTheme() {
    setLoading(true);
    try {
      const response = await axios.post("/api/users/update-portfolio-details", {
        portfolioId: userPortfolioDetails._id,
        portfolioTheme: theme,
        isPublished: true,
      });
      if (response.data.success) {
        setIsPublished(true);
      }
      setLoading(false);
      getPortfolioDetails();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const handleThemeChange = (e) => {
    setTheme(e.currentTarget.id); // Update the selected theme based on the clicked div
  };

  const handleResumeUpload = async (e) => {
    setResumeLoading(true);
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(`/api/users/resume-upload`, formData);

        if (response.data.success) {
          const res = await axios.post("/api/users/update-portfolio-details", {
            portfolioId: userPortfolioDetails._id,
            resume: response.data.data.url,
            resumeId: response.data.data.publicId,
          });
          setResumeFileId(response.data.data.publicId);
          setResumeFileUrl(response.data.data.url);
          getPortfolioDetails();
        }
      } catch (error) {
        console.error("Failed to upload resume.");
      }
    }
    setResumeLoading(false);
  };

  const handleResumeDelete = async () => {
    try {
      const response = await axios.post("/api/users/remove-file", {
        public_id: resumeFileId,
      });
      if (response.data.success) {
        const res = await axios.post("/api/users/update-portfolio-details", {
          portfolioId: userPortfolioDetails._id,
          resume: null,
          resumeId: null,
        });
      }
      setResumeFile(null);
      setResumeFileId(null);
      setResumeFileUrl(null);
    } catch (error) {
      console.error("Failed to delete resume:", error);
    }
  };

  return isSubmitted ? (
    <div>
      <div className="w-full md:p-6 pl-0 md:mt-8 mt-16">
        <h2 className="text-3xl md:text-5xl  font-bold text-gray-700">
          Portfolio Website
        </h2>
      </div>
      <div className="md:pl-6 pl-0 md:mt-5 mt-3">
        <div className="flex flex-col gap-2 mb-5">
          <h2 className="text-2xl font-semibold text-gray-800">Appearance</h2>
          <p className="text-sm text-gray-500">
            Customize the appearance of the your portfolio website.
          </p>
          <hr />
        </div>
        <div className="flex gap-x-6 flex-col md:flex-row justify-start items-center">
          <div
            id="theme_1"
            className={`md:w-64 w-80  overflow-hidden md:h-[10.2rem] h-[12.5rem]  border-2 rounded-lg shadow-sm bg-gray-100  ${
              theme === "theme_1" ? "border-purple-600" : "border-gray-300"
            }`}
            onClick={handleThemeChange}
          >
            <iframe
              src="https://craftfolio-rouge.vercel.app/portfolio/devarsh600"
              className="h-48 w-64  pointer-events-none "
              style={{
                width: "1280px", // Desktop width inside iframe
                height: "800px", // Desktop height inside iframe
                transform: `scale(${scale})`, // Scale down to fit preview
                transformOrigin: "top left",
                border: "none",
              }}
              tabIndex="-1"
            ></iframe>
          </div>
          <div
            className={`md:w-64 w-80 flex justify-center items-center  mt-5 md:mt-0 overflow-hidden md:h-[10.2rem] h-[12.5rem]  border-2 rounded-lg shadow-sm bg-gray-100`}
          >
            <Lootie
              className="md:w-full w-80 "
              animationData={AuthLoading}
              loop={true}
              autoplay={true}
            />
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-y-2">
          <Button
            className="w-52 "
            onClick={updatePortfolioTheme}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                Please wait
              </>
            ) : (
              <>{isPublished ? "Update theme" : "Generate Website"}</>
            )}
            <Upload />
          </Button>
          {isPublished ? (
            <div className="text-sm text-gray-800">
              Public URL-
              <Link
                className=" text-blue-600"
                href={window.location.origin + "/portfolio/" + userName}
              >
                {window.location.origin + "/portfolio/" + userName}
              </Link>
            </div>
          ) : null}
        </div>
      </div>
      <div className="md:pl-6 pl-0 mt-5 ">
        <div className="flex flex-col gap-2 mb-5">
          <h2 className="text-2xl font-semibold text-gray-800">
            Upload Resume
          </h2>
          <p className="text-sm text-gray-500">
            Upload your latest resume here to showcase it on your portfolio
            website.
          </p>
          <hr />
        </div>
        <div>
          {resumeFileUrl ? (
            <div className="flex flex-col gap-y-2">
              <p className="text-sm text-gray-800 mt-2">
                Resume uploaded:{" "}
                <a
                  href={resumeFileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View Resume
                </a>
              </p>
              <Button
                variant="outline"
                className="flex items-center w-52 gap-x-2 text-red-600"
                onClick={handleResumeDelete}
              >
                <Trash2 className="w-4 h-4" />
                Delete Resume
              </Button>
            </div>
          ) : (
            <>
              <Button
                variant="outline"
                className="flex items-center gap-x-2 "
                disabled={resumeLoading}
                onClick={() => {
                  window.document.getElementById("resume-upload").click();
                }}
              >
                {resumeLoading ? (
                  <>
                    <Loader2 className="animate-spin" /> Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Upload Resume
                  </>
                )}
              </Button>
              <Input
                id="resume-upload"
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={handleResumeUpload}
              />
            </>
          )}
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}
