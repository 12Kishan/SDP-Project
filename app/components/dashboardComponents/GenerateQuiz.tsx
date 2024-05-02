import Link from 'next/link'
import React from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  StackDivider,
  Box,
  Stack,
  Grid,
  GridItem,
  Center,
} from "@chakra-ui/react";

import { connect } from "@/app/database/mongo.config";

connect();
import { Quiz } from "@/app/model/quiz";


async function GenerateQuiz() {
  const trendingTopics = await Quiz.aggregate([
    { $project: { topic: { $toUpper: "$topic" } } },
    { $group: { _id: "$topic", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 5 },
  ]);

  return (
    <>
    <Grid
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(1, 1fr)"
        gap={30}
      >
     <GridItem className="h-fit">
          <Center>
            <Card
              align={"center"}
              className="rounded-lg w-full md:mx-15  gap-4 py-3 shadow-xl text-white md:flex lg:flex gap-x-5 bg-gray-900"
            >
              <CardHeader className="font-extrabold text-white">
                <Heading
                  size="md"
                  className="text-start text-md md:text-lg lg:text-2xl font-extrabold text-white mx-8"
                >
                  Trending topics
                </Heading>
              </CardHeader>
              <CardBody className="w-full text-white ">
                <Stack divider={<StackDivider />} className="mx-8" spacing="4">
                  {trendingTopics ? (
                    <>
                      {trendingTopics.map((obj, index) => (
                        <Box
                          className="flex justify-between"
                          key={`${obj._id}${index}`}
                        >
                          <Heading size="xs">{obj._id}</Heading>
                        </Box>
                      ))}
                    </>
                  ) : (
                    <>
                      <Box className="flex justify-between">
                        No topics available
                      </Box>
                    </>
                  )}
                </Stack>
              </CardBody>
            </Card>
          </Center>
        </GridItem>
        <GridItem>
      <div className='text-white md:flex lg:flex gap-x-5'>
        <div className='w-full'>
          <div className="mb-6 md:p-6 lg:p-8 md:pb-0 lg:mb-0 bg-gray-900 w-full rounded-2xl">
            <div className="p-4 bg-gray-800 rounded-lg">
              <div className="m-5 flex items-center justify-between">
                <div className="text-lg">Generate dynamic quizzes and share it to others</div>
                <Link href='/dashboard/share' className='flex items-center justify-center gap-x-2 bg-gray-900 p-4 rounded-md hover:bg-gray-700'>
                  <div className="">Generate quiz</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      </GridItem>
      </Grid>
    </>
  )
}

export default GenerateQuiz