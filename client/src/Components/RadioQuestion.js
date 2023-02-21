import react, { useEffect, useState } from "react";
import { RadioItem } from "./RadioItem";

export const RadioQuestion = ({question, options, checked, handleClick}) =>{
    return (
        <div className="radio-question">
            <p>{question}</p>
            {
                options.map(option =>{
                    return <RadioItem key={option.value} checked={checked} value = {option.value} text = {option.text} handleClick={handleClick}></RadioItem>
                })
            }
        </div>
    )
}