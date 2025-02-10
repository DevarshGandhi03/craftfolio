import { AuthForm } from "@/components/auth-form";
import Navbar from "@/components/Navbar";
import React from "react";

function Signup() {
  return (
    <div>
      <Navbar />
      <AuthForm
        apiendpoint={"signup"}
        routerreplace={"/signin"}
        text={"Already have an account"}
        submitbtntxt={"Sign Up"}
        text2={"Log in"}
      />
    </div>
  );
}

export default Signup;
