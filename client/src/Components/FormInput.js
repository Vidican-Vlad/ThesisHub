import React, { useState } from "react";

export const FormInput = ({type, name, text, placeholder, handleChange}) =>{
    return(
        <div className="form-item">
            <label htmlFor={name}>{text}</label>
            <input type = {type} placeholder = {placeholder} id = {name} name={name} onChange={(e) => handleChange(e.target.value)}></input>
        </div>
    )
}