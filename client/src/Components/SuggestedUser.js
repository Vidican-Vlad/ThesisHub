import { Button } from '@chakra-ui/react'
import { RiUserAddLine } from "react-icons/ri"


export const SuggestedUser = ({user, handleStartConversation})=>{

    function handleClick(){
        handleStartConversation(user._id);
    }

    return(
        <Button leftIcon={<RiUserAddLine/> } key={user._id} colorScheme='whiteAlpha' onClick={(e)=>{handleClick()}} color={'white'}>
            {user.email}
        </Button>
    )
}