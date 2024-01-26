
import {
    Menu,
    MenuButton,
    MenuList,
    Card,
  } from '@chakra-ui/react'

  export default function Service(){
    return(
        <Menu>

            <MenuButton className="mt-1 mx-2 block px-2 py-3 text-white font-semibold rounded hover:bg-gray-800 sm:mt-0 sm:ml-2" >
            Contact
            </MenuButton>


        <MenuList  minWidth={250} maxWidth={400}>
            <Card className="bg-white text-gray-900 shadow-xl rounded-xl m-3 p-3">
           
                <h1 className='text-center font-bold text-2xl m-2'>Contact As</h1>
                <hr/>
               
                <p className='mt-1'>Have a question, suggestion, or just want to say hello? We&#39;d love to hear from you!</p>
                <ul>
               
                <li><h4 className='font-bold mt-2'>Neel</h4></li>
                <p className='mt-1'>Email : <a href="mailto:neelvaghasiya0008@gmail.com">neelvaghasiya0008@gmail.com</a></p>
                <li className='font-bold mt-2'>Kishan</li>
                <p className='mt-1'>Email : <a href="mailto:kishanzalavadia12@gmail.com">kishanzalavadia12@gmail.com</a></p>
                </ul>
                
                <p className='text-center mt-2'>For general inquiries or assistance, you can reach us at: <a href='mailto:quizbee812@gmail.com'>quizbee812@gmail.com</a></p>
                <p className='font-bold text-center mt-2'>Our team is ready to assist you with any inquiries or feedback you may have. Thank you for choosing QuizBee!</p>
            </Card>
        </MenuList>
</Menu>
    )
  }





