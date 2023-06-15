
const validateString = (s, attribute, len=3)=>{
    if(!s)
        return "missing value for " + attribute + "\n";
    if(typeof s !== 'string')
        return "value for " + attribute + " was not of type string\n";
    if(s.trim().length < len)
        return "Value for " + attribute + " was too short or invalid\n";
    return "";
}

const validateEmail = (email) =>{
   
    let err = validateString(email, "email")
    const splitAround = email.trim().split("@");
    let splitPoint;
    if(splitAround.length !== 2 || splitAround[0].length == 0 || splitAround[1].length == 0)
        err+='missing @ from email field or invalid format\n'
    else{
        splitPoint = splitAround[1].split(".")
        if(splitPoint.length !== 2 || splitPoint[0].length == 0 || splitPoint[1].length == 0)
            err+='missing . from the second part of the email or invalid format\n'
        }
    return err;
}
const validateName =(name, attribute) =>{
    let spChar = /[!@#$%^&*()_+\-=\[\]{};':\\|,.<>\/?]+/;
    let nmb = /[01234567890]/;
    let err = validateString(name, attribute);
    if(spChar.test(name))
        err+=attribute + " can't contain special characters\n";
    if(nmb.test(name))
        err+=attribute + " can't contain numbers\n";
    return err;
}
const validatePassword = (pwd)=>{
    let spChar = /[!@#$%^&*()_+\-=\[\]{};':\\|,.<>\/?]+/;
    let nmb = /[01234567890]/;
    let bgL = /[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/;
    let smL = /[abcdefghijklmnopqrstuvwxyz]/;
    let err = validateString(pwd, "password");

    if(!spChar.test(pwd) || !nmb.test(pwd) || !bgL.test(pwd) || !smL.test(pwd))
        err+="Password does not meet the minimum complexity\n"
    return err
}

const validateRegister = (pass, confirmPass, email, fname, lname) =>{
    let err = validateEmail(email);
    err+=validatePassword(pass);
    err+=validateName(fname, "first name");
    err+=validateName(lname, "last name");
    if(pass !== confirmPass)
        err+="the password confirmation doesn't match the password\n"
    return err;
}

const validateLogin = (pass, email) =>{
    let err = validateEmail(email);
    err += validatePassword(pass); 
    return err;
}

export { validateRegister, validateLogin }

