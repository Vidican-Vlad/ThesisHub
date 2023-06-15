import {
    useDisclosure,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Radio,
    RadioGroup,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    VStack,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Accordion,
    HStack,
    IconButton,
    Divider,
    Flex,
    Box,
    Switch,
    Text,
    ScaleFade 
  } from '@chakra-ui/react'
  import { getTagsGroupedByCategory } from '../api/proposals';
  import { useState, useRef } from 'react';
  import { CategoryTag } from './CategoryTag';
  import { FaRegWindowClose } from "react-icons/fa";
  import { getFilteredProposals } from '../api/proposals';

export function SearchFilterFunction({searchForProposals, drawerOpen, drawerClose, studyCycle, targetUser, tagsList, logicalOperator, setStudyCycle, setTargetUser, setLogicalOperator, setTagsList, title, description, setTitle, setDescription }){
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [categories, setCategories] = useState([]);

    function isEmptyArray(arr){
        return Array.isArray(arr) && arr.length == 0
    }
    async function handleModalOpen(){
        if(isEmptyArray(categories)){
            let temp = await getTagsGroupedByCategory();
            console.log(temp);
            setCategories(temp);
        }
        onOpen();
    }

    function handleStudyCycleChange(value) {
        setStudyCycle(value);
    }
    
    function handleTargetUserChange(value) {
        setTargetUser(value);
    }
    function handleLogicalOperatorChange(){
        setLogicalOperator((prevLogicalOperator) => !prevLogicalOperator);
    }
    function addTag(tag){
        if(!(tagsList.some(el => el._id === tag._id))){
            setTagsList((prevTags) => {return [...prevTags, tag]});
        }
        console.log(tagsList);
    }
    function removeTag(tagID){
        setTagsList((prevTagList) =>
        prevTagList.filter((tag) => tag._id !== tagID)
      );
    }
    function handleTitleChange(e){
        setTitle(e.target.value);
    }
    function handleDescriptionChange(e){
        setDescription(e.target.value);
    }

    async function applyFilters(e){
        searchForProposals(1);
    }

    function resetFilters(){
        setTagsList([]);
        setTargetUser([]);
        setStudyCycle("");
        setTargetUser("");
        setTitle("");
        setDescription("");
    }
    return (
        <Drawer isOpen={drawerOpen} onClose={drawerClose} placement='left' closeOnOverlayClick = {false} colorScheme="teal" size={"lg"}>
            <DrawerOverlay>
               <DrawerContent colorScheme>
                    <DrawerCloseButton/>
                    <DrawerHeader color={'white'}>
                        Apply the filters you want
                    </DrawerHeader> 
                    <DrawerBody color = {"white"}>
                        <FormControl>
                            <VStack>
                                <FormLabel htmlFor='studyCycle'>Select the study cycle</FormLabel>
                                <RadioGroup value={studyCycle} onChange = {handleStudyCycleChange} id='studyCycle'>
                                    <VStack align={"start"}>
                                        <Radio value = 'Licenta'>Bachelor's Degree</Radio>
                                        <Radio value = "Master">Master's Degree</Radio>
                                    </VStack>
                                </RadioGroup>
                                <FormLabel htmlFor='targetUser'>I want to see proposals of: </FormLabel>
                                <RadioGroup value = {targetUser} onChange = {handleTargetUserChange} id="targetUser">
                                    <VStack align={"start"}>
                                        <Radio value='Student'>Students!</Radio>
                                        <Radio value='Profesor'>Professors!</Radio>
                                    </VStack>
                                </RadioGroup>
                                <FormLabel htmlFor='title'>the title contains the following keyword:</FormLabel>
                                <Input placeholder='enter keyword...'  onChange={handleTitleChange} value={title} id = "title"></Input>
                                <FormLabel htmlFor='decription'>the description contains the following keyword</FormLabel>
                                <Input placeholder='enter keyword...' onChange = {handleDescriptionChange} value={description} id = "decription"></Input>
                                <HStack>
                                    <Button colorScheme='WhiteAlpha' variant="outline" onClick = {handleModalOpen}>filter by tags!</Button>
                                    <Button colorScheme='WhiteAlpha' variant="outline" onClick = {applyFilters}>Apply filters</Button>
                                    <Button colorScheme='WhiteAlpha' variant="outline" onClick = {resetFilters}>Reset filters</Button>
                                </HStack>
                                <Divider orientation='horizontal'/>
                                <Modal isOpen = {isOpen} onClose = {onClose} scrollBehavior='inside'>
                                    <ModalOverlay/>
                                    <ModalContent  bg = "gray.800" color = "white">
                                        <ModalHeader>Select all tags</ModalHeader>
                                        <ModalBody>
                                            <Accordion>
                                                {
                                                    categories.map(category =>{
                                                        return <CategoryTag categoryName={category.name} categoryID={category._id} key={category._id} tags = {category.tags} addtag = {addTag} removeTag = {removeTag} selectedTags = {tagsList}/>
                                                    })
                                                }
                                            </Accordion>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button colorScheme='blue' mr = {3} onClick={onClose}>
                                                close
                                            </Button>
                                        </ModalFooter>
                                    </ModalContent>
                                </Modal>
                                {(Array.isArray(tagsList) && tagsList.length > 1) &&
                                    <ScaleFade in = {true} exit={true}>
                                        <VStack>
                                            <Text>show proposals that contain {logicalOperator ? " all " : "  any "} of the selected tags </Text>
                                            <Flex align='center'>
                                                <Box mr={2}>any</Box>
                                                <Switch isChecked = {logicalOperator} onChange = {handleLogicalOperatorChange} />
                                                <Box ml={2}>all</Box>
                                            </Flex>
                                        </VStack>
                                    </ScaleFade>
                                }   
                                <HStack wrap={"wrap"}>
                                    {
                                        tagsList && tagsList.map(tag =>{
                                            return <Button  rightIcon={<FaRegWindowClose/>} onClick={(e) => {removeTag(tag._id)}} key = {tag._id}>{tag.name}</Button>
                                        })
                                    }
                                </HStack>
                            </VStack>
                        </FormControl>  
                    </DrawerBody>
               </DrawerContent>
            </DrawerOverlay>
        </Drawer>
    )
}