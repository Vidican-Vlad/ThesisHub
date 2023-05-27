
 export const PaginationLink = ({index, currentPage, apiCall}) =>{
    
    function handleClick(){
        apiCall(index);
    }
    return (
        <p style = {{color: (index == currentPage) ? 'red' : 'white' }} onClick={handleClick}>
            {index}
        </p>
    )
 }