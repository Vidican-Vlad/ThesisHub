import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Button,
    ButtonGroup,
    VStack
  } from '@chakra-ui/react';
export function CategoryTag ({categoryName, categoryID, tags, addtag, removeTag, selectedTags}){

    function handleButtonClick(tag){
        addtag(tag);
    }
    return(
        <AccordionItem>
            <AccordionButton >
                {categoryName}
                <AccordionIcon/>
            </AccordionButton>
            <AccordionPanel>
                <VStack align={"start"}>
                {
                    tags.map(tag =>{
                        return <Button key = {tag._id} onClick  = {(e) => handleButtonClick(tag)} >{tag.name}</Button>
                    })
                }
                </VStack>
            </AccordionPanel>
        </AccordionItem>
    )
}