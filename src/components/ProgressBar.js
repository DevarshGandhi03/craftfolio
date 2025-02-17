const ProgressBar = ({ currentStep, totalSteps }) => {
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="w-full flex flex-col items-center space-y-4 mb-5 px-4">
      {/* Progress Bar Container */}
      <div className="relative flex items-center w-full max-w-lg md:max-w-3xl h-1.5 bg-gray-200 rounded-full">
        {/* Progress Indicator */}
        <div
          className="absolute top-0 left-0 h-1.5 bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-600 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>

        {/* Step Numbers */}
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`absolute z-10 flex items-center justify-center w-5 h-5 md:w-6 md:h-6 text-[10px] md:text-xs font-semibold rounded-full shadow-md transition-all duration-300
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
      <div className="relative flex justify-between w-full max-w-lg md:max-w-3xl text-[10px] md:text-xs">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className="text-gray-600 font-medium hidden sm:block" // Hide on very small screens
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
