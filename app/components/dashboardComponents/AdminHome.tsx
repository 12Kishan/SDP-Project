'use client';

import { useSession } from 'next-auth/react'
import React from 'react'
import {
  Center,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Stack,
  Grid,
  GridItem
} from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'


function Home() {

  const { data } = useSession()

  return (<>
    <div className='pt-5 md:pt-20 lg:pt-30 h-screen overflow-y-scroll'>
      <Grid
        templateRows='repeat(2, 1fr)'
        templateColumns='repeat(1, 1fr)'
        gap={30}
      >
        <GridItem className='h-fit'>
          <Center>
            <Card align='center' className='border-2 rounded-md w-full mx-5 md:mx-15 lg:mx-28 gap-4 py-3 shadow-xl'>
              <CardHeader className='font-extrabold text-gray-900'>
                <Heading className='text-center text-xl md:text-2xl lg:text-4xl'>Hello, {data?.user?.name}..!</Heading>
              </CardHeader>
              <CardBody className='flex px-3 justify-center items-center'>
                <Text className='text-center text-gray-900 text-sm md:text-base lg:text-l font-medium py-2'>Welcome to QuizBee, your central hub for seamless management of AI-driven quizzes. With an intuitive interface, QuizBee streamlines the process, making quiz effortlessly efficient and user-friendly.
                </Text>
              </CardBody>
              <CardFooter>
                <Text className='font-semibold text-sm md:text-base lg:text-l px-2 text-gray-900 text-center'>QuizBee collects user data for analysis, generating detailed reports with insightful graphs for informed decision-making based on accurate information.</Text>
              </CardFooter>
            </Card>
          </Center>
        </GridItem>

      <GridItem className='h-fit'>
          <Center>
            <Card
              direction={{ base: 'row', sm: 'column' }}
              overflow='revert'
              variant='outline'
              className='border-2 shadow-xl rounded-md px-2 mx-5 md:mx-15 lg:mx-28 w-full flex items-center gap-4 py-3'
            >
              {/* <span className="hidden md:mt-0  md:col-span-5 md:flex lg:mt-0 lg:col-span-5 lg:flex">
                <Image
                  objectFit='fill'
                  height={'200px'} width={'200px'}
                  src='/thinking.jpg'
                  alt='thinkig brain'
                />
              </span> */}
              <Stack>
                <CardBody>
                  <CardHeader className='justify-center items-center'>
                  <Heading className='text-center justify-center mb-8 text-md md:text-lg lg:text-2xl font-extrabold text-gray-900'>What is provided to the admin?</Heading>
                  </CardHeader>
                  <CardBody>
                  <Text className='text-start ml-4 text-sm md:text-base lg:text-l font-medium text-gray-900'>
                    - User Details<br />
                    - Analysis<br />
                    - Easy to manage<br />
                  </Text>
                  </CardBody>
                </CardBody>
              </Stack>
            </Card>
          </Center>
        </GridItem> 
      </Grid>
    </div>
  </>
  )
}

export default Home
