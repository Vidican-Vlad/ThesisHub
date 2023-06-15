import { GiTeacher } from "react-icons/gi";
import { FaUserGraduate } from "react-icons/fa";
export const CommentItem = ({comment}) =>{
    return(
        <div className="comment-item">
            <p>{comment.content}</p>
            <div className="comment-item-footer">
                <div className="comment-item-footer-nameAndType">
                    {comment.owner.type === "Student" ? <FaUserGraduate/> : <GiTeacher/>}
                    <p>{comment.owner.name}</p>
                </div>
                <p>{new Date(comment.postedAt).toLocaleDateString("ro-RO", { day: "numeric", month: "numeric", year: "numeric"})}</p>
            </div>
        </div>
    )
}