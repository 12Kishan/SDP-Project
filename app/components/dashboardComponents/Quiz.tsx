import React, { useState } from "react";
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
import Link from "next/link";
import { connect } from "@/app/database/mongo.config";

connect();
import { Quiz } from "@/app/model/quiz";

async function Quizes() {
  const trendingTopics = await Quiz.aggregate([
    { $project: { topic: { $toUpper: "$topic" } } },
    { $group: { _id: "$topic", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 5 },
  ]);

  // Store the trending topics in a constant

  // You can perform further operations with storedTrendingTopics if needed

  // useEffect(()=>{
  //   async function trandingtopic(){
  //     const response = await axios.get("/api/quiz/trandingquiz");
  //     console.log(response);
  //     settrandingTopic(response.data.trendingTopics);
  //     console.log(trandingTopic)
  //   }
  //   trandingtopic();
  //   },[])

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
              className="border-2 rounded-md w-full mx-5 md:mx-15 lg:mx-28 gap-4 py-3 shadow-xl"
            >
              <CardHeader className="font-extrabold text-white">
                <Heading
                  size="md"
                  className="text-start text-md md:text-lg lg:text-2xl font-extrabold text-white mx-8"
                >
                  Trending topics
                </Heading>
              </CardHeader>
              <CardBody className="w-full text-white">
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
        <GridItem className="h-fit">
          <Center>
            <Card className="border-2 shadow-xl rounded-md px-2 mx-5 md:mx-15 lg:mx-28 gap-4 py-3">
              <CardHeader className="font-extrabold text-white">
                <Heading
                  size="md"
                  className="text-start text-md md:text-lg lg:text-2xl font-extrabold text-white mx-8"
                >
                  Generate Quizzes using AI!
                </Heading>
              </CardHeader>
              <CardBody className="lg:flex md:flex items-center">
                <Text className="text-start text-white font-normal py-2 mx-8">
                  Just give the name of topic, number of questions, set
                  questions types, and select difficulty level to generate quiz
                  using AI.
                </Text>
                <Link
                  href="/dashboard/quiz"
                  className="flex items-center text-center justify-center bg-gray-900 p-3 rounded-md hover:bg-gray-700 mr-5 text-white"
                >
                  Generate quiz
                </Link>
              </CardBody>
            </Card>
          </Center>
        </GridItem>
      </Grid>
    </>
  );
}

export default Quizes;
