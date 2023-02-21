import jwt from "jsonwebtoken"

function auth (req, res, next){
    // let token;

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

export { auth };