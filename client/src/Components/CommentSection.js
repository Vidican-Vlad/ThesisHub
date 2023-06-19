import { CommentItem } from "./CommentItem"
import { useEffect, useState, useRef } from "react"
import { getComments, createComment } from "../api/proposals";
import "../css/comment.css"
import { Box, VStack } from "@chakra-ui/react";
export const CommentSection = ({proposalID})=>{
    const textboxRef = useRef(null);
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

    useEffect(()=>{
        getData();
    }, []);



    return(
        <>
        {!isloading &&
        <div className="Comment-section">
            <div className="Comments">
                {
                    commentList.map(comment =>{
                        return <CommentItem key={comment._id} comment={comment}/>
                    })
                }
                {/* <VStack spacing={"2px"} align={"stretch"} height={"300px"}>
                {
                    
                }
                </VStack> */}
            </div>
            <div className="Add-comment">
                <textarea ref={textboxRef} placeholder="insert your comment here..."></textarea>
                <button onClick={postComment}>send</button>
            </div>
        </div>
        }
        </>
    )
}