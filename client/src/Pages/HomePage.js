import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../api/auth";
import { Navbar } from "../Components/Navbar";
import { ProposalList } from "../Components/ProposalList";
import { SearchFilterFunction } from "../Components/SearchFilterFunction";
import { Button, ButtonGroup } from '@chakra-ui/react'
import { getFilteredProposals } from "../api/proposals";


export function HomePage(){
    const navigate = useNavigate();
    const [studyCycle, setStudyCycle] = useState("");
    const [targetUser, setTargetUser ] = useState("");
    const [tagsList, setTagsList] = useState([]);
    const [proposals, setProposals] = useState([]);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [logicalOperator, setLogicalOperator] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [total, setTotal] = useState(1);

    function drawerClose(){
        setDrawerOpen(false);
    }
    function openDrawer(){
        if(!drawerOpen){
            setDrawerOpen(true);
        }   
    }
    async function searchForProposals(page){
        let temp = {
            studyCycle,
            targetUser,
            title: title,
            description: description,
            logicalOperator,
            tagsList: tagsList.map(el => el._id),
            page:page,
            limit:4
        }
        let result = await getFilteredProposals(temp);
        setProposals(result.proposals);
        setTotal(result.total);
        console.log(result);
        console.log(page);
    }


    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token === null || token === ""){
            navigate("/auth");
        }
        searchForProposals(1);
    },[])
    
    return(
        <div className="homepage">
            
            <SearchFilterFunction drawerOpen = {drawerOpen}
            drawerClose = {drawerClose}
            studyCycle = {studyCycle}
            targetUser = {targetUser}
            tagsList = {tagsList}
            logicalOperator = {logicalOperator}
            setStudyCycle = {setStudyCycle}
            setTargetUser = {setTargetUser}
            setLogicalOperator = {setLogicalOperator}
            setTagsList = {setTagsList}
            title = {title}
            description = {description}
            setTitle = {setTitle}
            setDescription = {setDescription}
            searchForProposals = {searchForProposals}
            />
            <Navbar/>
            <Button colorScheme='teal' variant='solid' onClick={openDrawer}>
                show filters!
            </Button>
            <ProposalList proposals = {proposals} total = {total} searchForProposals = {searchForProposals}/>
        </div>
    )
}