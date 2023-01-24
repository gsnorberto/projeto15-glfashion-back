import  jwt  from "jsonwebtoken";

export const checkToken = (req, res, next) => {
    const authHeader = req.headers['authorization']; // Ex: "Bearer $gfasfgd$%6"
    const token = authHeader && authHeader.split(' ')[1]

    if(!token){
        return res.status(401).json({ msg: "Acesso negado!" })
    }

    try{
        const secret = 'qwerty1234' // TEMPORARY

        jwt.verify(token, secret)

        next()
    } catch (err) {
        res.status(401).json({ msg: "Token inválido!" })
    }
}