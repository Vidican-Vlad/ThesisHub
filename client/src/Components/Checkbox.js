
export const Checkbox = ({text, checked, onClick}) => {
    function handleChange(){
        onClick(text);
    }

    return(
        <div className = {checked ? "checkbox-checked" : "checkbox-unchecked"} onClick={handleChange}>
            <p>{text}</p>
        </div>
    )
}