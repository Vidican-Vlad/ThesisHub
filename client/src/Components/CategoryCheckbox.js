
export const CategoryCheckbox = ({category, onClick}) => {
    function handleChange(){
        onClick(category._id);
    }
    
    return(
        <div className = "checkbox-unchecked" onClick={handleChange}>
            <p>{category.name}</p>
        </div>
    )
}