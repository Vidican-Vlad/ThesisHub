import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../api/auth";
import { Navbar } from "../Components/Navbar";
import { ProposalList } from "../Components/ProposalList";


export function HomePage(){
    const navigate = useNavigate();
    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token === null || token === ""){
            navigate("/auth");
        }
    },[])
    
    return(
        <div className="homepage">
            <Navbar/>
            <ProposalList/>
        </div>
    )
}