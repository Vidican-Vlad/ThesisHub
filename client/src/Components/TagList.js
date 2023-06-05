import { useEffect, useState } from "react"
import { Checkbox } from "./Checkbox"
import { Divider } from "@chakra-ui/react"

export const TagList = ({tags, onChange, resetView, resetTags, categoryID})=>{

    return (
        <div className="taglist">
            <button onClick={resetView} className="checkbox-unchecked">back to categories</button>
            <button onClick={resetTags} className="checkbox-unchecked">reset tags</button>
            <Divider orientation='horizontal' />
            <div className="taglist-tags">
            {
                tags.map(tag =>{
                    return (tag.category === categoryID) ?  <Checkbox text={tag.text} tagID = {tag.id} checked = {tag.checked} onClick = {onChange} key = {tag.id} ></Checkbox> : null;
                }) 
            }
            </div>
        </div>
    )
}