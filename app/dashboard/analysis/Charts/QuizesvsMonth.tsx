import React, { useEffect, useState, useCallback } from "react";
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js'; 
Chart.register(CategoryScale);

interface QuizData {
    timeStarted: Date;
}

export default function UservsMonth() {
    const [usersData, setusersData] = useState<QuizData[]>([
        {
            timeStarted: new Date(),
        },
    ]);

    const fetchdata = useCallback(async () => {
        const res = await fetch("/api/quiz");
        const data = await res.json();
        const parsedData: QuizData[] = data.map((item:any) => ({
            ...item,
            timeStarted: new Date(item.timeStarted),
        }));
        setusersData(parsedData);
    }, []);

    useEffect(() => {
        fetchdata().catch(console.error);
    }, [fetchdata]);

    function convertToMonthName(month: number): string {
        const monthNames = [
            "January", "February", "March", "April",
            "May", "June", "July", "August",
            "September", "October", "November", "December"
        ];
        return monthNames[month];
    }

    // Calculate the date four months ago
    const now = new Date();
    const fourMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 4, now.getDate());

    // Filter the data to include only the last 4 months
    const filteredData = usersData.filter(item => item.timeStarted >= fourMonthsAgo);

    // Process and display the data
    const monthCounts = filteredData.reduce((acc, item) => {
        const month = item.timeStarted.getMonth();
        const year = item.timeStarted.getFullYear();
        const key = `${convertToMonthName(month)}-${year}`;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const labels = Object.keys(monthCounts);
    const data = Object.values(monthCounts);

    return (
        <>
            <h1 className="text-xl font-bold text-white">Quizzes</h1>
            <Bar 
                data={{
                    labels: labels,
                    datasets: [
                        {
                            label: "Quizzes",
                            data: data,
                            borderRadius: 5,
                            backgroundColor: ["green", "red"]
                        },
                    ],
                }}
            />
        </>
    );
}
