import react, { useEffect, useState} from "react";
import { ProposalLink } from "./ProposalLink";
import { getProposals } from "../api/proposals";
import "../css/homepage.css"
export const ProposalList = () =>{
    const [proposals, setProposals] = useState([])
    
    useEffect(()=>{
        getProposals().then((res)=>{
            setProposals(res.result);
        }).catch((err) =>{
            alert(err)
        })
    },[])
    return (
        <div className="proposal-list">
            <div className="proposal-list-main">
                {
                    proposals.map(proposal =>{
                    return <ProposalLink value={proposal}/>
                    })
                }
            </div>
            <div className="proposal-pagination"></div>
        </div>
    )
}