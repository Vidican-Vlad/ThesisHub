import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { validateLogin } from "../utils/validators"
import { login } from "../api/auth";
import { FormInput } from "./FormInput";
import { useNavigate } from "react-router-dom";


export const Login = (props) =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const test = validateLogin(password, email);
        if(!test == "")
            alert(test);
        else{
            try {
                const res = await login({password, email});
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("accType", res.data.accType);
                localStorage.setItem("cycle", res.data.cycle);
                localStorage.setItem("userID", res.data.userID);
                navigate("/");
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <div className="auth-form-container">
            <form onSubmit = {handleSubmit} className="login-form">
                <FormInput type="Email" name = "Email" text = "Email" placeholder="email@domain.com" handleChange={setEmail}></FormInput>
                <FormInput type="Password" name ="Password" text = "Password" placeholder = "********" handleChange={setPassword}></FormInput>
                <div id="form-footer">
                    <button className ="submit-button" type= "submit">Log in!</button>
                    <button className="link-button" onClick={()=>props.onFormSwitch("register")}>no account? sign up now!</button>
                </div>
            </form>
        </div>
    )
}
