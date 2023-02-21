import axios from "axios";

const instance = axios.create({
	baseURL: "http://localhost:3055/",
});

const generateHeader = ()=>{
    return({
            headers: {
                authorization: `Bearer ${(localStorage.getItem("token"))}`,
                "Content-type": "application/json",
            }
        }
    )

} 

export  { instance, generateHeader };