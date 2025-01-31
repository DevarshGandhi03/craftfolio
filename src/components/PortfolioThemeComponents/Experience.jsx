import React from "react";
import { Timeline } from "../ui/timeline";

function Experience({portfolioDetails}) {
  const data = portfolioDetails.jobExperiences
  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
}

export default Experience;
