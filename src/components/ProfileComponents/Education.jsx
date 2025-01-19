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
import { Input } from "@/components/ui/input";
import { Trash2, PlusCircle, Edit } from "lucide-react"; // Edit icon added for Edit functionality

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
  const [editingIndex, setEditingIndex] = useState(null); // Tracks if editing an existing entry

  const validateEducation = () => {
    let errors = {};
    if (!newEducation.instituteName.trim())
      errors.instituteName = "Institute name is required.";
    if (!newEducation.degree.trim()) errors.degree = "Degree is required.";
    if (!newEducation.from.trim()) errors.from = "Start date is required.";
    if (!newEducation.to.trim()) errors.to = "End date is required.";
    setEducationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddEducation = () => {
    if (validateEducation()) {
      if (editingIndex !== null) {
        // Update existing entry
        const updatedEducation = [...education];
        updatedEducation[editingIndex] = newEducation;
        setEducation(updatedEducation);
      } else {
        // Add new entry
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
      setEditingIndex(null); // Reset editing index
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

      {/* Education Cards */}
      <div className="flex flex-col space-y-6">
        {education.map((edu, index) => (
          <div
            key={index}
            className="p-6 bg-white shadow-lg rounded-lg border border-gray-300 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6"
          >
            <div className="flex flex-col justify-between mt-4 md:mt-0">
              <h4 className="text-xl font-bold text-gray-900">{edu.instituteName}</h4>
              <p className="text-gray-700 mt-2">{edu.degree}</p>
              <p className="text-gray-500 mt-2">{edu.from} - {edu.to}</p>
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
          </div>
        ))}
      </div>

      {/* Add Education Button (Large Div with Plus Sign) */}
      <div
        className="cursor-pointer p-4 bg-violet-600 hover:bg-violet-700 rounded-lg text-white text-center mt-6 flex items-center justify-center gap-2"
        onClick={() => {
          setOpenEdu(true);
          setEditingIndex(null); // Reset editing index for adding new
        }}
      >
        <PlusCircle size={20} />
        <span className="inline-block text-lg font-medium">Add Education</span>
      </div>

      {/* Add/Edit Education Dialog */}
      <Dialog open={openEdu}>
        <DialogContent className="max-w-4xl space-y-6">
          <DialogHeader>
            <DialogTitle className="text-violet-700 text-2xl font-semibold">
              {editingIndex !== null ? "Edit Education" : "Add Education"}
            </DialogTitle>
          </DialogHeader>

          {/* Form Inputs */}
          <div className="space-y-6">
            <div className="flex space-x-6">
              <div className="flex-1">
                <label htmlFor="instituteName" className="block text-sm font-medium text-gray-700">
                  Institute Name <span className="text-red-500">*</span>
                </label>
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
                  <p className="text-red-500 text-xs mt-1">{educationErrors.instituteName}</p>
                )}
              </div>

              <div className="flex-1">
                <label htmlFor="degree" className="block text-sm font-medium text-gray-700">
                  Degree <span className="text-red-500">*</span>
                </label>
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
                  <p className="text-red-500 text-xs mt-1">{educationErrors.degree}</p>
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

          {/* Dialog Footer */}
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
