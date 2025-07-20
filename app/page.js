"use client"

import Image from "next/image";
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { redirect } from "next/navigation";


export default function Home() {
  useEffect(() =>{
      redirect('/api/auth/login?post_login_redirect_url=/dashboard')
  }, []);

  return (
    
    <div>
       
    </div>

  
  )
};