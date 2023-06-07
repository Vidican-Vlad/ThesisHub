import jwt from "jsonwebtoken"

function auth (req, res, next){
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            
            let token = req.headers.authorization.split(" ")[1];
            req.user = jwt.verify(token, process.env.AUTH_SECRET);
            req.userOnboarded = true
            next();

        } catch (e) {
            try {
                req.user = jwt.verify(token, process.env.REGISTER_SECRET);
                req.userOnboarded = false
                next();                  
            } catch (error) {
                console.log(error)
                return res.status(400).json(error);
            }
        }
    }
    else{
        return res.status(400).json({msg:"auth token not found or invalid format"})
    }
}

function rejectUserTemp(req, res, next){
    try {
        if(req.userOnboarded === false)
            return res.status(400).json({msg: "the onboarding process must be fully completed before you can perform such actions"});
        next();
    } catch (error) {
        console.log(error)
        return res.status(400).json(error);
    }
}

function rejectUser(req, res, next){
    try {
        if(req.userOnboarded === true)
            return res.status(400).json({msg: "this action is available for  users in the process of onboarding only"});
        next();
    } catch (error) {
        console.log(error)
        return res.status(400).json(error);
    }
}

function authWS2(socket, next){
    try {
        const token = socket.handshake.auth.token;
        const user = jwt.verify(token, process.env.AUTH_SECRET);
        socket.user = user;
        next();
    } catch (error) {
        
        console.log(error);
        next(error)
    }
}

function authWS (token){
    const user = jwt.verify(token, process.env.AUTH_SECRET);
    return user;
}

export { auth, authWS, authWS2, rejectUserTemp, rejectUser  };