"use client";
import { PortfolioContext } from "@/context/portfolioContext";
import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash2, PlusCircle, Edit } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

function Education() {
  const [educationErrors, setEducationErrors] = useState({});
  const [openEdu, setOpenEdu] = useState(false);
  const { errors, education, setEducation } = useContext(PortfolioContext);
  const [newEducation, setNewEducation] = useState({
    instituteName: "",
    degree: "",
    from: "",
    to: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);

  const validateEducation = () => {
    let errors = {};
    if (!newEducation.instituteName.trim())
      errors.instituteName = "Institute name is required.";
    if (!newEducation.degree.trim()) errors.degree = "Degree is required.";
    if (!newEducation.from) errors.from = "Start date is required.";
    if (!newEducation.to) errors.to = "End date is required.";
    setEducationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddEducation = () => {
    if (validateEducation()) {
      if (editingIndex !== null) {
        const updatedEducation = [...education];
        updatedEducation[editingIndex] = newEducation;
        setEducation(updatedEducation);
      } else {
        setEducation([...education, newEducation]);
      }
      setNewEducation({
        instituteName: "",
        degree: "",
        from: "",
        to: "",
      });
      setEducationErrors({});
      setOpenEdu(false);
      setEditingIndex(null);
    }
  };

  const handleEditEducation = (index) => {
    setNewEducation(education[index]);
    setEditingIndex(index);
    setOpenEdu(true);
  };

  const handleRemoveEducation = (index) => {
    const updatedEducation = education.filter((_, i) => i !== index);
    setEducation(updatedEducation);
  };

  const handleCloseDialog = () => {
    setOpenEdu(false);
    setNewEducation({
      instituteName: "",
      degree: "",
      from: "",
      to: "",
    });
    setEditingIndex(null);
  };

  return (
    <div className="space-y-6">
      {errors.education && <p className="text-red-500">{errors.education}</p>}
      <div
        className="cursor-pointer p-5 bg-violet-500 hover:bg-violet-600 rounded-lg text-white text-center mt-6"
        onClick={() => {
          setOpenEdu(true);
          setEditingIndex(null);
        }}
      >
        <PlusCircle size={18} className="inline-block mr-2" />
        <span className="inline-block text-lg font-medium">Add Education</span>
      </div>

      <div className="flex flex-wrap gap-6">
  {education.map((edu, index) => (
    <div
      key={index}
      className="flex-1 min-w-[300px] max-w-[48%] bg-white p-6 flex flex-col justify-between"
    >
      <div className="flex flex-col mb-4">
        <h4 className="text-2xl font-semibold text-gray-700">
          {edu.instituteName}
        </h4>
        <p className="text-gray-700">{edu.degree}</p>
        <p className="text-gray-500 mt-2">
         {edu.from} to {edu.to}
        </p>
      </div>
      <div className="flex gap-4 mt-4">
        <Button
          variant="secondary"
          size="sm"
          type="button"
          className="flex items-center gap-2"
          onClick={() => handleEditEducation(index)}
        >
          <Edit size={16} /> Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          type="button"
          className="flex items-center gap-2"
          onClick={() => handleRemoveEducation(index)}
        >
          <Trash2 size={16} /> Remove
        </Button>
      </div>
    </div>
  ))}
</div>


      <Dialog open={openEdu}>
        <DialogContent className="max-w-4xl space-y-6">
          <DialogHeader>
            <DialogTitle className="text-violet-700 text-2xl font-semibold">
              {editingIndex !== null ? "Edit Education" : "Add Education"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="flex space-x-6">
              <div className="flex-1">
                <Label
                  htmlFor="instituteName"
                  className="font-bold text-gray-700"
                >
                  Institute Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="instituteName"
                  placeholder="Institute Name"
                  value={newEducation.instituteName}
                  onChange={(e) =>
                    setNewEducation({
                      ...newEducation,
                      instituteName: e.target.value,
                    })
                  }
                  className="w-full mt-2"
                />
                {educationErrors.instituteName && (
                  <p className="text-red-500 text-xs mt-1">
                    {educationErrors.instituteName}
                  </p>
                )}
              </div>

              <div className="flex-1">
                <Label
                  htmlFor="degree"
                  className="font-bold text-gray-700"
                >
                  Degree <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="degree"
                  placeholder="Degree"
                  value={newEducation.degree}
                  onChange={(e) =>
                    setNewEducation({ ...newEducation, degree: e.target.value })
                  }
                  className="w-full mt-2"
                />
                {educationErrors.degree && (
                  <p className="text-red-500 text-xs mt-1">
                    {educationErrors.degree}
                  </p>
                )}
              </div>
            </div>

            <div className="flex space-x-6">
            <div className="flex-1">
                <label htmlFor="from" className="block text-sm font-medium text-gray-700">
                  From <span className="text-red-500">*</span>
                </label>
                <Input
                  id="from"
                  placeholder="From"
                  type="date"
                  value={newEducation.from}
                  onChange={(e) =>
                    setNewEducation({ ...newEducation, from: e.target.value })
                  }
                  className="w-full mt-2"
                />
                {educationErrors.from && (
                  <p className="text-red-500 text-xs mt-1">{educationErrors.from}</p>
                )}
              </div>

              <div className="flex-1">
                <label htmlFor="to" className="block text-sm font-medium text-gray-700">
                  To <span className="text-red-500">*</span>
                </label>
                <Input
                  id="to"
                  placeholder="To"
                  type="date"
                  value={newEducation.to}
                  onChange={(e) =>
                    setNewEducation({ ...newEducation, to: e.target.value })
                  }
                  className="w-full mt-2"
                />
                {educationErrors.to && (
                  <p className="text-red-500 text-xs mt-1">{educationErrors.to}</p>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleAddEducation}>
              {editingIndex !== null ? "Update" : "Save"}
            </Button>
            <Button onClick={handleCloseDialog}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Education;