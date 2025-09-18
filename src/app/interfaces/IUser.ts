export interface User{
    id:number
    username:string
    avatar:string
    location:string
    age:number
    email:string
    password:string
    job:string
    role:'owner'|'admin'
}
