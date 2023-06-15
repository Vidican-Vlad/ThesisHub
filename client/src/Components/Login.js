import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { validateLogin } from "../utils/validators"
import { login } from "../api/auth";
import { FormInput } from "./FormInput";
import { useNavigate } from "react-router-dom";


export const Login = ({onFormSwitch, loginSubmit}) =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    function handleSubmit(e){
        e.preventDefault();
        validateLogin(password, email);
    //     if(!test == "")
            // alert(test);
    //     else{
    //       loginSubmit({email, password});
    //     }
    // }
    loginSubmit({email, password});
    }

    return (
        <div className="auth-form-container" onSubmit={handleSubmit}>
            <form className="login-form">
                <FormInput type="Email" name = "Email" text = "Email" placeholder="email@domain.com" handleChange={setEmail}></FormInput>
                <FormInput type="Password" name ="Password" text = "Password" placeholder = "********" handleChange={setPassword}></FormInput>
                <div id="form-footer">
                    <button className = "submit-button" type="submit">Log in!</button>
                    <button className="link-button" onClick={()=>onFormSwitch("register")}>no account? sign up now!</button>
                </div>
            </form>
        </div>
    )
}
