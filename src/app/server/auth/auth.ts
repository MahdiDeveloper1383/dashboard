import { NextApiRequest, NextApiResponse } from "next"
import { Users } from "../users"
import { User } from "../../interfaces/IUser"
type data={
    token?:string
    role?:'admin'|'owner'
    message?:string
}
export default function handler(req:NextApiRequest,res:NextApiResponse<data>){
    if (req.method !== "POST") {
        return res.status(405).json({message:'method not Allwoed'})
    }
    const {username,password} = req.body
    if (Math.random() < 0.1) {
        return res.status(500).json({message:'conection faild'})
    }
    const user:User | undefined = Users.find((u)=>u.username === username && u.password === password)
    if (!user) {
        return res.status(401).json({message:'username or password is wrong'})
    }
    const token = `JWT-TOKEN-${user.id}`
    return res.status(200).json({token,role:user.role})
}
