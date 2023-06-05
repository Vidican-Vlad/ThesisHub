import  { useState } from "react"
import { CategoryCheckbox } from "./CategoryCheckbox"
import { Divider } from "@chakra-ui/react"


export const CategoryList = ({categories, onChange, resetTags}) =>{
    return(
        <div className="taglist">
            <button onClick={resetTags} className="checkbox-unchecked">reset tags</button>
            <Divider orientation='horizontal' />
            <div className = "taglist-tags">
            {
                categories.map(category =>{
                    return <CategoryCheckbox category = {category} key = {category._id} onClick={onChange}/>
                })
            }
            </div>
        </div>
    )
    
}