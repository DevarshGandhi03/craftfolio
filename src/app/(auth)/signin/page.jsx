import { AuthForm } from "@/components/auth-form";
import React from "react";

function Signin() {
  return (
    <AuthForm
      apiendpoint={"signin"}
      routerreplace={"/dashboard/profile"}
      text={"Don't have an account"}
      submitbtntxt={"Login"}
      text2={"Sign up"}
    />
  );
}

export default Signin;
