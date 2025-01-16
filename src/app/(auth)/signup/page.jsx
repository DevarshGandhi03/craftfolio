import { AuthForm} from '@/components/auth-form'
import React from 'react'


function Signup() {
  return (
    <AuthForm apiendpoint={"signup"} routerreplace={"/signin"} text={"Already have an account"} submitbtntxt={"Sign Up"} text2={"Log in"}/>
  )
}

export default Signup