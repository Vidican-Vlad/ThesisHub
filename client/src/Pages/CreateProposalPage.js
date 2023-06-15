import React, { useEffect, useRef, useState } from "react";
import { ProposalForm } from "../Components/ProposalForm";
import { getCategories, getTags } from "../api/proposals";
import { TagList } from "../Components/TagList";
import { Navbar } from "../Components/Navbar";
import { createProposal } from "../api/proposals";
import { useNavigate } from "react-router-dom";
import { Modal,
    ModalOverlay,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Text,
    PinInput,
    PinInputField,
    HStack, 
    VStack,
    Button,
    ModalContent,
    ModalFooter} from "@chakra-ui/react";
import  "../css/proposal.css"
import { CategoryList } from "../Components/CategoryList";


export function CreateProposalPage(){
    const accCycle = localStorage.getItem("cycle");
    const accType = localStorage.getItem("accType");
    const descriptionRef = useRef(null);
    const titleRef = useRef(null);
    const [tags, setTags] = useState([]);
    const [cycle, setCycle] = useState(accCycle);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const [viewTags, setViewTags] = useState(false);
    const [files, setFiles] = useState([]);
    const [showNavigateModal, setShowNavigateModal] = useState(false);
    const [newProposalID, setNewProposalID] = useState(""); 
    const navigate = useNavigate();


    function getCheckedTagIds(){
        let tagIds = tags
            .filter(tag => tag.checked)
            .map(tag => tag.id);
        return tagIds
    }
     function onChangeCycle(nc){
        setCycle(nc);
     }
    
     function onChangeFile(files){
        setFiles(files);
     }
     function removeSelectedTag(tagID){
        setSelectedTags((prevTags) => prevTags.filter(el => el.tagID != tagID));
     }
     function handleTagChange(tag){
        // console.log(tag);
        let tagTemp = tags.map(el =>{
            return el.id === tag.tagID ? {text: el.text, category: el.category, id: el.id, checked: !el.checked} : el
        })
        setTags(tagTemp);
        setSelectedTags((prevTags) =>{
           return prevTags.find(el => el.tagID === tag.tagID) ? prevTags : [...prevTags, tag]
        });
     }
    function resetTags(){
        let tagTemp = tags.map(el =>{
            return  {text: el.text, category: el.category, id: el.id, checked: false};
        })
        setTags(tagTemp);
        setSelectedTags([]);
    }
    async function handleCategoryChange(categoryID){
        setSelectedCategory(categoryID);
        setViewTags(true);
    }
    async function handleSubmit(){
        try{
            const data = new FormData();
            data.append("title", titleRef.current.value);
            data.append("description", descriptionRef.current.value);
            data.append("tags", selectedTags.map(el => el.tagID));
            if(accType == "Profesor"){
                data.append("cycle", cycle);
            }
            files.forEach(el =>{
                data.append("files", el);
            });
            const response = await createProposal(data);

            if(response?.proposal?._id){
                alert("the proposal was created successfully!");
                setShowNavigateModal(true);
                setNewProposalID(response.proposal._id);
            }

        }catch(err){
            console.log(err);
            alert("error, check console");
        }
    }
    function viewCategories(){
        setViewTags(false);
    }

    function navigateToPath(path){
        if(path !== "")
            navigate(path);
    }

     useEffect(()=>{
        async function getData(){
            try {
                let tagsTemp = await getTags();
                tagsTemp = tagsTemp.map((el) =>{
                    return {text:el.name, category: el.category._id, count: el.count , id:el._id, checked: false}
                })
                setTags(tagsTemp);
                let categoriesTemp  = await getCategories();
                setCategories(categoriesTemp); 

            } catch (err) {
                console.log(err); 
            } 
        }
        getData();
     }, [])

    return(
        <div className="create-proposal-page">
            <Navbar/>
            <Modal size = {"lg"} isOpen = {showNavigateModal} onClose={(e) => {setShowNavigateModal(false)}}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>
                      <Text color={"white"}>What's next ?</Text>  
                    </ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Text color={"white"}>Good news, the proposal was created successfully, please choose where you want to go next, or dismiss this if you want to create another proposal</Text>
                    </ModalBody>
                    <ModalFooter justifyContent={"space-between"}>
                        <Button colorScheme="green" onClick={(e) =>{navigateToPath("/")}}>To the homepage</Button>
                        <Button colorScheme="red" onClick={(e) => {navigateToPath(`/proposal/${newProposalID}`)}}>To the new proposal</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <div className="create-proposal-page-main">
                {viewTags === true ?
                <TagList tags = {tags} onChange = {handleTagChange} categoryID = {selectedCategory} resetView={viewCategories} resetTags={resetTags}/>
                :
                <CategoryList categories={categories} onChange={handleCategoryChange} resetTags = {resetTags} />
                }
                <ProposalForm removeSelectedTag = {removeSelectedTag} tags = {selectedTags} descriptionRef = {descriptionRef} titleRef = {titleRef} handleSubmit = {handleSubmit}  changeCycle = { onChangeCycle } cycle={cycle} onChangeFile = {onChangeFile} />
            </div>
        </div>
    )
}