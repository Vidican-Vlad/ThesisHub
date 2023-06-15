import axios from "axios";

const instance = axios.create({
	baseURL: "http://localhost:3055/api",
});

const generateHeader = (headersArg={}, paramsArg={})=>{
    return({
            headers: {
                authorization: `Bearer ${(localStorage.getItem("token"))}`,
                "Content-type": "application/json",
                ...headersArg
            },
            params:{
                ...paramsArg
            },
        }
    )
} 

export  { instance, generateHeader };