
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { getSpecificProposal } from "../api/proposals";
import { ProposalItem } from "../Components/ProposalItem";
import { CommentSection } from "../Components/CommentSection";
import { Navbar } from "../Components/Navbar";
import { AddConversation } from "../Components/AddConversation";
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

    
    return(
            <div className="ProposalPage">
                <Navbar/>
                <div className="proposal-page-main">
                    <div className="proposal-page-main-main">
                        {!loading && <ProposalItem proposalData={proposal}/>}
                        <CommentSection proposalID={proposalID}/>
                    </div>
                </div>
            </div>           
    )
}
