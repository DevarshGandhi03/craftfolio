"use client";
import { PortfolioContext } from "@/context/portfolioContext";
import React, { useContext, useState } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { Input } from "../ui/input";
import { Sparkle, SparkleIcon, Sparkles, Trash2 } from "lucide-react";
import { useCompletion } from "ai/react";
import { useEffect } from "react";
import { title } from "process";

function PersonalInformation() {
  const {
    errors,
    setFullname,
    userImage,
    userImageId,
    setUserImage,
    setUserDescription,
    setUserTitle,
    setUserImageId,
    setAbout,
    setPhoneNumber,
    setImage,
    fullName,
    image,
    userDescription,
    userTitle,
    about,
    phoneNumber,
  } = useContext(PortfolioContext);

  const [previewUrl, setPreviewUrl] = useState();

  const { completion, complete, isLoading } = useCompletion({
    api: "/api/users/suggest-description", // Ensure this matches your backend route
  });
  const {
    completion: aboutCompletion,
    complete: aboutComplete,
    isLoading: isAboutLoading,
  } = useCompletion({
    api: "/api/users/suggest-about", // Ensure this matches your backend route
  });

  if (image) {
    const fileReader = new FileReader();
    fileReader.onload = () => setPreviewUrl(fileReader.result);
    fileReader.readAsDataURL(image);
  }
  const handleGenDescSubmit = (e) => {
    e.preventDefault();
    if (userTitle && fullName) {
      complete({
        fullName,
        userTitle,
      });
    } else {
      toast({
        title: "Missing Information! Fullname and Title required.",

        variant: "destructive",
      });
      return;
    }
  };
  const handleGenAboutSubmit = (e) => {
    e.preventDefault();
    if (userTitle && fullName) {
      aboutComplete({
        fullName,
        userTitle,
      });
    } else {
      toast({
        title: "Missing Information! Fullname and Title required.",
        variant: "destructive",
      });
      return;
    }
  };
  useEffect(() => {
    if (completion) {
      setUserDescription(completion);
    }
  }, [completion]);
  useEffect(() => {
    if (aboutCompletion) {
      setAbout(aboutCompletion);
    }
  }, [aboutCompletion]);

  async function handleRemoveUserImage() {
    setUserImage(null);
    setImage(null);
  }
  async function handleRemoveImage(publicId) {
    const response = await axios.post("/api/users/remove-file", {
      public_id: publicId,
    });
    if (response.data.success) {
      setUserImage(null);
      setImage(null);
    }
  }
  async function phoneNoValidation(event) {
    const value = event.target.value;
    if (/[^0-9]/.test(value)) {
      event.target.value = value.replace(/[^0-9]/g, "");
    }
  }

  return (
    <div className="space-y-4">
      {/* Full Name and Phone Number in a Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="font-bold text-gray-700">
            Full Name <span className="text-red-500">*</span>
          </Label>
          <Input
            value={fullName}
            type="text"
            placeholder="John Doe"
            onChange={(e) => setFullname(e.target.value)}
            className="mt-1  border w-full focus:ring-2 focus:ring-violet-500 text-base"
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
          )}
        </div>

        <div>
          <Label className="font-bold text-gray-700">
            Phone Number <span className="text-red-500">*</span>
          </Label>
          <Input
            value={phoneNumber}
            type="tel"
            placeholder="Your phone number"
            onChange={(e) => {
              phoneNoValidation(e);
              e.target.value.length <= 10
                ? setPhoneNumber(e.target.value)
                : null;
            }}
            className="mt-1 border w-full focus:ring-2 focus:ring-violet-500 text-base"
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
          )}
        </div>
      </div>

      {/* Title Field */}
      <div>
        <Label className="font-bold text-gray-700">
          Title <span className="text-red-500">*</span>
        </Label>
        <Input
          type="text"
          value={userTitle}
          placeholder="Software Engineer, Backend Developer"
          onChange={(e) => setUserTitle(e.target.value)}
          className="mt-1  border w-full focus:ring-2 focus:ring-violet-500 text-base"
        />
        <p className="text-gray-400 text-xs mt-1">Note: The words separated by commas will be displayed with a typewriter effect on your portfolio website.</p>
        {errors.userTitle && (
          <p className="text-red-500 text-xs mt-1">{errors.userTitle}</p>
        )}
      </div>

      {/* User Image with Preview and Upload */}
      <div>
        <Label className="font-bold text-gray-700">
          Profile Photo <span className="text-red-500">*</span>
        </Label>
        {errors.userImage && (
          <p className="text-red-500 text-xs mt-1">{errors.userImage}</p>
        )}
        {previewUrl && (
          <div className="mt-2">
            <img
              src={previewUrl}
              alt="Image Preview"
              className="h-32 w-48 object-cover"
            />
          </div>
        )}
        {userImage ? (
          <div className="mt-4 flex flex-col items-start">
            <img
              src={userImage}
              alt="User Image"
              className="h-32 w-48 object-cover"
            />
            <Button
              type="button"
              onClick={() => handleRemoveUserImage()}
              className="mt-2 bg-red-600 text-white px-3 py-1 text-xs rounded hover:bg-red-700"
            >
              <Trash2 /> Delete Image
            </Button>
          </div>
        ) : (
          <div className="mt-4">
            <Button
              type="button"
              className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-800"
              onClick={() => document.getElementById("hiddenFileInput").click()}
            >
              Upload Image
            </Button>
            <input
              id="hiddenFileInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (event) => {
                userImageId && (await handleRemoveImage(userImageId));
                const file = event.target.files[0];
                if (file) {
                  const fileReader = new FileReader();
                  fileReader.onload = () => setPreviewUrl(fileReader.result);
                  fileReader.readAsDataURL(file);
                  setImage(file);
                }
              }}
            />
          </div>
        )}
      </div>

      {/* Description and About in a Row */}
      <div className="flex flex-col justify-center gap-y-5 mt-1">
        <div>
          <Label className="font-bold text-gray-700 ">
            Description <span className="text-red-500 ">*</span>
          </Label>
          <Textarea
            value={userDescription}
            placeholder="Brief description about yourself"
            onChange={(e) => setUserDescription(e.target.value)}
            className="mt-1 p-3 h-36 border w-full focus:ring-2 focus:ring-violet-500 text-base scrollbar-hide" // Added border radius adjustment
          />
          {errors.userDescription && (
            <p className="text-red-500 text-xs mt-1">
              {errors.userDescription}
            </p>
          )}
          <Button
            className="mt-3"
            disabled={isLoading}
            onClick={handleGenDescSubmit}
          >
            {isLoading ? "Generating..." : "Generate"} <Sparkles />
          </Button>
        </div>

        <div>
          <Label className="font-bold text-gray-700">
            About <span className="text-red-500">*</span>
          </Label>
          <Textarea
            value={about}
            placeholder="Tell us about yourself"
            onChange={(e) => setAbout(e.target.value)}
            className="mt-1 scrollbar-hide p-3 h-36 border w-full focus:ring-2 focus:ring-violet-500 text-base"
          />
          {errors.about && (
            <p className="text-red-500 text-xs mt-1">{errors.about}</p>
          )}
          <Button
            className="mt-3 "
            disabled={isAboutLoading}
            onClick={handleGenAboutSubmit}
          >
            {isAboutLoading ? "Generating..." : "Generate"} <Sparkles />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PersonalInformation;
