
import { HStack, VStack, Divider, Button, Wrap } from "@chakra-ui/react";
import { getFileFromBackend } from "../api/proposals";
import "../css/comment.css";
import "../css/proposal.css";
import { ApplyToProposalModal } from "../Components/ApplyToProposalModal";
import { BsFileZip, BsFiletypeDoc, BsFiletypeDocx, BsFiletypeJpg, BsFiletypeMd, BsFiletypePdf, BsFiletypePng, BsFiletypePptx, BsFiletypePpt, BsFiletypeTxt, BsFile } from "react-icons/bs";
import { useState } from "react";
import { applyToProposal, approveApplicationApi } from "../api/proposals";
import { ApplcationPanel } from "./ApplicationsPanel";
export const ProposalItem = ({proposalData, updateProposalApplications, updateProposalApproved}) =>{
    const [showModal, setShowModal] = useState(false)
    const [showDrawer, setShowDrawer] = useState(false);
    const user = localStorage.getItem("userID");
    async function handleClick(fileID, name){
        try {
            const res = await getFileFromBackend(fileID);
            const url = URL.createObjectURL(res);
            const link = document.createElement('a');
            link.href = url;
            link.download = name;
            link.click();
        } catch (err) {
            console.log(err);
        }
    }

    function handleShowModal(value){
        if (typeof value == "boolean" && value !== showModal) {
            setShowModal(value)
        }
    }

    function handleShowDrawer(value){
        if (typeof value == "boolean" && value !== showDrawer) {
            setShowDrawer(value)
        }
    }

    async function approveApplication(applicantID){
        // const value = await approveApplicationApi(proposalData._id, applicantID);
        //console.log(value);
        try {
            const res = await approveApplicationApi(proposalData._id, applicantID);
            console.log(res);
            updateProposalApproved(applicantID); 
            setShowDrawer(false);
        } catch (error) {
            if(error.response?.data?.msg){
                alert(error.response?.data?.msg);
            }else{
                console.log(error);
            }
        }

    }

    async function sendApplication(message){
        try {
            const value = await applyToProposal(proposalData._id,message);
            updateProposalApplications(value);
            setShowModal(false);
        } catch (error) {
            if(error.response?.data?.msg){
                alert(error.response?.data?.msg);
            }else{
                console.log(error);
            }
        }
    }

    function determineIcon(extension){
        switch (extension){
            case 'jpg':
                return <BsFiletypeJpg/>
            case 'png':
                return <BsFiletypePng/>
            case 'zip':
                return <BsFileZip/>
            case 'doc':
                return <BsFiletypeDoc/>
            case 'docx':
                return <BsFiletypeDocx/>
            case 'md':
                return <BsFiletypeMd/>
            case 'pdf':
                return <BsFiletypePdf/>
            case 'ppt':
                return <BsFiletypePpt/>
            case 'pptx':
                return <BsFiletypePptx/>
            case 'txt':
                return <BsFiletypeTxt/>
            default:
                return <BsFile/>
        }
    }  
    return(
        <div className = "proposal-item-main">
            <ApplyToProposalModal  approved = {proposalData?.approved} sendApplication = {sendApplication} showModal={showModal} proposalID={proposalData?._id} handleShowModal = {handleShowModal} proposalCycle = {proposalData?.studyCycle} proposalOwner={proposalData?.owner}/>
            <ApplcationPanel approveApplication = {approveApplication} isOpen = {showDrawer} onClose={handleShowDrawer} proposal={proposalData}/>
            <div className = "proposal-item-title">
                <p>{proposalData.title}</p>
            </div>
            <div className= "proposal-item-tbd">
                <div className="proposal-item-description">
                    <p>{proposalData.description}</p>
                </div>
                <Divider/>
                <HStack justify={"space-between"}>
                    <HStack>
                        <Wrap spacing = "5px">
                        {
                            proposalData.tags.map(tag =>{
                                return  <div className = "proposal-item-tag" key = {tag._id}>
                                            <p>{tag.name}</p>
                                        </div>
                            })
                        }
                        </Wrap>
                    </HStack>
                    <VStack>
                        <Divider orientation="vertical"/>
                        <Button onClick={(e) => {handleShowModal(true)}} isDisabled = {user === proposalData.owner._id ? true : false}> Apply for proposal</Button>
                        <Button onClick={(e) => {handleShowDrawer(true)}}> See applications </Button>
                    </VStack>
                    

                </HStack>

            </div>
            <div className= "proposal-item-attachementList">
                {
                    proposalData.attachements.map(attachement =>{
                        return <div className="proposal-item-list" key={attachement._id}>
                                    
                                    <div className="attachment" onClick = {()=> handleClick(attachement._id, attachement.displayName)}>
                                        {determineIcon(attachement.extension)}
                                        {attachement.displayName}
                                    </div>
                                </div>
                    })
                }
            </div>
        </div>
    )
}