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
import { Textarea } from "../ui/textarea";
import { PlusCircle, Trash2, Edit2 } from "lucide-react"; // Icons for Add, Remove, and Edit buttons
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

function Jobs() {
  const { errors, jobExperiences, setJobExperiences } =
    useContext(PortfolioContext);
  const [openJob, setOpenJob] = useState(false);
  const [checked, setChecked] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null); // To track the job being edited
  const [jobErrors, setJobErrors] = useState({});
  const [newJob, setNewJob] = useState({
    companyName: "",
    city: "",
    state: "",
    jobTitle: "",
    jobDescription: "",
    from: "",
    to: "",
  });

  const validateJob = () => {
    let errors = {};
    if (!newJob.companyName.trim())
      errors.companyName = "Company name is required.";
    if (!newJob.city.trim()) errors.city = "City is required.";
    if (!newJob.state.trim()) errors.state = "State is required.";
    if (!newJob.jobTitle.trim()) errors.jobTitle = "Job title is required.";
    if (!newJob.jobDescription.trim())
      errors.jobDescription = "Job description is required.";
    if (!newJob.from.trim()) errors.from = "Start date is required.";
    if (!newJob.to.trim()) errors.to = "End date is required.";
    setJobErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddOrEditJob = () => {
    if (validateJob()) {
      if (editingIndex !== null) {
        // Edit existing job
        const updatedJobs = [...jobExperiences];
        updatedJobs[editingIndex] = newJob;
        setJobExperiences(updatedJobs);
        setEditingIndex(null);
      } else {
        // Add new job
        setJobExperiences([...jobExperiences, newJob]);
      }
      setNewJob({
        companyName: "",
        city: "",
        state: "",
        jobTitle: "",
        jobDescription: "",
        from: "",
        to: "",
      });
      setJobErrors({});
      setOpenJob(false);
      setChecked(false);
    }
  };

  const handleRemoveJob = (index) => {
    const updatedJobs = jobExperiences.filter((_, i) => i !== index);
    setJobExperiences(updatedJobs);
  };

  const handleEditJob = (index) => {
    setNewJob(jobExperiences[index]);
    setEditingIndex(index);
    setOpenJob(true);
    if (jobExperiences[index].to === "Present") {
      setChecked(true);
    }
  };

  return (
    <div>
      {errors.jobExperiences && (
        <p className="text-red-500 text-sm">{errors.jobExperiences}</p>
      )}
      {/* Add New Job Experience Button */}
      <div
        className="cursor-pointer p-5 bg-violet-500 hover:bg-violet-600 rounded-lg text-white text-center mt-6"
        onClick={() => {
          setNewJob({
            companyName: "",
            city: "",
            state: "",
            jobTitle: "",
            jobDescription: "",
            from: "",
            to: "",
          });
          setEditingIndex(null);
          setOpenJob(true);
        }}
      >
        <PlusCircle size={18} className="inline-block mr-2" /> Add Job
        Experience
      </div>
      {/* Job Cards */}
      <div className="space-y-6 mt-4">
        {jobExperiences.map((job, index) => (
          <div key={index} className="p-6 bg-white flex flex-col space-y-4">
            <h4 className="text-2xl font-semibold text-gray-700">
              {job.companyName} - {job.jobTitle}
            </h4>
            <p className="text-gray-600">
              {job.city}, {job.state}
            </p>
            <p className="text-gray-600">
              {job.from} to {job.to}
            </p>
            <p className="text-gray-600">{job.jobDescription}</p>

            <div className="flex gap-4">
              <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={() => handleEditJob(index)}
                className="flex items-center gap-2"
              >
                <Edit2 size={16} /> Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                type="button"
                onClick={() => handleRemoveJob(index)}
                className="flex items-center gap-2"
              >
                <Trash2 size={16} /> Remove
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Job Experience Dialog */}
      <Dialog open={openJob} onOpenChange={setOpenJob} >
        <DialogContent className="max-w-4xl p-10 max-h-[90vh] overflow-y-auto space-y-6 scrollbar-hide">
          <DialogHeader>
            <DialogTitle className="text-violet-700 text-2xl font-semibold">
              {editingIndex !== null
                ? "Edit Job Experience"
                : "Add Job Experience"}
            </DialogTitle>
          </DialogHeader>

          {/* Form Inputs */}
          <div className="space-y-6">
            {/* First row of fields: Company Name, City, and State */}
            <div className="flex flex-col sm:flex-row sm:space-x-6">
              {/* Company Name */}
              <div className="flex-1">
                <Label className="font-bold text-gray-700">
                  Company Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="Enter company name"
                  value={newJob.companyName}
                  onChange={(e) =>
                    setNewJob((prev) => ({
                      ...prev,
                      companyName: e.target.value,
                    }))
                  }
                  className="mt-2"
                />
                {jobErrors.companyName && (
                  <p className="text-red-500 text-sm mt-1">
                    {jobErrors.companyName}
                  </p>
                )}
              </div>

              {/* City */}
              <div className="flex-1">
                <Label className="font-bold text-gray-700">
                  City <span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="Enter city"
                  value={newJob.city}
                  onChange={(e) =>
                    setNewJob((prev) => ({
                      ...prev,
                      city: e.target.value,
                    }))
                  }
                  className="mt-2"
                />
                {jobErrors.city && (
                  <p className="text-red-500 text-sm mt-1">{jobErrors.city}</p>
                )}
              </div>

              {/* State */}
              <div className="flex-1">
                <Label className="font-bold text-gray-700">
                  State <span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="Enter state"
                  value={newJob.state}
                  onChange={(e) =>
                    setNewJob((prev) => ({
                      ...prev,
                      state: e.target.value,
                    }))
                  }
                  className="mt-2"
                />
                {jobErrors.state && (
                  <p className="text-red-500 text-sm mt-1">{jobErrors.state}</p>
                )}
              </div>
            </div>

            {/* Job Title */}
            <div>
              <Label className="font-bold text-gray-700">
                Job Title <span className="text-red-500">*</span>
              </Label>
              <Input
                placeholder="Enter job title"
                value={newJob.jobTitle}
                onChange={(e) =>
                  setNewJob((prev) => ({
                    ...prev,
                    jobTitle: e.target.value,
                  }))
                }
                className="mt-2"
              />
              {jobErrors.jobTitle && (
                <p className="text-red-500 text-sm mt-1">
                  {jobErrors.jobTitle}
                </p>
              )}
            </div>

            {/* Job Description */}
            <div>
              <Label className="font-bold text-gray-700">
                Job Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                placeholder="Enter job description"
                value={newJob.jobDescription}
                onChange={(e) =>
                  setNewJob((prev) => ({
                    ...prev,
                    jobDescription: e.target.value,
                  }))
                }
                className="mt-2"
              />
              {jobErrors.jobDescription && (
                <p className="text-red-500 text-sm mt-1">
                  {jobErrors.jobDescription}
                </p>
              )}
            </div>

            {/* Start and End Dates */}
            <div className="flex space-x-6">
              {/* From */}
              <div className="flex-1">
                <Label className="font-bold text-gray-700">
                  From <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="month"
                  value={newJob.from}
                  onChange={(e) =>
                    setNewJob((prev) => ({
                      ...prev,
                      from: e.target.value,
                    }))
                  }
                  className="mt-2"
                />
                {jobErrors.from && (
                  <p className="text-red-500 text-sm mt-1">{jobErrors.from}</p>
                )}
              </div>

              {/* To */}
              <div className="flex-1">
                <Label className="font-bold text-gray-700">
                  To <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="month"
                  disabled={checked}
                  value={newJob.to}
                  onChange={(e) =>
                    setNewJob((prev) => ({
                      ...prev,
                      to: e.target.value,
                    }))
                  }
                  className="mt-2"
                />
                {jobErrors.to && (
                  <p className="text-red-500 text-sm mt-1">{jobErrors.to}</p>
                )}
                <div className="flex-1 mt-2 p-2 justify-center items-center">
                  <Label className="mr-3 font-bold text-gray-700">
                    Present
                  </Label>
                  <Checkbox
                    className="flex"
                    checked={checked}
                    onCheckedChange={(isChecked) => {
                      setChecked(isChecked);
                      setNewJob({
                        ...newJob,
                        to: isChecked ? "Present" : "",
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleAddOrEditJob}>
              {editingIndex !== null ? "Save Changes" : "Save"}
            </Button>
            <Button onClick={() => setOpenJob(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Jobs;
