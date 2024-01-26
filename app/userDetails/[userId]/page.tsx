"use client";
import { useCallback, useEffect, useState } from "react";
import { User } from "@/app/model/user";

import Link from "next/link";
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

type props = {
  params: {
    userId: string;
  };
};
const Userinfo = ({ params: { userId } }: props) => {
  const [quizData, setquizesData] = useState([
    {
      _id: "",
      userId: "",
      timeStarted: "",
      topic: "",
    },
  ]);
  const [user, setuser] = useState({
    name: "",
  });

  const fetchquizdata = useCallback(async () => {
    const res = await fetch(`/api/quizes/${userId}`);
    const data = await res.json();
    setquizesData(data);
  }, []);

  const fetchuserdata = useCallback(async () => {
    const res = await fetch(`/api/users/${userId}`);
    const data = await res.json();
    setuser(data);
  }, []);

  useEffect(() => {
    console.log("useEffect called");
    fetchquizdata().catch(console.error);
    fetchuserdata().catch(console.error);
  }, [fetchquizdata,fetchuserdata]);

  const removequiz = async (_id: String) => {
    const res = await fetch(`/api/quizes/deletequiz/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status == 200) {
      console.log("quiz is deleted");
    } else {
      console.log("quiz not deleted");
    }
  };

  const item = quizData.map((item) =>
      <h1 
      key={item._id}
      className="shadow-xl border-2 rounded-md">
        <Box
          as="span"
          textAlign="left"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <div className="text-xl">{item.topic}</div>
          <Button
            className="mx-2 block align-bottom px-2 py-3 text-red-700 font-bold bg-gray-900 rounded-full border-solid border-2 hover:bg-white hover:text-gray-900 sm:ml-2 dm:mt-5 text-center"
            onClick={() => {
              removequiz(item._id).then(() => {
                fetchquizdata();
              });
            }}
          >
            Remove quiz
          </Button>
        </Box>
      </h1>
  )

  // const fetuser = useCallback(async () => {
  //   const res = await fetch(`/api/users/${userId}`, { method: "GET" });
  //   const data = await res.json();
  //   if (Array.isArray(data)) {
  //     setuser(data);
  //   }
  //  }, []);

  // useEffect(() => {
  //   console.log("useeffect calles");
  //   fetuser().catch(console.error);
  // }, [fetuser]);

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

  //const user=User.findOne({_id:userId});
  console.log(user);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold mt-3">Name : {user.name}</div>
        <div className="text-right">
          <Link href="/dashboard">
            <Button
              m={"lg"}
              className="mt-1 mx-2 block px-2 py-3 text-red-700 font-bold bg-gray-900 rounded-full border-solid border-2 hover:bg-white hover:text-gray-900 mb-1 sm:ml-2 dm:mt-5 text-center"
              onClick={() => {
                removeUser(userId);
              }}
            >
              Remove user
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button
              m={"lg"}
              className="mt-1 mx-2 block px-2 py-3 text-green-700 font-bold bg-gray-900 rounded-full border-solid border-2 hover:bg-white hover:text-gray-900 mb-1 sm:ml-2 dm:mt-5 text-center"
              onClick={() => {
                promoteToAdmin(userId);
              }}
            >
              Promote to admin
            </Button>
          </Link>
        </div>
      </div>
      {/* Display user details and quizzes as needed */} {item}
      <div className="flex justify-center items-center mt-4 ">
        <Link href="/dashboard" className="text-center">
          <button className="mt-1 mx-2 block px-2 py-3 text-white font-bold bg-gray-900 rounded-full border-solid border-2 hover:bg-white hover:text-gray-900 sm:ml-2 dm:mt-5 text-center">
            Back
          </button>
        </Link>
      </div>
    </div>
  );
};
export default Userinfo;
