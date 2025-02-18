"use client";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/authContext";
import { PortfolioContext } from "@/context/portfolioContext";
import { toast } from "@/hooks/use-toast";
import { Download } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Portfolio() {
  const { resumeTheme, setResumeTheme } = useContext(PortfolioContext);
  const router = useRouter();
  const { isSubmitted ,userPortfolioDetails} = useContext(AuthContext);

  const themes = [
    { id: "theme_1", name: "Theme 1", imgSrc: "" },
    { id: "theme_2", name: "Theme 2", imgSrc: "" },
    { id: "theme_3", name: "Theme 3", imgSrc: "" },
  ];

  const handleThemeChange = (id) => {
    setResumeTheme(id);
  };
  useEffect(() => {
    if (!isSubmitted && userPortfolioDetails === false) {
      console.log("reached");

      router.push("/dashboard/profile");
      toast({
        title: "Kindly provide your personal information first.",
        description:
          "To access this section, you will need to submit your personal information first.",
      });
    }
  }, []);

  return (
    isSubmitted?
    <div>
      {/* Header Section */}
      <div className="w-full p-6">
        <h2 className="text-5xl font-bold text-gray-700">Resume</h2>
      </div>

      {/* Theme Section */}
      <div className="pl-6 mt-5">
        <div className="flex flex-col gap-2 mb-5">
          <h2 className="text-2xl font-semibold text-gray-800">Theme</h2>
          <p className="text-sm text-gray-500">
            Personalize your resume by selecting a theme you love.
          </p>
          <hr />
        </div>

        {/* Theme Selection */}
        <div className="flex gap-x-6">
          {themes.map((theme) => (
            <div
              key={theme.id}
              id={theme.id}
              className={`w-64 h-48 border-2 rounded-lg shadow-sm bg-gray-100 p-4 cursor-pointer ${
                resumeTheme === theme.id
                  ? "border-purple-600"
                  : "border-gray-300"
              }`}
              onClick={() => handleThemeChange(theme.id)}
            >
              <div className="flex flex-col gap-2">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              </div>
              <div className="mt-4">
                <p className="text-center text-sm font-medium">{theme.name}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Download Button */}
        <div className="mt-4">
          <Button
            className="w-52 flex items-center gap-2"
            onClick={() =>
              resumeTheme ? router.replace("/dashboard/resume/download") : null
            }
          >
            <Download />
            Download Resume
          </Button>
        </div>
      </div>
    </div>:<Loading/>
  );
}
