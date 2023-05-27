import { Register } from "../Components/Register";
import { Login } from "../Components/Login";
import React, { useState } from "react";
import logo from "../Images/logo2.png"
import "../css/auth.css";
export function AuthPage(){
    const [currentForm, setCurrentForm] = useState("login");
    const toggleForm = (formName) =>{
        setCurrentForm(formName);
    }

        return (
            <div className="AuthPage">
                < img src={logo} id = "logo"/>
                {
                    currentForm == "login" ? <Login onFormSwitch = {toggleForm}/> : <Register onFormSwitch = {toggleForm}/>
                }
            </div>
        )
  }

