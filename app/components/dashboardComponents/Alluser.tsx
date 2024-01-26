import { notFound } from "next/navigation";
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
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import Link from "next/link";


function User() {

  //const router = useRouter();

  const [usersData, setusersData] = useState([
    {
      name: "",
      isAdmin: false,
      email: "",
      _id: "",
    },
  ]);

  const displaySuccessToast = (str: String) => {
    toast.success(str, {
      position: toast.POSITION.BOTTOM_LEFT,
    });
  };

  const removeUser = async (_id: String) => {
    const res = await fetch(`/api/users/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = res.json();
    if (res.status == 200) {
      console.log("user is deleted");
      displaySuccessToast("user is deleted");
    } else {
      console.log("user not deleted");
    }
  };

  const promoteToAdmin = async (userId: String) => {
    const res = await fetch(`/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isAdmin: true }),
    });
  };

  const fetcher = async (url: String) => {};

  const fetchdata = useCallback(async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setusersData(data);
  }, []);

  useEffect(() => {
    console.log("useEffect called");
    fetchdata().catch(console.error);
  }, [fetchdata]);

  const items = usersData.map((item) =>
    !item.isAdmin ? (
      <Accordion
        key={item._id}
        defaultIndex={[1]}
        allowMultiple
        className="shadow-xl border-2 rounded-md my-2"
      >
        <AccordionItem>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left" className="p-3">
              {item.name}
            </Box>
            <AccordionIcon className="mr-2" />
          </AccordionButton>
          <AccordionPanel>
            <Grid as="span" flex="1" className="p-3">
              <GridItem>
                <Text>email : {item.email}</Text>
              </GridItem>
              <GridItem className="mt-3">
             
              <Link href={`/userDetails/${item._id}`} passHref>
              <Button
                as="a"
                m={"lg"}
                className='mt-1 mx-2 block px-2 py-3 text-white font-bold bg-gray-900 rounded-full  border-solid border-2 hover:bg-white hover:text-gray-900 mb-1 sm:ml-2 dm:mt-5 text-center'
                //onClick={() => router.push(`/userDetails/${item._id}`)}
              >
                {" "}
                Details
              </Button>
              </Link>
                
                <Button
                  m={"lg"}
                  className="mt-1 mx-2 block px-2 py-3 text-red-700 font-bold bg-gray-900 rounded-full  border-solid border-2 hover:bg-white hover:text-gray-900 mb-1 sm:ml-2 dm:mt-5 text-center"
                  onClick={() => {
                    removeUser(item._id).then(() => {
                      fetchdata();
                    });
                  }}
                >
                  {" "}
                  Remove user{" "}
                </Button>
                <Button
                  m={"lg"}
                  className="mt-1 mx-2 block px-2 py-3 text-green-700 font-bold rounded-full bg-gray-900 border-solid border-2 hover:bg-white hover:text-gray-900 mb-1 sm:ml-2 dm:mt-5 text-center"
                  onClick={() => {
                    promoteToAdmin(item._id).then(() => {
                      fetchdata();
                    });
                  }}
                >
                  {" "}
                  Promote to admin{" "}
                </Button>
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
    <div>
      <div>{items}</div>
    </div>
  );
}

export default User;
