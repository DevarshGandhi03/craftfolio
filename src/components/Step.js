import Education from "@/components/ProfileComponents/Education";
import Jobs from "@/components/ProfileComponents/Jobs";
import PersonalInformation from "@/components/ProfileComponents/PersonalInformation";
import Projects from "@/components/ProfileComponents/Projects";
import SocialLink from "@/components/ProfileComponents/SocialLink";
const Step = ({ step }) => {
  switch (step) {
    case "Personal Information":
      return <PersonalInformation />;

    case "Projects":
      return (
          <Projects />
      );
    case "Education":
      return (
          <Education />
      );
    case "Job Experiences":
      return (
          <Jobs />
      );
    case "Social Links":
      return (
          <SocialLink />
      );
  }
};

export default Step;
