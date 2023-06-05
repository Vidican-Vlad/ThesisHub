import { FormInput } from "./FormInput"
import { RadioQuestion } from "./RadioQuestion";
import { Button, ButtonGroup, Container, Textarea, FormLabel, Input, Divider } from '@chakra-ui/react'
import { FaRegWindowClose } from "react-icons/fa";


export function ProposalForm({ removeSelectedTag, descriptionRef, titleRef, onChangeFile, changeCycle, cycle, handleSubmit, tags}){
    const accType = localStorage.getItem("accType");
    function handleClick(){
        handleSubmit();
    }
    const handleFileChange = (e)=>{
        onChangeFile(Array.from(e.target.files));
    }
    return (
        <div className="create-proposal-form-wrapper">
            <div className="create-proposal-form">
                <FormLabel htmlFor='title' >the title of your proposal...</FormLabel>
                <Input placeholder='please enter a title for your proposal...' bg={"blackAlpha.500"} id = "title" ref = {titleRef} ></Input>
                <FormLabel htmlFor = "description">Description</FormLabel>
                <Textarea variant={"filled"} bg={"blackAlpha.500"} id="description" name="description" placeholder="please describe your proposal..." ref={descriptionRef}/>
                {accType === "Profesor" && <RadioQuestion question="for which study cycle is it ?" options={[{value:"Licenta", text: "Bachelor's degree"}, {value: "Master", text: "Master's degree"}]} checked={cycle} handleClick={changeCycle}/>}
                <input type="file" onChange={handleFileChange} multiple/>
                <Button bg={"blackAlpha.500"} onClick={(e) =>handleClick()}>Submit!</Button>
                <Divider orientation='horizontal'/>
                <Container>
                    {(Array.isArray(tags) && tags.length > 0) && tags.map(el =>{
                        return <Button rightIcon={<FaRegWindowClose/>} key={el.tagID} onClick={(e) =>removeSelectedTag(el.tagID)}>{el.text}</Button>
                    })}
                </Container>
            </div>
        </div>
    )
}