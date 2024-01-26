import React from "react";
import { useEffect, useState, useCallback } from "react";
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';

import { useSession } from "next-auth/react";
import {CategoryScale} from 'chart.js'; 
Chart.register(CategoryScale);

export default function UservsMonth(){

    const [usersData, setusersData] = useState([
        {
          isAdmin: false,
          date: "",
        },
    ]);
    
    const fetchdata = useCallback(async () => {
       const res = await fetch("/api/users");
       const data = await res.json();
       setusersData(data);
    }, []);
    
    useEffect(() => {
       console.log("useEffect called");
       fetchdata().catch(console.error);
    }, [fetchdata]);

    function countMonthOccurrences(years: string[], months: string[]): { year: string; month: string; count: number }[] {
        const result: { year: string; month: string; count: number }[] = [];
    
        // Combine the year and month arrays into a single array of objects
        const combinedData = years.map((year, index) => ({ year, month: months[index] }));
    
        // Count occurrences of each unique year-month combination
        const counts = new Map<string, number>();
        const uniqueMonths = new Set<string>();
    
        combinedData.forEach(item => {
            const key = `${item.year}-${item.month}`;
            counts.set(key, (counts.get(key) || 0) + 1);
            uniqueMonths.add(item.month);
        });
    
        // Populate the result array with the count information and month names
        combinedData.forEach(item => {
            const key = `${item.year}-${item.month}`;
            const count = counts.get(key) || 0;
    
            if (uniqueMonths.has(item.month)) {
                result.push({ year: item.year, month: `${convertToMonthName(+item.month)}-${item.year}`, count });
                uniqueMonths.delete(item.month);
            }
        });
    
        return result;
    }
    
    function convertToMonthName(month: number): string {
        const monthNames = [
            "January", "February", "March", "April",
            "May", "June", "July", "August",
            "September", "October", "November", "December"
        ];
    
        if (month >= 1 && month <= 12) {
            return monthNames[month - 1];
        } else {
            return "Invalid month";
        }
    }


    const userdates = usersData.map((item) => {
        return item.date.split("T")[0].split("-");
    });

    const year = userdates.map((subArr) => subArr[0]);
    const month = userdates.map((subarr) => subarr[1]);

    const resultArray = countMonthOccurrences(year, month);
    const monthValues = resultArray.map(item => item.month);
    const userspermonth = resultArray.map(item=>item.count); 

    console.log(resultArray);
    console.log(monthValues);
    return (
        <>
        <h1>hello</h1>
        <Bar 
            data={{
                labels:monthValues,
                datasets:[
                    {
                        label:"user",
                        data:userspermonth,
                        borderRadius:5,
                        
                    },
                ],

            }}

        />
        </>
    )
};


