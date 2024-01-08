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
} from '@chakra-ui/react'
import Link from 'next/link';

function Quiz() {
  return (
    <>
      <div className="flex justify-center">
        <Card className='border-2 rounded-md sm:mt-2 sm:mx-28 mx-4 w-full gap-4 py-3'>
          <CardHeader className='text-2xl font-extrabold text-gray-900'>
            <Heading size='md' className='text-start font-bold text-gray-900 mx-8 my-2'>Trending topics</Heading>
          </CardHeader>
          <CardBody>
            <Stack divider={<StackDivider />} className='mx-8' spacing='4'>
              <Box>
                <Heading size='xs'>
                  Summary
                </Heading>
              </Box>
              <Box>
                <Heading size='xs'>
                  Summary
                </Heading>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </div>
      <div className="flex justify-center mt-7">
        <Card align='left' className='border-2 rounded-md sm:mt-2 sm:mx-28 mx-4 w-full gap-4 py-3'>
          <CardHeader className='text-2xl font-extrabold text-gray-900'>
            <Heading size='md' className='text-start font-bold text-gray-900 mx-8 my-2'>Generate Quizzes using AI!</Heading>
          </CardHeader>
          <CardBody className='flex items-center'>
            <Text className='text-start text-gray-900 font-normal py-2 mx-8'>
              Just give the name of topic and select number of questions to generate quiz
            </Text>
            <Link href='/dashboard/quiz' className="mt-1 mx-8 block px-3 rounded-full py-3 text-white font-bold bg-gray-900 border-solid border-2 hover:bg-white hover:text-gray-900 mb-1 sm:ml-2 dm:mt-5 text-center">
              Generate quiz
            </Link>
          </CardBody>
          <CardFooter className='flex'>
            {/* <Link href='/dashboard/' className="mt-1 mx-8 block px-5 py-3 text-white font-bold bg-gray-900 border-solid border-2 hover:bg-white hover:text-gray-900 mb-1 sm:ml-2 dm:mt-5 text-center">Generate quiz</Link> */}
          </CardFooter>
        </Card>
      </div>
    </>
  )
}

export default Quiz

/*<Card align='center' className='border-2 rounded-md mt-2 mx-28 mr-28 w-full gap-4 py-3'>
      <CardHeader>
        <Heading className='text-center'>Trending Topics</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing='4'>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Summary
            </Heading>
          </Box>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Overview
            </Heading>
          </Box>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Analysis
            </Heading>
          </Box>
        </Stack>
      </CardBody>
    </Card> */