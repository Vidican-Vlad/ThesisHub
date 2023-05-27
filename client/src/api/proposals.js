
import { instance, generateHeader } from "./Axios";


const getProposals = async (pageNr, limit=6) =>{
    const res = await instance.get("proposal/", {...generateHeader(), params:{page: pageNr, limit: limit}});
    return res.data;
}

const getSpecificProposal = async (proposalID) =>{
    const res = await instance.get("proposal/"+proposalID, generateHeader());
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

const createProposal = async(data) =>{
    const res = await instance.post("/proposal/create", data, generateHeader({"Content-type": "multipart/form-data"}));
    return res.data;
}

const getFileFromBackend = async(fileID) =>{
    const res = await instance.get(`file/${fileID}`, {...generateHeader(),responseType: "blob"});
    return res.data;
}

const getComments = async(proposalID) =>{
    const res = await instance.get(`/proposal/${proposalID}/comments`, generateHeader());
    return res.data;
}

const createComment = async(proposalID, content) =>{
    const res = await instance.post(`/proposal/${proposalID}/comment`,content, generateHeader());
    return res.data;
}
export { getProposals, getComments, createComment, getTags, getCategories, createProposal, getSpecificProposal, getFileFromBackend }
