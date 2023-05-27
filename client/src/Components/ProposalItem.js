
import { getFileFromBackend } from "../api/proposals";
import "../css/comment.css";
import "../css/proposal.css";
import { BsFileZip, BsFiletypeDoc, BsFiletypeDocx, BsFiletypeJpg, BsFiletypeMd, BsFiletypePdf, BsFiletypePng, BsFiletypePptx, BsFiletypePpt, BsFiletypeTxt, BsFile } from "react-icons/bs";
export const ProposalItem = ({proposalData}) =>{
    console.log(proposalData);

    async function handleClick(fileID, name){
        try {
            const res = await getFileFromBackend(fileID);
            const url = URL.createObjectURL(res);
            const link = document.createElement('a');
            link.href = url;
            link.download = name;
            link.click();
        } catch (err) {
            console.log(err);
        }
    }

    function determineIcon(extension){
        switch (extension){
            case 'jpg':
                return <BsFiletypeJpg/>
            case 'png':
                return <BsFiletypePng/>
            case 'zip':
                return <BsFileZip/>
            case 'doc':
                return <BsFiletypeDoc/>
            case 'docx':
                return <BsFiletypeDocx/>
            case 'md':
                return <BsFiletypeMd/>
            case 'pdf':
                return <BsFiletypePdf/>
            case 'ppt':
                return <BsFiletypePpt/>
            case 'pptx':
                return <BsFiletypePptx/>
            case 'txt':
                return <BsFiletypeTxt/>
            default:
                return <BsFile/>
        }
    }  
    return(
        <div className = "proposal-item-main">
            <div className = "proposal-item-title">
                <p>{proposalData.title}</p>
            </div>
            <div className= "proposal-item-tbd">
                <div className="proposal-item-description">
                    <p>{proposalData.description}</p>
                </div>
                <div className= "proposal-item-taglist">
                    {
                        proposalData.tags.map(tag =>{
                            return  <div className = "proposal-item-tag" key = {tag._id}>
                                        <p>{tag.name}</p>
                                    </div>
                        })
                    }
                </div>
            </div>
            <div className= "proposal-item-attachementList">
                {
                    proposalData.attachements.map(attachement =>{
                        return <div className="proposal-item-list" key={attachement._id}>
                                    
                                    <div className="attachment" onClick = {()=> handleClick(attachement._id, attachement.displayName)}>
                                        {determineIcon(attachement.extension)}
                                        {attachement.displayName}
                                    </div>
                                </div>
                    })
                }
            </div>
        </div>
    )
}