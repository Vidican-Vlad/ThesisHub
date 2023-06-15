import { NavLink } from "react-router-dom"
import logo from "../Images/logo2.png"
import { AboutPage } from "../Pages/AboutPage"
import { useState } from "react"

export const Navbar = ()=>{
    const genClassName = ({isActive, isPending}) =>{
       return isActive ? "active-navbar-link" : "navbar-link"
    }
    const user = localStorage.getItem("accType");
    return(
        <div className="navbar navbar-grid">
            <NavLink to = "/About" element = {<AboutPage/>}>
                <img id = "navbar-logo" src ={logo}/>
            </NavLink>
            <div className="navbar-links">
                <NavLink className ={genClassName} to = "/">Home</NavLink>
                {(user !== "Admin") && <NavLink className = {genClassName} to = "/proposal/create" >Create Proposal</NavLink>}
                <NavLink className = {genClassName} to = "/messages/">Conversations</NavLink>
                {(user === "Admin") && <NavLink className = {genClassName} to = "/admin/">dashboard</NavLink>}
            </div>
        </div>
    )
    
}  