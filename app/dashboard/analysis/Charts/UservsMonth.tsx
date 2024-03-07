import React, { useEffect, useState, useCallback } from "react";
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import { useSession } from "next-auth/react";
import { CategoryScale } from 'chart.js'; 
Chart.register(CategoryScale);

interface UserData {
    isAdmin: boolean;
    date: Date;
}

export default function UservsMonth() {
    const [usersData, setusersData] = useState<UserData[]>([
        {
            isAdmin: false,
            date: new Date(),
        },
    ]);

    const fetchdata = useCallback(async () => {
        const res = await fetch("/api/users");
        const data = await res.json();
        const parsedData: UserData[] = data.map((item:any) => ({
            ...item,
            date: new Date(item.date),
        }));
        setusersData(parsedData);
    }, []);

    useEffect(() => {
        fetchdata().catch(console.error);
    }, [fetchdata]);

    // Function to convert month number to month name
    const convertToMonthName = (month: number): string => {
        const monthNames = [
            "January", "February", "March", "April",
            "May", "June", "July", "August",
            "September", "October", "November", "December"
        ];
        return monthNames[month];
    };

    // Process and display the data
    const now = new Date();
    const fourMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 4, now.getDate());

    const monthCounts = usersData.reduce((acc, item) => {
        if (item.date >= fourMonthsAgo) {
            const month = item.date.getMonth();
            const year = item.date.getFullYear();
            const key = `${convertToMonthName(month)}-${year}`;
            acc[key] = (acc[key] || 0) + 1;
        }
        return acc;
    }, {} as Record<string, number>);

    const labels = Object.keys(monthCounts);
    const data = Object.values(monthCounts);

    return (
        <>
            <h1 className="text-xl font-bold text-white ml-8 mt-8">Users</h1>
            <Bar 
                data={{
                    labels: labels,
                    datasets: [
                        {
                            label: "Users",
                            data: data,
                            borderRadius: 5,
                            backgroundColor: ["blue", "red"]
                        },
                    ],
                }}
                options={{
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Month-Year'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Number of Users'
                            }
                        }
                    }
                }}
            />
        </>
    );
}
