import jwt from "jsonwebtoken"

function auth (req, res, next){
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            
            let token = req.headers.authorization.split(" ")[1];
            req.user = jwt.verify(token, process.env.AUTH_SECRET);
            next();

        } catch (error) {
            console.log(error)
            return res.status(400).json(error);
        }
    }
    else{
        return res.status(400).json({msg:"auth token not found or invalid format"})
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

export { auth, authWS, authWS2 };