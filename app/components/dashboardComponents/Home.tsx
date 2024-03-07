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
    <div className='pt-3'>
      <Grid
        templateRows='repeat(2, 1fr)'
        templateColumns='repeat(1, 1fr)'
        gap={30}
      >
        <GridItem className='h-fit'>
          <Center>
            <Card align='center' className='border-2 rounded-md w-full mx-5 md:mx-15 lg:mx-28 gap-4 py-3 shadow-xl'>
              <CardHeader className='font-extrabold text-white'>
                <Heading className='text-center text-xl md:text-2xl lg:text-4xl'>Hey, {data?.user?.name}..!</Heading>
              </CardHeader>
              <CardBody className='flex px-3 justify-center items-center'>
                <Text className='text-center text-white text-sm md:text-base lg:text-l font-medium py-2'>Welcome to QuizBee, your personalized quiz companion! With QuizBee, you take the lead in shaping your learning experience. You just have to insert your favorite topic.
                </Text>
              </CardBody>
              <CardFooter>
                <Text className='font-semibold text-sm md:text-base lg:text-l px-2 text-white text-center'>Use QuizBee now and experience the future of interactive and intelligent quizzing!</Text>
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
              <span className="hidden md:mt-0  md:col-span-5 md:flex lg:mt-0 lg:col-span-5 lg:flex">
                <Image
                  objectFit='fill'
                  height={'200px'} width={'200px'}
                  src='/thinking.jpg'
                  alt='thinkig brain'
                />
              </span>
              <Stack>
                <CardBody>
                  <Heading className='text-start mb-8 text-md md:text-lg lg:text-2xl font-extrabold text-white'>But why i should generate quiz using AI?</Heading>

                  <Text className='text-start text-sm md:text-base lg:text-l font-medium text-white'>
                    - Diverse & Personalized quiz<br />
                    - Efficiency<br />
                    - Rapid quiz Generation in short time<br />
                  </Text>
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


/*
<Grid
      templateRows='repeat(2, 1fr)'
      templateColumns='repeat(1, 1fr)'
      gap={30} 
    >
      <GridItem className='h-fit'>
        <div className="flex items-center justify-center">
          <Card align='center' className='border-1 rounded-md w-full mx-28 gap-4 py-3'>
            <CardHeader className='text-4xl font-extrabold text-white'>
              <Heading size='md'>Hey, {data?.user?.name}..!</Heading>
            </CardHeader>
            <CardBody className='flex px-3 justify-center items-center'>
              <Text className='text-center text-white font-medium py-2' fontSize={{ base: "24px", md: "40px", lg: "56px" }}>Welcome to QuizBee, your personalized quiz companion! With QuizBee, you take the lead in shaping your learning experience. You just have to insert your favorite topic.
              </Text>
            </CardBody>
            <CardFooter>
              <Text className='font-semibold text-white'>Use QuizBee now and experience the future of interactive and intelligent quizzing!</Text>
            </CardFooter>
          </Card>
        </div>
      </GridItem>

      <GridItem className='h-fit'>
        <div className="flex items-center justify-center">
          <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
            className='border-1 rounded-md px-2 mx-28 w-full gap-4 py-3'
          >
            <Image
              objectFit='fill'
              maxW={{ base: '100%', sm: '200px' }}
              src='/thinking.jpg' height={200} width={200}
              alt='thinkig brain'
            />

            <Stack>
              <CardBody>
                <Heading size='md' className='font-extrabold text-white text-3xl'>But why i should generate quiz using AI?</Heading>

                <Text py='2' className='text-start font-semibold text-white'>
                  - Diverse & Personalized quiz<br />
                  - Efficiency<br />
                  - Rapid quiz Generation in short time<br />
                </Text>
              </CardBody>
            </Stack>
          </Card>
        </div>
      </GridItem>
    </Grid>
*/


/*
<Grid
      templateRows='repeat(2, 1fr)'
      templateColumns='repeat(1, 1fr)'
      gap={30}
    >
      <GridItem className='h-fit'>
        <Center>
          <Card align='center' className='border-1 rounded-md w-full mx-28 gap-4 py-3'>
            <CardHeader className='text-4xl font-extrabold text-white'>
              <Heading size='md' className='text-center'>Hey, {data?.user?.name}..!</Heading>
            </CardHeader>
            <CardBody className='flex px-3 justify-center items-center'>
              <Text className='text-center text-white font-medium py-2' fontSize={{ base: "24px", md: "40px", lg: "56px" }}>Welcome to QuizBee, your personalized quiz companion! With QuizBee, you take the lead in shaping your learning experience. You just have to insert your favorite topic.
              </Text>
            </CardBody>
            <CardFooter>
              <Text className='font-semibold text-white text-center'>Use QuizBee now and experience the future of interactive and intelligent quizzing!</Text>
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
            className='border-1 rounded-md px-2 mx-28 w-full gap-4 py-3'
          >
            <Image
              objectFit='fill'
              height={'200px'} width={'200px'}
              src='/thinking.jpg'
              alt='thinkig brain'
            />

            <Stack>
              <CardBody>
                <Heading size='md' className='font-extrabold text-white text-3xl'>But why i should generate quiz using AI?</Heading>

                <Text py='2' className='text-start font-semibold text-white'>
                  - Diverse & Personalized quiz<br />
                  - Efficiency<br />
                  - Rapid quiz Generation in short time<br />
                </Text>
              </CardBody>
            </Stack>
          </Card>
        </Center>
      </GridItem>
    </Grid>
*/