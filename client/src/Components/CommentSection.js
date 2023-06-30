import { CommentItem } from "./CommentItem"
import { useEffect, useState, useRef } from "react"
import { getComments, createComment } from "../api/proposals";
import "../css/comment.css"
import { Box, VStack } from "@chakra-ui/react";
export const CommentSection = ({proposalID})=>{
    const textboxRef = useRef(null);
    const commentListRef = useRef(null);
    const [commentList, setCommentList] = useState([]);
    const [isloading, setIsLoading] = useState(true);

    async function getData(){
        try {
                let commentsTemp = await getComments(proposalID);
                setCommentList(commentsTemp);
                setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    }

    async function postComment (){
        try {
            let tempcomm = await createComment(proposalID, {content:textboxRef.current.value});
            setCommentList((prevCommentList) => [...prevCommentList, tempcomm]);
            textboxRef.current.value = "";
        } catch (err) {
            console.log(err);
        }
    }
    function handleChange(e){
        if(e.keyCode === 13 ){
            e.preventDefault();
            if(e.shiftKey){
                textboxRef.current.value += "\n";
            }
            else{
                postComment();
            }
        }
    }
    useEffect(()=>{
        const comments = commentList.current
        if(comments){
            commentListRef.scrollTop = commentListRef.scrollHeight;
        }
    }, [commentList]);
    useEffect(()=>{
        getData();
    }, []);



    return(
        <>
        {!isloading &&
        <div className="Comment-section">
            <div className="Comments" ref={commentListRef}>
                {
                    commentList.map(comment =>{
                        return <CommentItem key={comment._id} comment={comment}/>
                    })
                }
            </div>
            <div className="Add-comment">
                <textarea id="message" name="message" placeholder= {"press <Shift> + <Enter> to send the message ..."} ref={textboxRef} onKeyDown={(e)=>{handleChange(e)}}></textarea>
            </div>
        </div>
        }
        </>
    )
}