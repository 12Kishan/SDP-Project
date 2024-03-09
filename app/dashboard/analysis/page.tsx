"use client"
import React,{useEffect} from "react";
import UservsMonth from "./Charts/UservsMonth";
import QuizvsMonth from "./Charts/QuizesvsMonth";
import { DashboardLayout } from "../Layout";
import Content from "@/app/components/dbComponents/Content"
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";


function Analysis() {

  const router = useRouter();
  const { data } = useSession();
  useEffect(()=>{
    if(!data?.user.isAdmin)
    {
      return router.push('/dashboard')
    }
    },[])


  return (

    <DashboardLayout title='Analysis'>
      {/* <Content title="Charts" /> */}

    <div className="flex-row">
      <div className="justify-center items-center h-52 md:h-72 lg:h-80 xl:h-100">
        <UservsMonth/>
      </div>
      <div className="justify-center items-center h-52 md:h-72 lg:h-80 xl:h-100 mt-5">
        <QuizvsMonth/>
      </div>
    </div>
    </DashboardLayout>
  );
}

export default Analysis;