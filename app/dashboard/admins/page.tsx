"use client"
import React from "react";
import { useCallback, useEffect, useState } from "react";
import {
  Grid,
  GridItem,
  Text,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import { DashboardLayout } from "../Layout";
import Loader from "@/app/components/Loader";


function User() {

  const [usersData, setusersData] = useState([
    {
      name: "",
      isAdmin: false,
      email: "",
      _id: "",
    },
  ]);

  const [loading,setloading] = useState(true);
  const fetcher = async (url: String) => {};

  const fetchdata = useCallback(async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setusersData(data);
  }, []);

  useEffect(() => {
    fetchdata().catch(console.error);
    setloading(false);
  }, [fetchdata]);

  const items = usersData.map((item) =>
    item.isAdmin ? (
      <Accordion
      
        key={item._id}
        defaultIndex={[1]}
        allowMultiple
        className="shadow-xl bg-gray-600 text-white rounded-md my-2"
      >
        <AccordionItem>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left" className="p-3 text-xs md:text-base lg:text-lgitems-center">
              {item.name}
            </Box>
            <AccordionIcon className="mr-2" />
          </AccordionButton>
          <AccordionPanel>
            <Grid as="span" flex="1" className="p-3">
              <GridItem>
                <Text className="text-xs md:text-base lg:text-lgitems-center">email : {item.email}</Text>
              </GridItem>
              <GridItem className="mt-3">
             
              </GridItem>
            </Grid>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    ) : (
      <></>
    )
  );

  return (


    <DashboardLayout title='Admins'>
      {loading && <Loader />}
      {!loading && <div className="">
      <div>{items}</div>
    </div>}
    </DashboardLayout>

  );
}

export default User;
