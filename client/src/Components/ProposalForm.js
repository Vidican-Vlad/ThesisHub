import { FormInput } from "./FormInput"
import { RadioQuestion } from "./RadioQuestion";
export function ProposalForm({descriptionRef, changeTitle, onChangeFile, changeCycle, cycle, handleSubmit}){
    const accType = localStorage.getItem("accType");
    function handleClick(){
        handleSubmit();
    }
    const handleFileChange = (e)=>{
        onChangeFile(Array.from(e.target.files));
    }
    return (
        <div className="create-proposal-form-wrapper">
            <div className="create-proposal-form">
                <FormInput type="text" name="title" text="the title of your proposal..." handleChange = { changeTitle }></FormInput>
                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description" placeholder="please describe your proposal..." ref={descriptionRef}></textarea>
                <button type="submit" onClick={handleClick}>submit</button>
                {accType === "Profesor" && <RadioQuestion question="for which study cycle is it ?" options={[{value:"Licenta", text: "Bachelor's degree"}, {value: "Master", text: "Master's degree"}]} checked={cycle} handleClick={changeCycle}/>}
                <input type="file" onChange={handleFileChange} multiple/>
            </div>
        </div>
    )
}