
import { instance, generateHeader } from "./Axios";


const getProposals = async (pageNr, limit=4) =>{
    const res = await instance.get("proposal/", {...generateHeader(), params:{page: pageNr, limit: limit}});
    return res.data;
}

const getSpecificProposal = async (proposalID) =>{
    const res = await instance.get(`proposal/${proposalID}`, generateHeader());
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
    const res = await instance.post(`/proposal/${proposalID}/comment`, content, generateHeader());
    return res.data;
}

const getTagsForCategory = async(categoryID) =>{
    const res = await instance.get(`/tag/category/${categoryID}`, generateHeader());
    return res.data

}

const getTagsGroupedByCategory = async() =>{
    const res = await instance.get(`/category/tags`, generateHeader());
    return res.data
}

const getFilteredProposals = async(params) =>{
    const res = await instance.get("/proposal/filtered", generateHeader({}, params));
    return res.data
}

const applyToProposal = async(proposalID, payload) =>{
    const res = await instance.put(`/proposal/${proposalID}/apply`, {payload}, generateHeader())
    return res.data;
}
const approveApplicationApi = async(proposalID, applicantID) =>{
    const res = await instance.put(`/proposal/${proposalID}/approve`,{applicantID}, generateHeader())
    return res;
}
export { approveApplicationApi, applyToProposal, getProposals, getFilteredProposals, getTagsForCategory, getComments, createComment, getTags, getCategories, createProposal, getSpecificProposal, getFileFromBackend, getTagsGroupedByCategory }
 