import React, { useContext, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { PortfolioContext } from "@/context/portfolioContext";
import { Button } from "../ui/button";
import { TrashIcon } from "lucide-react";

function SocialLink() {
  const { errors, setSocialLinks, socialLinks, setSkills, skills } =
    useContext(PortfolioContext);
  const [skill, setSkill] = useState("");

  function removeSkill(index) {
    let skillArr = [...skills];
    skillArr = skillArr.filter((_, i) => i !== index);
    setSkills(skillArr);
  }

  return (
    <div className="space-y-8">
      {/* Skills Section */}
      <div className="space-y-3">
        <Label className="font-bold text-gray-700 flex">
          Skills
          <span className="text-red-500 ml-1">*</span> {/* Red asterisk */}
        </Label>
        {errors.skills && (
          <p className="text-red-500 text-xs mt-1">{errors.skills}</p> // Smaller error text
        )}
        <div className="flex space-x-4">
          <Input
            value={skill}
            id="skills"
            placeholder="Enter a skill"
            onChange={(e) => setSkill(e.target.value)}
            className="flex-grow"
          />
          <Button
            type="button"
            onClick={() => {
              if (skill.length > 1) {
                setSkills([...skills, skill]);
                setSkill(""); // Clear input field after adding
              }
            }}
            className="whitespace-nowrap"
          >
            Add
          </Button>
        </div>

        {/* Display Skills as Badges */}
        <div className="mt-4 flex flex-wrap gap-3">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm"
            >
              {skill}
              <Button
                type="button"
                onClick={() => removeSkill(index)}
                className="ml-2 w-5 h-8 rounded-full transition duration-200 ease-in-out"
                aria-label="Remove skill"
              >
                <TrashIcon />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Social Links Section */}
      <h3 className="text-lg font-semibold">Social Links</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* GitHub */}
        <div>
          <Label className="font-bold text-gray-700">
            GitHub
            <span className="text-red-500 ml-1">*</span> {/* Red asterisk */}
          </Label>
          <Input
            id="github"
            value={socialLinks.github}
            placeholder="GitHub Profile URL"
            onChange={(e) =>
              setSocialLinks({ ...socialLinks, github: e.target.value })
            }
            className="w-full"
          />
          {errors.github && (
            <p className="text-red-500 text-xs mt-1">{errors.github}</p>
          )}
        </div>

        {/* LinkedIn */}
        <div>
          <Label className="font-bold text-gray-700">
            LinkedIn
            <span className="text-red-500 ml-1">*</span> {/* Red asterisk */}
          </Label>
          <Input
            id="linkedin"
            value={socialLinks.linkedin}
            placeholder="LinkedIn Profile URL"
            onChange={(e) =>
              setSocialLinks({ ...socialLinks, linkedin: e.target.value })
            }
            className="w-full"
          />
          {errors.linkedin && (
            <p className="text-red-500 text-xs mt-1">{errors.linkedin}</p>
          )}
        </div>

        {/* Twitter */}
        <div>
          <Label className="font-bold text-gray-700">
            Twitter
            <span className="text-red-500 ml-1">*</span> {/* Red asterisk */}
          </Label>
          <Input
            id="twitter"
            value={socialLinks.twitter}
            placeholder="Twitter Profile URL"
            onChange={(e) =>
              setSocialLinks({ ...socialLinks, twitter: e.target.value })
            }
            className="w-full"
          />
          {errors.twitter && (
            <p className="text-red-500 text-xs mt-1">{errors.twitter}</p>
          )}
        </div>

        {/* Instagram */}
        <div>
          <Label className="font-bold text-gray-700">
            Instagram
            <span className="text-red-500 ml-1">*</span> {/* Red asterisk */}
          </Label>
          <Input
            id="instagram"
            value={socialLinks.instagram}
            placeholder="Instagram Profile URL"
            onChange={(e) =>
              setSocialLinks({ ...socialLinks, instagram: e.target.value })
            }
            className="w-full"
          />
          {errors.instagram && (
            <p className="text-red-500 text-xs mt-1">{errors.instagram}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SocialLink;
