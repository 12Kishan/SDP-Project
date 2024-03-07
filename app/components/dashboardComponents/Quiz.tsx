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
  Center
} from '@chakra-ui/react'
import Link from 'next/link';

function Quiz() {
  return (
    <>
        <Grid
          templateRows='repeat(2, 1fr)'
          templateColumns='repeat(1, 1fr)'
          gap={30}
        >
          <GridItem className='h-fit'>
            <Center>
              <Card align={'center'} className='border-2 rounded-md w-full mx-5 md:mx-15 lg:mx-28 gap-4 py-3 shadow-xl'>
                <CardHeader className='font-extrabold text-white'>
                  <Heading size='md' className='text-start text-md md:text-lg lg:text-2xl font-extrabold text-white mx-8'>Trending topics</Heading>
                </CardHeader>
                <CardBody className='w-full text-white'>
                  <Stack divider={<StackDivider />} className='mx-8' spacing='4'>
                    <Box className='flex justify-between'>
                      <Heading size='xs'>
                        topic 1
                      </Heading>
                      {/* <Text>
                        70%
                      </Text> */}
                    </Box>
                    <Box>
                      <Heading size='xs'>
                        topic 2
                      </Heading>
                    </Box>
                  </Stack>
                </CardBody>
              </Card>
            </Center>
          </GridItem>
          <GridItem className='h-fit'>
            <Center>
              <Card
                className='border-2 shadow-xl rounded-md px-2 mx-5 md:mx-15 lg:mx-28 gap-4 py-3'>
                <CardHeader className='font-extrabold text-white'>
                  <Heading size='md' className='text-start text-md md:text-lg lg:text-2xl font-extrabold text-white mx-8'>Generate Quizzes using AI!</Heading>
                </CardHeader>
                <CardBody className='lg:flex md:flex items-center'>
                  <Text className='text-start text-white font-normal py-2 mx-8'>
                    Just give the name of topic, number of questions, set questions types, and select difficulty level to generate quiz using AI.
                  </Text>
                  <Link href='/dashboard/quiz' className="mt-1 mx-8 block px-3 rounded-full py-3 text-white font-bold bg-gray-900 border-solid border-2 hover:bg-white hover:text-white mb-1 sm:ml-2 dm:mt-5 text-center">
                    Generate quiz
                  </Link>
                </CardBody>
              </Card>
            </Center>
          </GridItem>
        </Grid>
    </>
  )
}

export default Quiz