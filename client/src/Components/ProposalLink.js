import react, {useEffect, useState} from "react";
import "../css/homepage.css"
import { Link } from "react-router-dom";
export const ProposalLink = ({value}) =>{

    return (
        <Link to={"/proposal/"+value._id}>
            <div className="proposal-link">
                <p>{value.title}</p>
                <p>{value.description}</p>
                <div className="propsal-link-footer">
                    <div className="proposal-link-footer-taglist">
                        <p>tags:  </p>
                        {
                            value.tags.map(tag=>{
                                return <p key={tag.name}>{tag.name}</p>
                            })
                        }
                    </div>
                    <p>cycle: {value.studyCycle}</p>
                </div>
            </div>
        </Link>
    )
}