import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../api/auth";


export function HomePage(){
    const navigate = useNavigate();
    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token === null || token === ""){
            navigate("/auth");
        }
    },[])
    const deleteToken = ()=>{
        localStorage.setItem("token", null);
    }
    const getAllUsers = async ()=>{
        try {
            const users = await getUsers();
            console.log(users);
        } catch (err) {
            alert(err);
        }
    }
    return(
        <div>
            <p> Home page </p>
            <button onClick={deleteToken}>sign out</button>
            <button onClick={getAllUsers}>get all users</button>
        </div>
    )
}