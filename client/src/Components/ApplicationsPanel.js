import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    VStack,
    HStack,
    Box,
    Button,
    Divider,
    Text
  } from '@chakra-ui/react'

export const ApplcationPanel = ({isOpen, onClose, proposal, approveApplication}) =>{

    console.log(proposal);
    return(
        <Drawer isOpen = {isOpen } placement='right' onClose={(e) =>{onClose(false)}} size={"md"}>
            <DrawerOverlay>
                <DrawerContent>
                    <DrawerCloseButton/>
                    <DrawerHeader color={"white"}>
                        Applications
                    </DrawerHeader>
                    <DrawerBody color = {"white"}>
                        <Accordion allowToggle>
                            {
                                (Array.isArray(proposal.applications) && proposal.applications.length > 0) ?
                                proposal.applications.map(el =>{
                                    return <AccordionItem key = {el._id} border={"1px"}>
                                        <AccordionButton justifyContent={"space-between"}>
                                            <Text>{el.applicant.email}</Text>
                                            <Text>{el.applicant.name}</Text>
                                        </AccordionButton>
                                        <AccordionPanel>
                                            <Divider backgroundColor={proposal}/>
                                            <VStack spacing={"3px"}>
                                            <Text>{el.message}</Text>
                                            <Divider backgroundColor={"white"}/>
                                            <Button colorScheme='green' onClick={(e) => {approveApplication(el.applicant._id)}}>Accept this proposal</Button>
                                           </VStack>
                                        </AccordionPanel>
                                    </AccordionItem>
                                })
                                :
                                <Text>there are currently no applicationss for this proposal</Text>
                            }
                        </Accordion>
                    </DrawerBody>
                </DrawerContent>
            </DrawerOverlay>
        </Drawer>
    )

}