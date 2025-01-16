"use client";
import Lootie from "lottie-react"
import AuthLoading from "../../../public/AuthLoading2.json"

function SignupLoading() {
  return (
    <Lootie className="w-4/5" animationData={AuthLoading2} loop={true} autoplay={true} />
  );
}

export default SignupLoading;
