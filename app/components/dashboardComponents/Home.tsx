'use client';

import { useSession } from 'next-auth/react'
import React from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Stack,
} from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'


function Home() {

  const { data } = useSession()

  return (<>
    <div className="flex items-center justify-center">
      <Card align='center' className='border-2 rounded-md mt-2 mx-28 w-full gap-4 py-3'>
        <CardHeader className='text-4xl font-extrabold text-gray-900'>
          <Heading size='md'>Hey, {data?.user?.name}..!</Heading>
        </CardHeader>
        <CardBody className='flex px-3 justify-center items-center'>
          <Text className='text-center text-gray-900 font-medium py-2'>Welcome to QuizBee, your personalized quiz companion! With QuizBee, you take the lead in shaping your learning experience. You just have to insert your favorite topic.
          </Text>
        </CardBody>
        <CardFooter>
          <Text className='font-semibold text-gray-900'>Use QuizBee now and experience the future of interactive and intelligent quizzing!</Text>
        </CardFooter>
      </Card>
    </div>

    <div className="flex items-center justify-center mt-7">
      <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='outline'
        className='border-2 rounded-md mt-2 px-2 mx-28 w-full gap-4 py-3'
      >
        <Image
          objectFit='fill'
          maxW={{ base: '100%', sm: '200px' }}
          src='/thinking.jpg' height={200} width={200}
          alt='thinkig brain'
        />

        <Stack>
          <CardBody>
            <Heading size='md' className='font-extrabold text-gray-900 text-3xl mb-7'>But why i should generate quiz using AI?</Heading>

            <Text py='2' className='text-start font-semibold text-gray-900'>
              - Diverse & Personalized quiz<br/>
              - Efficiency<br/>
              - Rapid quiz Generation in short time<br/>
            </Text>
          </CardBody>
        </Stack>
      </Card>
    </div>
  </>
  )
}

export default Home