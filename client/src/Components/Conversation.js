


function determineUsertoShow(conversation, currentUser){
    
    return (conversation.user1._id === currentUser) ? conversation.user2 : conversation.user1;
}



export const Conversation = ({Conversation, selectedConversation, onChange, currentUser}) =>{
    const user = determineUsertoShow(Conversation, currentUser);
    function changeSelectedconversation(e){

        if(Conversation._id != selectedConversation){
            onChange(Conversation._id);
        }
    }
    return(
        <div className="conversation-component" onClick={(e)=>{changeSelectedconversation(e)}}>
            <p> {user.name} </p>
            <p> {user.email} </p>
        </div>
    )
}