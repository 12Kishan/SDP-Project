import React from 'react';
import { useEffect,useState,useCallback } from 'react';
import { User } from '../../model/user';
import { Bar } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js/auto';
import { useSession } from 'next-auth/react';
import { Chart } from "react-google-charts";

 function Analysis(){
  
  

  const addCountColumn = (matrix: string[][]) => {
    const countMap = new Map<string, number>();
  
    // Count occurrences of each [year, month] combination
    matrix.forEach(row => {
      const key = JSON.stringify(row); // Convert array to string for using as a map key
      countMap.set(key, (countMap.get(key) || 0) + 1);
    });
  
    // Create a new matrix with the count column, removing rows with undefined counts
    const matrixWithCount = matrix
      .map(row => {
        const key = JSON.stringify(row);
        const count = countMap.get(key);
        countMap.delete(key); // Remove the count entry to avoid duplicates
        return count !== undefined ? [...row, count] : null;
      })
      .filter((row): row is string[] & [number, number, number] => row !== null);
  
    return matrixWithCount;
  };
  
    
  const [usersData, setusersData] = useState([
    {
      name: "",
      isAdmin: false,
      date:"",
    },
  ]);

  const fetchdata = useCallback(async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setusersData(data);
  }, []);

  useEffect(() => {
    console.log("useEffect called")
    fetchdata().catch(console.error);
  }, [fetchdata]);
  
    const userdates= usersData.map((item) =>{return (item.date.split('T')[0].split('-'))});
   // console.log(usersData.map((item) =>{console.log(item.date.split('T')[0].split('-'))}));
   console.log(userdates); 
   console.log("this is upadates");
   const year = userdates.map(subArr => subArr[0]);
    const month= userdates.map(subarr => subarr[1]);

    console.log(year);
    console.log(month);

    const date=[year,month];
    const output = date[0].map((_, colIndex) => date.map(row => row[colIndex]));


    const matrixforchart = addCountColumn(output);
    console.log(matrixforchart);

    const Matrix = matrixforchart.map(row => row.slice(1));
    console.log("this is new matrix");
    console.log(Matrix);
    const title =["month","users"]
    console.log("this is final");
    const final = [title,...Matrix]
    console.log(final);

    const options = {
      chart: {
        title: "Company Performance",
        subtitle: "Sales, Expenses, and Profit: 2014-2017",
      },
    };



    return(
        <div>
          <Chart
      chartType="Bar"
      width="100%"
      height="400px"
      data={final}
      options={options}
    />
           
        </div>
    )

   
}

export default Analysis