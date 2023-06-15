import { instance, generateHeader } from "./Axios";

const register =  async (data) =>{

    const res = await instance.post("auth/register", data);
    return res;
}
const login = async (data) =>{
    const res = await instance.post("auth/login", data);
    return res;
}
const getUsers = async () =>{

    const res = await instance.get("auth/users", generateHeader())
    return res;
}

const getTempUsers = async () =>{
    const res = await instance.get("auth/tempUsers", generateHeader())
    return res;
}

async function confirmRegistration(userTmpID, securityKey){
    const res = await instance.put(`auth/confirm`, {userTmpID, securityKey});
    return res;
}

async function validateRegistration(payload){
    const res = await instance.put(`auth/validate`, payload, generateHeader());
    //console.log(generateHeader({},{},{userTmpID, validate, message}));
    //return res;
}
async function resetToken(userTmpID){
    const res = await instance.put(`auth/resetToken`, {userTmpID});
    return res;
} 


export { getTempUsers, resetToken, confirmRegistration, validateRegistration, register, login, getUsers }
