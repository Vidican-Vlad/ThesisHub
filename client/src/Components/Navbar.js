import { Link } from "react-router-dom"
import logo from "../Images/logo2.png"
import { AboutPage } from "../Pages/AboutPage"

export const Navbar = ()=>{
    return(
        <div className="navbar">
            <Link to = "/About" element = {<AboutPage/>}>
                <img className = "navbar-logo" src ={logo}/>
            </Link>
            <div className="navbar-links">
                <Link className ="navbar-link" to = "/">Home</Link>
                <Link className ="navbar-link" to = "/proposal/create">proposal</Link>
                <Link className ="navbar-link" to = "/Messages">Conversations</Link>
                <Link className ="navbar-link" to = "/Profile">own account</Link>
            </div>
        </div>
    )
    
}  