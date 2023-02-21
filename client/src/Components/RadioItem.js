import {react} from "react"

export const RadioItem =({value, text, checked, handleClick})=>{

   function handleItemClick(){
        handleClick(value);
    }
    return(
        <div className = {checked == value ? "checked-radio-option" : "unchecked-radio-option"} onClick={handleItemClick}>
            <p>{text}</p>
        </div>
    )
}

