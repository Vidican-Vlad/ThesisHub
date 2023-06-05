import react, { useEffect, useState} from "react";
import { ProposalLink } from "./ProposalLink";
import { getProposals } from "../api/proposals";
import "../css/homepage.css"
import { Pagination } from "./Pagination";
export const ProposalList = ({proposals, total, searchForProposals}) =>{
    
    //const [total, setTotal] = useState(0);
    // useEffect(()=>{
    //     getProposals(1).then((res)=>{
    //         setProposals(res.result);
    //         setTotal(res.total);
    //     }).catch((err) =>{
    //         alert(err)
    //     })
    // },[])

    // useEffect(()=>{
    //     if(total > 0){
    //         setHasLoaded(true);
    //     }
    //     console.log(total);
    // },[total]);

    // const getProposalsPage = async(pageNr) =>{
    //     try {
    //         getProposals(pageNr).then((res)=>{
    //             setProposals(res.result);
    //             setTotal(res.total);
    //             console.log(res.total);
    //         })
    //     } catch (err) {
    //         alert(err)
    //     }
    // }
    return (
        <div className="proposal-list">
            <div className="proposal-list-main">
                {
                    (Array.isArray(proposals) && proposals.length > 0) && proposals.map(proposal =>{
                    return <ProposalLink value={proposal} key={proposal._id}/>
                    })
                }
            </div>

            {total && <Pagination apiCall = {searchForProposals} total={total}/>}
        </div>
    )
}