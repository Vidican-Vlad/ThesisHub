
export const Checkbox = ({text, tagID, checked, onClick}) => {
    function handleChange(){
        onClick({tagID, text});
    }

    return(
        <div className = {checked ? "checkbox-checked" : "checkbox-unchecked"}
        onClick={handleChange}>
            <p>{text}</p>
        </div>
    )
}