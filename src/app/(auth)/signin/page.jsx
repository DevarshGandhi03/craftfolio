import { AuthForm } from "@/components/auth-form";
import Navbar from "@/components/Navbar";
import React from "react";

function Signin() {
  return (
    <div>
    <Navbar/>
    <AuthForm
      apiendpoint={"signin"}
      routerreplace={"/dashboard/profile"}
      text={"Don't have an account"}
      submitbtntxt={"Login"}
      text2={"Sign up"}
    /></div>
  );
}

export default Signin;
