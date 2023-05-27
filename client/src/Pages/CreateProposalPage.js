import React, { useEffect, useRef, useState } from "react";
import { ProposalForm } from "../Components/ProposalForm";
import { getCategories, getTags } from "../api/proposals";
import { TagList } from "../Components/TagList";
import { Navbar } from "../Components/Navbar";
import { createProposal } from "../api/proposals";
import  "../css/proposal.css"
import { CategoryList } from "../Components/CategoryList";
export function CreateProposalPage(){
    const accCycle = localStorage.getItem("cycle");
    const accType = localStorage.getItem("accType");
    const descriptionRef = useRef(null);
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState([]);
    const [cycle, setCycle] = useState(accCycle);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [viewTags, setViewTags] = useState(false);
    const [files, setFiles] = useState([]);

    function getCheckedTagIds(){
        let tagIds = tags
            .filter(tag => tag.checked)
            .map(tag => tag.id);
        return tagIds
    }
    function onChangeTitle(nt){
        setTitle(nt);
     }
     function onChangeCycle(nc){
        setCycle(nc);
     }
     function onChangeFile(files){
        setFiles(files);
     }
     function handleTagChange(tagText){
        let tagTemp = tags.map(el =>{
            return el.text === tagText ? {text: el.text, category: el.category, id: el.id, checked: !el.checked,} : el
        })
        setTags(tagTemp);
     }
    function resetTags(){
        let tagTemp = tags.map(el =>{
            return  {text: el.text, category: el.category, id: el.id, checked: false};
        })
        setTags(tagTemp);
    }
    async function handleCategoryChange(categoryID){
        setSelectedCategory(categoryID);
        setViewTags(true);
    }
    async function handleSubmit(){
        try{
            const data = new FormData();
            data.append("title", title);
            data.append("description", descriptionRef.current.value);
            data.append("tags", getCheckedTagIds());
            if(accType == "Profesor"){
                data.append("cycle", cycle);
            }
            files.forEach(el =>{
                data.append("files", el);
            });
            const response = await createProposal(data);
        }catch(err){
            console.log(err);
            alert("error, check console");
        }
    }
    function viewCategories(){
        setViewTags(false);
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
            <div className="create-proposal-page-main">
                {viewTags === true ?
                <TagList tags = {tags} onChange = {handleTagChange} categoryID = {selectedCategory} resetView={viewCategories} resetTags={resetTags}/>
                :
                <CategoryList categories={categories} onChange={handleCategoryChange} resetTags = {resetTags} />
                }
                <ProposalForm descriptionRef = {descriptionRef} handleSubmit = {handleSubmit} changeTitle = {onChangeTitle}  changeCycle = { onChangeCycle } cycle={cycle} onChangeFile = {onChangeFile} />
            </div>
        </div>
    )
}