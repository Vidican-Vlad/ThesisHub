
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { getSpecificProposal } from "../api/proposals";
import { ProposalItem } from "../Components/ProposalItem";
import { CommentSection } from "../Components/CommentSection";
import { Navbar } from "../Components/Navbar";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    VStack,
  } from '@chakra-ui/react'
import "../css/comment.css";
import "../css/proposal.css";
import "../App.css"


export function ProposalPage(){
    //
    const  { proposalID } = useParams();
    const [proposal, setProposal] = useState({});
    const [loading, setLoading] = useState(true);
    async function getData(){
        try {
            let proposalTemp = await getSpecificProposal(proposalID);
            setProposal(proposalTemp);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(()=>{
      getData();
    }, [])

    useEffect(()=>{
        console.log(proposal);
    }, [proposal]);
    function updateProposalApplications(application){
        setProposal((prevProposal) => {
           return {
                ...prevProposal,
                applications: [...prevProposal.applications, application]
            }
        });
    }
    function updateProposalApproved(ApplicantID){
        setProposal((prevProposal) =>{
            return prevProposal.approved ?
            {
                ...prevProposal,
                approved: null,
            } :
            {
                ...prevProposal,
                approved: ApplicantID
            }
        })
    }
    
    return(
            <div className="ProposalPage">
                <Navbar/>
                <VStack>
                    <div className="proposal-page-main-main">
                        {!loading && <ProposalItem proposalData={proposal} updateProposalApplications = {updateProposalApplications} updateProposalApproved = {updateProposalApproved}/>}
                        <CommentSection proposalID={proposalID}/>
                    </div>
               </VStack>
            </div>           
    )
}
