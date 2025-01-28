import React from "react";
import { Timeline } from "../ui/timeline";

function Experience() {
  const data = [
    {
      title: "React js Developer",
      city: "Ahmedabad",
      state: "Gujarat",
      dates: "July - September",
      companyName: "Amazon",
      content: "Company name Built and launched Aceternity UI and Aceternity UI Pro from scratch Built and launched Aceternity UI and Aceternity UI Pro  from scratch Built and launched Aceternity UI and Aceternity UI Pro  from scratch Built and launched Aceternity UI and Aceternity UI Pro from scratch"
    },
    {
      title: "React js Developer",
      city: "Ahmedabad",
      state: "Gujarat",
      dates: "July - September",
      companyName: "Amazon",
      content: "Company name Built and launched Aceternity. UI and Aceternity UI Pro from scratch Built and launched Aceternity UI. and Aceternity UI Pro  from scratch Built and launched Aceternity UI and Aceternity UI Pro  from scratch Built and launched Aceternity UI and Aceternity UI Pro from scratch"
    },
    {
      title: "React js Developer",
      city: "Ahmedabad",
      state: "Gujarat",
      dates: "July - September",
      companyName: "Amazon",
      content: "Company name Built and launched Aceternity UI and Aceternity UI Pro from scratch Built and launched Aceternity UI and Aceternity UI Pro  from scratch Built and launched Aceternity UI and Aceternity UI Pro  from scratch Built and launched Aceternity UI and Aceternity UI Pro from scratch"
    },
   
  ];
  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
}

export default Experience;
