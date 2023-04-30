import { useEffect, useState } from "react"
import { Checkbox } from "./Checkbox"


export const TagList = ({tags, onChange, resetView, resetTags, categoryID})=>{

    return (
        <div className="taglist">
            <button onClick={resetView}>back to categories</button>
            <button onClick={resetTags}>reset tags</button>
            <div className="taglist-tags">
            {
                tags.map(tag =>{
                    return (tag.category === categoryID) ?  <Checkbox text={tag.text} checked = {tag.checked} onClick = {onChange} key = {tag.text} ></Checkbox> : null;
                }) 
            }
            </div>
        </div>
    )
}