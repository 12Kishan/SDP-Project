"use client";
import { useCallback, useEffect, useState } from "react";
import { User } from "@/app/model/user";

import Link from "next/link";
import { Button, Box } from "@chakra-ui/react";
import { DashboardLayout } from "@/app/dashboard/Layout";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast,{Toaster} from "react-hot-toast";

type props = {
  params: {
    userId: string;
  };
};

const Userinfo = ({ params: { userId } }: props) => {

  const router = useRouter();
  const { data } = useSession();
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
    const res = await fetch(`/api/quiz/${userId}`);
    const data = await res.json();
    setquizesData(data);
  }, []);

  const fetchuserdata = useCallback(async () => {
    const res = await fetch(`/api/users/${userId}`);
    const data = await res.json();
    setuser(data);
  }, []);

  useEffect(() => {
    if(data?.user.isAdmin)
    {
      fetchquizdata().catch(console.error);
      fetchuserdata().catch(console.error);
    }
    else
    {
      return router.push('/dashboard')
    }
    }, [fetchquizdata, fetchuserdata]);
    useEffect(()=>{
if(!data?.user.isAdmin)
{
  return router.push('/dashboard')
}
    },[])

  const removequiz = async (_id: String) => {
    const res = await fetch(`/api/quiz/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status == 200) {
    
      displaySuccessToast("quiz deleted");
    } else {
   
      displayErrorToast("quiz is not deleted");
    }
  };

  const displayErrorToast = (str: string) => {
    toast.error(str, {
        style: {
            border: '2px solid #111827',
            padding: '16px',
            color: '#fff',
            background: 'red'
        },
        iconTheme: {
            primary: 'white',
            secondary: 'red',
        },
    })
}
const displaySuccessToast = (str: string) => {
  toast.success(str, {
      style: {
          border: '2px solid #111827',
          padding: '16px',
          color: '#fff',
          background: 'green'
      },
      iconTheme: {
          primary: 'white',
          secondary: 'green',
      },
  })
}

  const item = quizData.map((item) => (
    <>
      <div className="shadow-xl text-xs md:text-base lg:text-lgitems-center bg-gray-800 rounded-md text-white gap-3 m-3">
        <Box
          key={item._id}
          as="span"
          textAlign="left"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <div className="text-xl px-3">{item.topic}</div>
          <div>
            <Link href={`/statistics/${userId}/${item._id}`}>
              <Button
                className="my-2 mx-3 text-xs md:text-base lg:text-lgitems-center text-white justify-center gap-x-2 bg-gray-900 p-2 rounded-md hover:bg-gray-700"
                onClick={() => {
                  removequiz(item._id).then(() => {
                    fetchquizdata();
                  });
                }}
              >
                details
              </Button>
            </Link>
            <Button
              className="my-2 mx-3 text-xs md:text-base lg:text-lgitems-center text-red-500 justify-center gap-x-2 bg-gray-900 p-2 rounded-md hover:bg-gray-700"
              onClick={() => {
                removequiz(item._id).then(() => {
                  fetchquizdata();
                });
              }}
            >
              Remove quiz
            </Button>
          </div>
        </Box>
      </div>
    </>
  ));

  const removeUser = async (_id: String) => {
    const res = await fetch(`/api/users/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = res.json();
    if (res.status == 200) {
      
      displaySuccessToast("user is deleted");
    } else {
      
      displayErrorToast("user not deleted")
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

  return (
    <DashboardLayout title="Users Details">
      <div className="bg-gray-800 rounded-lg p-4 m-4">
        <div className="flex items-center justify-between text-white  rounded-lg">
          <div className="gap-x-4 flex text-white">
            <Link
              href={"/dashboard/users"}
              className="bg-gray-900 p-2 gap-x-2 flex users-center justify-center rounded-xl hover:bg-gray-700"
            >
              <div className="flex justify-center items-center">
                <IoMdArrowRoundBack className="mr-2 h-4 md:h-4 lg:h-5  w-4 md:w-4 lg:w-5" />
                <div className="text-xs md:text-base lg:text-lg">Back</div>
              </div>
            </Link>
            <div className="text-lg md:text-2xl lg:text-3xl font-extrabold">
              {user.name}
            </div>
          </div>
          <div className="text-right gap-3">
            <Link href="/dashboard">
              <Button
                m={"lg"}
                className="mt-3 mr-3 text-xs md:text-base lg:text-lgitems-center text-red-500 justify-center gap-x-2 bg-gray-900 p-2 rounded-md hover:bg-gray-700"
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
                className=" mt-3 text-xs md:text-base lg:text-lgitems-center text-green-500 justify-center gap-x-2 bg-gray-900 p-2 rounded-md hover:bg-gray-700"
                onClick={() => {
                  promoteToAdmin(userId);
                }}
              >
                Promote to admin
              </Button>
            </Link>
          </div>
        </div>
        <div className="mt-3 bg-gray-900 p-3 rounded-md">
          {/* Display user details and quizzes as needed */} {item}
        </div>
      </div>
      <Toaster
                position="top-right"
                reverseOrder={false}
            />
    </DashboardLayout>
  );
};
export default Userinfo;
