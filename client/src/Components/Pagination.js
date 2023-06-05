import { useEffect, useState } from "react"
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import "../css/pagination.css";
import arrayRange from "../utils";
import { ProposalLink } from "./ProposalLink";
import { PaginationLink } from "./PaginationLink";
export const Pagination = ({apiCall, total}) =>{
    const [currentPage, setCurrentPage] = useState(1);
    const [nextPages, setNextPages] = useState([]);
    const [operationCompleted, setOperationCompleted] = useState(false);

    
    useEffect(() =>{
        if(operationCompleted){
            setNextPages(generateNextPages());
            setOperationCompleted(false);
        }
    }, [operationCompleted]);

    useEffect(()=>{
        setNextPages(generateNextPages());
    },[total]);

    const handlePageChange = (index) =>{
        if(index => 1 && index <= total && index != currentPage){
            setCurrentPage(index);
            apiCall(index);
            setOperationCompleted(true);
        }
    }
    const increment = ()=>{
        handlePageChange(currentPage+1);
    }
    const decrement = ()=>{
        handlePageChange(currentPage-1);
    }

    const generateNextPages = ()=>{
        let startIndex, endIndex;
        if(total - currentPage < 2){
            startIndex = Math.max(total - 4, 1);
        }else{
            startIndex = Math.max(currentPage-2, 1);
        }
        if(currentPage  <= 2){
            endIndex = Math.min(5, total);
        }else{
            endIndex = Math.min(currentPage+2, total);
        }
        return arrayRange(startIndex, endIndex, 1);
    }
 
    return (
        <div className="pagination">
            <div className="pagination-arrows">      
            <MdArrowBackIosNew onClick={decrement} style={{visibility: (currentPage > 1) ? "visible" : "hidden"}}/>
                <h3>{currentPage}</h3>
            <MdArrowForwardIos onClick={increment} style={{visibility: (currentPage < total) ? "visible" : "hidden"}} />
            </div>
            <div className="pagination-page-list">
                {
                    nextPages.map(el=>{
                        // return <p key={el} style={{color: (el == currentPage) ? 'red' : 'white' }} onClick={apiCall}>{el}</p>
                        return <PaginationLink key = {el} currentPage = {currentPage} index = {el} apiCall={handlePageChange}/>
                    })
                }
            </div>
        </div>
    )
}