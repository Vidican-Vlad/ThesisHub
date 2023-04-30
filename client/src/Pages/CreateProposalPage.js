import React, { useEffect, useRef, useState } from "react";
import { ProposalForm } from "../Components/ProposalForm";
import { getCategories, getTags } from "../api/proposals";
import { TagList } from "../Components/TagList";
import { Navbar } from "../Components/Navbar";
import  "../css/proposal.css"
import { CategoryList } from "../Components/CategoryList";
export function CreateProposalPage(){

    const descriptionRef = useRef(null);
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState([]);
    const [cycle, setCycle] = useState("");
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [viewTags, setViewTags] = useState(false);
     function onChangeTitle(nt){
        setTitle(nt);
     }
     function onChangeCycle(nc){
        setCycle(nc);
     }
     function handleTagChange(tagText){
        let tagTemp = tags.map(el =>{
            return el.text === tagText ? {text: el.text, category: el.category, checked: !el.checked} : el
        })
        setTags(tagTemp);
     }
    function resetTags(){
        let tagTemp = tags.map(el =>{
            return  {text: el.text, category: el.category, checked: false};
        })
        setTags(tagTemp);
    }
    async function handleCategoryChange(categoryID){
        setSelectedCategory(categoryID);
        setViewTags(true);
    }
     function handleSubmit(){
        console.log(descriptionRef.current.value);
    }
    function viewCategories(){
        setViewTags(false);
    }


     useEffect(()=>{
        async function getData(){
            try {
                let tagsTemp = await getTags();
                tagsTemp = tagsTemp.map((el) =>{
                    return {text:el.name, category: el.category._id, checked: false}
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
                
                <ProposalForm descriptionRef = {descriptionRef} handleSubmit = {handleSubmit} changeTitle = {onChangeTitle}  changeCycle = { onChangeCycle }></ProposalForm>
            </div>
        </div>
    )
}