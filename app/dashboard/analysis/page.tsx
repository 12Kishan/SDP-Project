"use client"
import React from "react";
import UservsMonth from "./Charts/UservsMonth";
import QuizvsMonth from "./Charts/QuizesvsMonth";
import { DashboardLayout } from "../Layout";
import Content from "@/app/components/dbComponents/Content"

function Analysis() {



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