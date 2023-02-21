import { useRef, useState, useEffect } from "react";
import Axios from 'axios'
import { RadioQuestion } from "./RadioQuestion";
import { register } from "../api/auth";
import { validateRegister } from "../utils/validators";
import { FormInput } from "./FormInput";
export const Register = (props) =>{

    const [fname, setFName] = useState("");
    const [lname, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [accType, setAccountType] = useState("");
    const [studyCycle, setStudyCycle] = useState(null);

    useEffect(() => {
        localStorage.setItem("token",'');
      }, [])

    const  handleSubmit =  async (e) =>{
        e.preventDefault();
        const test = validateRegister(password, confirmPassword, email, fname, lname)
        if(test !== "")
            alert(test);
        else{
            const data = {
                fullname:fname+" "+lname,
                email: email,
                accountType: accType,
                password: password,
                cycle:studyCycle,
            }
            try{
                const response = await register(data)
                alert("The registering was successfull, please now login with your account!");
                props.onFormSwitch("login");
                console.log(response)
            }catch(err){
                console.log(err)
            }
        }
    }
    const handleAccTypeChange = (value) =>{
        setAccountType(value);
        setStudyCycle(null);
    }
    const handleStudyCycleChange = (value) =>{
        setStudyCycle(value);
    }

    return (
        <div className="auth-form-container">
            <form onSubmit={handleSubmit} className="register-form">
                <FormInput type="text" name="FName" text="First name" placeholder="type here..." handleChange={setFName}></FormInput>
                <FormInput type="text" name="LName" text="Last name" placeholder="type here..." handleChange={setLName}></FormInput>
                <FormInput type="Email" name="Email" text="Email" placeholder="email@domain.com" handleChange={setEmail}></FormInput>
                <FormInput type="Password" name="Password" text="Password" placeholder="*******" handleChange={setPassword}></FormInput>
                <FormInput type="Password" name="ConfirmPassword" text="Confirm password" placeholder="*******" handleChange={setConfirmPassword}></FormInput>
                <RadioQuestion options={[
                    {value:"Student", text: "Student"},
                    {value:"Profesor", text: "Proffesor"},
                    {value:"Admin", text: "Administrator"}]} 
                    checked={accType} question = "I am a:" handleClick={handleAccTypeChange}>
                </RadioQuestion>
                {
                    accType === "Student" &&<RadioQuestion options={[
                        {value: "Licenta", text: "Bachelor's Degree"},
                        {value: "Master", text: "Master's Degree"}]}
                        checked={studyCycle} question = "I am studying for a:" handleClick={handleStudyCycleChange} style = {accType == "Student" ? {visibility: "visible"} : {transform: "scale(0.05)" , visibility: "hidden"}}>
                    </RadioQuestion>
                }
                <div id="form-footer">
                    <button className = "submit-button" type= "submit">Register</button>
                    <button className="link-button" onClick= {() =>props.onFormSwitch('login')}>Already have an account? log in instead</button>
                </div>
            </form>

        </div>
    )
}
