import react, {useEffect, useState} from "react";
import "../css/homepage.css"
import { Link } from "react-router-dom";
import { Divider, HStack, VStack, Icon, Text, Center  } from "@chakra-ui/react";
import { GiTeacher } from "react-icons/gi";
import { FaUserGraduate } from "react-icons/fa";
export const ProposalLink = ({value}) =>{

    return (
        <Link to={"/proposal/"+value._id}>
            <div className="proposal-link">
                <VStack spacing = "0px">
                    <p>{value.title}</p>
                    <HStack spacing = "2px">
                        <Icon as = {value.owner.type === "Profesor" ? GiTeacher : FaUserGraduate}/>
                        <Text>{value.owner.email}</Text>                        
                    </HStack>
                </VStack>

                <Divider orientation='horizontal'/>
                <p>{value.description}</p>
                <Divider orientation='horizontal' spa/>
                <div className="propsal-link-footer">
                    <div className="proposal-link-footer-taglist">
                        <p>tags:  </p>
                        {
                            value.tags.map(tag=>{
                                return <Center key={tag._id}  border="1px solid" borderColor="black.400" p={0.5}>
                                    <p>{tag.name}</p>
                                </Center>
                            })
                        }
                    </div>
                    <p>cycle: {value.studyCycle}</p>
                </div>
            </div>
        </Link>
    )
}