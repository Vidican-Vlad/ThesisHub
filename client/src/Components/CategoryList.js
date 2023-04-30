import  { useState } from "react"
import { CategoryCheckbox } from "./CategoryCheckbox"



export const CategoryList = ({categories, onChange, resetTags}) =>{
    return(
        <div className="taglist">
            <button onClick={resetTags}>reset tags</button>
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