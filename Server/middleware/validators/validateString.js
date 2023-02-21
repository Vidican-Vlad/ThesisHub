import customError from "../../utils/customError.js"
function validateString(arg, fieldName, length=1){
    try{
        if(!arg)
            throw new customError("value for "+ fieldName+" is missing", 400);
        if(typeof arg !== 'string')
            throw new customError("value for "+ fieldName +" is not the expected type", 400);
        if(arg.trim().length < length)
            throw new customError("value for " + fieldName + " is too short",400)
    }
    catch(error){
        throw error
    }
}

export { validateString };