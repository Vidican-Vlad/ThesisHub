import { FormInput } from "./FormInput"
// <FormInput type="text" name="description" text="Please describe your proposal..." handleChange = { changeDescription }></FormInput>

export function ProposalForm({descriptionRef, changeTitle, changeDescription, changeCycle, handleSubmit}){
    
    function handleClick(){
        handleSubmit();
    }
    return (
        <div className="create-proposal-form-wrapper">
            <div className="create-proposal-form">
                <FormInput type="text" name="title" text="the title of your proposal..." handleChange = { changeTitle }></FormInput>
                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description" placeholder="please describe your proposal..." ref={descriptionRef}></textarea>
                <button type="submit" onClick={handleClick}>submit</button>
            </div>
        </div>
    )
}