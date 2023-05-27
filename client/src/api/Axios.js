import axios from "axios";

const instance = axios.create({
	baseURL: "http://localhost:3055/",
});

const generateHeader = (headers={}, params={})=>{
    return({
            headers: {
                authorization: `Bearer ${(localStorage.getItem("token"))}`,
                "Content-type": "application/json",
                ...headers
            },
            params:{
                ...params
            }
        }
    )
} 

export  { instance, generateHeader };