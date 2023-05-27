import { SuggestedUser } from "./SuggestedUser"


export const SuggestedUserList = ({users})=>{

    return(
        <div className="suggested-users-list">
            {
                (users.length === 0) ?
                <p>no users were found</p>
                :
                users.map(user =>{
                    return <SuggestedUser key = {user._id} user={user}/>
                })
            }
        </div>
    )
}