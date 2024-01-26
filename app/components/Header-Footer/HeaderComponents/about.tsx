
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Button,
    Card,
  } from '@chakra-ui/react'

  export default function Service(){
    return(
        <Menu>

            <MenuButton className="mt-1 mx-2 block px-2 py-3 text-white font-semibold rounded hover:bg-gray-800 sm:mt-0 sm:ml-2" >
            About
            </MenuButton>


        <MenuList  minWidth={250} maxWidth={400}>
            <Card className="bg-white text-gray-900 shadow-xl rounded-xl m-3 p-3">
           
                <h1 className='text-center font-bold text-2xl m-2'>About As</h1>
                <hr/>
                <h4 className='font-bold mt-2'>Our Vision</h4>
                <p className='mt-1'>Empowering Minds Through Intelligent Quizzing</p>
                <h4 className='font-bold mt-2'>Who We Are</h4>
                <p className='mt-1'>QuizBee is a passionate team of developers, educators, and AI enthusiasts dedicated to transforming the learning experience. We blend cutting-edge technology with pedagogical expertise to bring you an adaptive and engaging quiz app.</p>
                <h4 className='font-bold mt-2'>Join Us on the Learning Journey</h4>
                <p className='mt-1'>QuizBee invites you to a dynamic learning adventure that goes beyond the ordinary. Whether you&#39;re a student, professional, or lifelong learner, we&#39;re here to inspire, challenge, and support your educational aspirations.</p>
                <p className='font-bold text-center mt-2'>Thank you for being a part of QuizBee!</p>
            </Card>
        </MenuList>
</Menu>
    )
  }





