"use client";
import { useContext, useState } from "react";
import Step from "./Step";
import ProgressBar from "./ProgressBar";
import { Button } from "./ui/button";
import { PortfolioContext } from "@/context/portfolioContext";
import { AuthContext } from "@/context/authContext";
import { Edit } from "lucide-react";

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
    <form onSubmit={handleSubmit} className="w-full mt-10">
      {isSubmitted && editForm && (
        <div className="fixed bottom-6 right-6 z-20">
          <Button
            type="button"
            onClick={handleEdit}
            className="w-32  px-8 py-6 text-sm md:text-base bg-yellow-500 text-white font-medium rounded-lg transition-all duration-300 hover:bg-yellow-700 flex items-center"
          >
            Edit <Edit className="ml-2" />
          </Button>
        </div>
      )}

      <fieldset className="m-0 w-full" disabled={isSubmitted && editForm}>
        <div className="flex flex-col min-h-screen w-full">
          {/* Title */}
          <div className="w-full px-4 md:px-6 py-4">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-700">
              {steps[currentStep]}
            </h2>
          </div>

          {/* Form Container */}
          <div className="flex flex-col items-center justify-center flex-grow bg-gray-50 p-6 md:p-10 w-full">
            {/* Progress Bar */}
            <ProgressBar currentStep={currentStep} totalSteps={steps.length} />

            {/* Step Content */}
            <div className="mt-6 w-full max-w-lg md:max-w-4xl">
              <Step step={steps[currentStep]} />
            </div>

            {/* Navigation Buttons */}
            <div className="mt-8 flex  justify-between w-full max-w-lg md:max-w-4xl gap-4">
              <Button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 0}
                className={`w-32 md:w-40 px-8 py-6 rounded-lg text-white font-medium transition-all duration-300
                ${currentStep === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-gray-700 hover:bg-gray-900"}`}
              >
                Back
              </Button>

              {currentStep < steps.length - 1 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="w-32 md:w-40 px-8 py-6 bg-blue-600 text-white font-medium rounded-lg transition-all duration-300 hover:bg-blue-800"
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-32 md:w-40 px-8 py-6 bg-green-600 text-white font-medium rounded-lg transition-all duration-300 hover:bg-green-800"
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



