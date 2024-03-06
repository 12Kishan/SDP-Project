import { DashboardLayout } from "@/app/dashboard/Layout";
import { QuizUsers } from "@/app/model/quiz_user";
import { User } from "@/app/model/user";
import Link from "next/link";
import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

type Props = {
    params: {
        userId: string;
        quizId: string;
    };
    searchParams: any;
};
const QuizUserList = async ({ params }: Props) => {

    const usersid = await QuizUsers.find(
        { quizId: params.quizId },
        { userId: 1 }
    );

    const userIds = usersid.map((user) => user.userId);
    const userData = await User.find({ _id: { $in: userIds } });

    return (
        <DashboardLayout title='Quiz Reponses'>
            <div className="rounded-3xl bg-gray-800 p-6 lg:w-full lg:h-full">
                <div className="bg-gray-900 mx-28 rounded-3xl px-7 py-7">
                    <div className="gap-x-4 flex text-white ">
                        <Link
                            href={"/dashboard/history"}
                            className="bg-gray-800 p-2 gap-x-2 flex users-center justify-center rounded-xl hover:bg-gray-700"
                        >
                            <div className="flex justify-center items-center">
                                <IoMdArrowRoundBack className="mr-2 h-4 md:h-4 lg:h-5  w-4 md:w-4 lg:w-5" />
                                <div className="text-xs md:text-base lg:text-lg">Back</div>
                            </div>
                        </Link>
                        <div className="text-lg md:text-2xl lg:text-3xl font-extrabold">
                            Quiz Participants
                        </div>
                    </div>
                    <div className="text-white flex-row">
                        <div className="bg-gray-700 p-3 rounded-md mt-3">
                            <div className="justify-between flex p-1 my-2 font-bold">
                                <div>Name</div>
                                <div>For more details</div>
                            </div>

                            {userData.map((user, index) => (
                                <div key={user._id} className="bg-gray-900 rounded-lg">
                                    <div className="justify-between flex p-2 text-center rounded-md mt-3">
                                        <div className="h-full mt-2 flex justify-center items-center">
                                            <div className="mr-3">{index + 1}</div>
                                            <div>
                                                {user.name}
                                            </div>
                                        </div>
                                        <Link
                                            href="/statistics/[userId]/[quizId]"
                                            as={`/statistics/${user.id}/${params.quizId}`}
                                            className="hover:bg-gray-700 p-2 rounded-md bg-gray-800"
                                        >
                                            <div className="flex justify-center items-center">
                                                <div className="mr-2">details</div>
                                                <IoIosArrowForward />
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            ))}


                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default QuizUserList;