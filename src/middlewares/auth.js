const AdminAuth =(req,res,next)=>{
    var token = 99
    var auth = token ==99;
    if(!auth){
        res.status(400).send("Unathouized attempt")
    }else(
        next()
    )
}

const UserAuth =(req,res,next)=>{
    var token = 99
    var auth = token ==99;
    if(!auth){
        res.status(400).send("Unathouized attempt")
    }else(
        next()
    )
}


module.exports={
    AdminAuth:AdminAuth,
    UserAuth: UserAuth
}