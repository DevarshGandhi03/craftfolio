"use client";
import { useContext, useState } from "react";
import Step from "./Step";
import ProgressBar from "./ProgressBar";
import { Button } from "./ui/button";
import { PortfolioContext } from "@/context/portfolioContext";
import { AuthContext } from "@/context/authContext";
import { Edit, Edit2 } from "lucide-react";

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { handleSubmit, editForm, setEditForm } = useContext(PortfolioContext);
  const { isSubmitted } = useContext(AuthContext);

  const steps = [
    "Personal Information",
    "Projects",
    "Education",
    "Job Experiences",
    "Social Links",
  ];

  const handleNext = (e) => {
    e.preventDefault();
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleEdit = () => {
    setEditForm(false);
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      {/* Edit Button Outside Fieldset */}

      {isSubmitted ? (
        editForm ? (
          <div className="flex justify-end w-full px-12 py-6">
            <Button
              type="button"
              onClick={handleEdit}
              className="px-6 py-3 bg-yellow-500 h-14 w-28 text-white font-medium rounded-lg transition-all duration-300 hover:bg-yellow-700"
            >
              <Edit />
              Edit
            </Button>
          </div>
        ) : null
      ) : null}

      <fieldset disabled={isSubmitted && editForm}>
        <div className="flex flex-col min-h-screen w-full">
          {/* Title on Top Left (Dynamic Title) */}
          <div className="w-full px-12 py-6">
            <h2 className="text-4xl font-bold text-gray-800">
              {steps[currentStep]}
            </h2>
          </div>

          {/* Form Container */}
          <div className="flex flex-col items-center justify-center flex-grow bg-white shadow-xl rounded-none p-10">
            {/* Progress Bar */}
            <ProgressBar currentStep={currentStep} totalSteps={steps.length} />

            {/* Step Content */}
            <div className="mt-6 w-full max-w-4xl">
              <Step step={steps[currentStep]} />
            </div>

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between w-full max-w-4xl">
              <Button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 0}
                className={`w-40 px-8 py-3 rounded-lg text-white font-medium transition-all duration-300 
      ${
        currentStep === 0
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-gray-700 hover:bg-gray-900"
      }`}
              >
                Back
              </Button>

              {currentStep < steps.length - 1 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="w-40 px-8 py-3 bg-blue-600 text-white font-medium rounded-lg transition-all duration-300 hover:bg-blue-800"
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-40 px-8 py-3 bg-green-600 text-white font-medium rounded-lg transition-all duration-300 hover:bg-green-800"
                >
                  Submit
                </Button>
              )}
            </div>
          </div>
        </div>
      </fieldset>
    </form>
  );
};

export default MultiStepForm;
