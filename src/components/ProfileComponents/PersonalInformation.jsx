"use client";
import { PortfolioContext } from "@/context/portfolioContext";
import React, { useContext, useState } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { toast } from "@/hooks/use-toast";
import axios from "axios";

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

  if (image) {
    const fileReader = new FileReader();
    fileReader.onload = () => setPreviewUrl(fileReader.result);
    fileReader.readAsDataURL(image);
  }

  async function handleRemoveUserImage(publicId) {
    const response = await axios.post("/api/users/remove-file", {
      public_id: publicId,
    });
    if (response.data.success) {
      setUserImage(null);
      setImage(null);
    }
  }

  return (
    <div className="space-y-4">
      {/* Full Name and Phone Number in a Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>
            Full Name <span className="text-red-500">*</span>
          </Label>
          <input
            value={fullName}
            type="text"
            placeholder="John Doe"
            onChange={(e) => setFullname(e.target.value)}
            className="mt-1 p-3 border w-full focus:ring-2 focus:ring-violet-500 text-base"
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
          )}
        </div>

        <div>
          <Label>
            Phone Number <span className="text-red-500">*</span>
          </Label>
          <input
            value={phoneNumber}
            type="tel"
            placeholder="Your phone number"
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="mt-1 p-3 border w-full focus:ring-2 focus:ring-violet-500 text-base"
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
          )}
        </div>
      </div>

      {/* Title Field */}
      <div>
        <Label>
          Title <span className="text-red-500">*</span>
        </Label>
        <input
          type="text"
          value={userTitle}
          placeholder="Software Engineer"
          onChange={(e) => setUserTitle(e.target.value)}
          className="mt-1 p-3 border w-full focus:ring-2 focus:ring-violet-500 text-base"
        />
        {errors.userTitle && (
          <p className="text-red-500 text-xs mt-1">{errors.userTitle}</p>
        )}
      </div>

      {/* User Image with Preview and Upload */}
      <div>
        <Label>
          User Image <span className="text-red-500">*</span>
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
              onClick={() => handleRemoveUserImage(userImageId)}
              className="mt-2 bg-red-600 text-white px-3 py-1 text-xs rounded hover:bg-red-700"
            >
              Delete Image
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
              onChange={(event) => {
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>
            Description<span className="text-red-500">*</span>
          </Label>
          <Textarea
            value={userDescription}
            placeholder="Brief description about yourself"
            onChange={(e) => setUserDescription(e.target.value)}
            className="mt-1 p-3 border w-full focus:ring-2 focus:ring-violet-500 text-base"
            style={{ borderRadius: "4px" }} // Added border radius adjustment
          />
          {errors.userDescription && (
            <p className="text-red-500 text-xs mt-1">
              {errors.userDescription}
            </p>
          )}
        </div>

        <div>
          <Label>
            About <span className="text-red-500">*</span>
          </Label>
          <Textarea
            value={about}
            placeholder="Tell us about yourself"
            onChange={(e) => setAbout(e.target.value)}
            className="mt-1 p-3 border w-full focus:ring-2 focus:ring-violet-500 text-base"
            style={{ borderRadius: "4px" }} // Added border radius adjustment
          />
          {errors.about && (
            <p className="text-red-500 text-xs mt-1">{errors.about}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PersonalInformation;
