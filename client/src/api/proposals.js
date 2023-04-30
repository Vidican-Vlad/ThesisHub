import { instance, generateHeader } from "./Axios";


const getProposals = async () =>{
    const res = await instance.get("proposal/", generateHeader());
    return res.data;
}

const getTags = async () =>{
    const res = await instance.get("/tag/all", generateHeader());
    return res.data;
}

const getCategories =  async() =>{
    const res = await instance.get("/category/", generateHeader());
    return res.data;
}
export { getProposals, getTags, getCategories }