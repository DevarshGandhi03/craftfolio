const ProgressBar = ({ currentStep, totalSteps }) => {
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="w-full flex flex-col items-center space-y-4">
      {/* Progress Bar Container */}
      <div className="relative flex items-center w-full max-w-3xl h-1.5 bg-gray-200 rounded-full">
        {/* Progress Indicator */}
        <div
          className="absolute top-0 left-0 h-1.5 bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-600 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>

        {/* Step Numbers */}
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`absolute z-10 flex items-center justify-center w-6 h-6 text-xs font-semibold rounded-full shadow-md transition-all duration-300
              ${
                index <= currentStep
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            style={{
              left: `${(index / (totalSteps - 1)) * 100}%`,
              transform: "translateX(-50%)",
            }}
          >
            {index + 1}
          </div>
        ))}
      </div>

      {/* Step Labels */}
      <div className="relative flex justify-between w-full max-w-3xl">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className="text-xs font-medium text-gray-600"
            style={{
              width: `${100 / totalSteps}%`,
              textAlign: "center",
              transform: "translateX(-50%)",
              left: `${(index / (totalSteps - 1)) * 100}%`,
              position: "absolute",
            }}
          >
            Step {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
