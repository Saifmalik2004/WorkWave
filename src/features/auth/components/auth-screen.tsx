'use client';

import { useState } from "react";
import { SignInFlow } from "../types";
import { SignInCard } from "./sign-in-card";
import { SignUpCard } from "./sign-up-card";

export const AuthScreen=()=>{

    const[state,setState]=useState<SignInFlow>("signIn")
    return(
        <div className="h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-500 to-purple-800">
           <div className="md:h-auto md:w-[420px]">
             {state==="signIn"?<SignInCard setState={setState}/>:<SignUpCard setState={setState}/>}
           </div>
        </div>
    )
}