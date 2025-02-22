"use client";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/authContext";
import { PortfolioContext } from "@/context/portfolioContext";
import { toast } from "@/hooks/use-toast";
import { Download } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import Theme_1 from "../../../../public/Assets/Theme_1.jpg";
import Theme_2 from "../../../../public/Assets/Theme_2.jpg";
import Theme_3 from "../../../../public/Assets/Theme_3.jpg";


export default function Portfolio() {
  const { resumeTheme, setResumeTheme } = useContext(PortfolioContext);
  const router = useRouter();
  const { isSubmitted, userPortfolioDetails } = useContext(AuthContext);

  const themes = [
    { id: "theme_1", name: "Theme 1", imgSrc:  Theme_1  },
    { id: "theme_2", name: "Theme 2", imgSrc: Theme_2  },
    { id: "theme_3", name: "Theme 3", imgSrc:  Theme_3  },
  ];

  const handleThemeChange = (id) => {
    setResumeTheme(id);
  };
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

  return isSubmitted ? (
    <div>
      {/* Header Section */}
      <div className="w-full p-6 pl-0 mt-8">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-700">Resume</h2>
      </div>

      {/* Theme Section */}
      <div className="md:pl-6 pl-0 md:mt-5 mt-0 ">
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
              className={` border-2 rounded-lg shadow-sm   cursor-pointer ${
                resumeTheme === theme.id
                  ? "border-purple-600"
                  : "border-gray-300"
              }`}
              onClick={() => handleThemeChange(theme.id)}
            >
              <div className="flex flex-col gap-2">
                <Image src={theme.imgSrc} alt={theme.imgSrc} height={250}/>
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
    </div>
  ) : (
    <Loading />
  );
}
