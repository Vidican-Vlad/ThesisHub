import { instance, generateHeader } from "./Axios";





const register =  async (data) =>{
    try {
        const res = await instance.post("auth/register", data);
        return res;
    } catch (error) {
        throw error;
    }
}

const login = async (data) =>{
    try {
        const res = await instance.post("auth/login", data);
        return res
    } catch (error) {
        throw error;
    }
}

const getUsers = async () =>{
    try {
        const res = await instance.get("auth/users", generateHeader())
        return res
    } catch (error) {
        throw error;
    }
}

export { register, login, getUsers }
