'use client'
import axios from "axios";
import { User } from "../interfaces/IUser";
import { useState } from "react";
import { useUpdateUser } from "../_Hooks/updateuser";

const Edit_User = ({ user, onSave }: { user: User, onSave: (updatedUser: User) => void; }) => {
    const [formData, setFormData] = useState<User>(user);
    const {mutate,isPending} = useUpdateUser()
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const Edituser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formdata = new FormData(e.currentTarget)
        const upadater: User = {
            id: user.id,
            username: formdata.get('username') as string,
            email: formdata.get('email') as string,
            age: Number(formdata.get('age')),
            location: formdata.get('location') as string,
            job: formdata.get('Job') as string,
            avatar: user.avatar,
            password: user.password,
            role: user.role
        };
        mutate(
            {id:user.id,data:upadater},{
                onSuccess(data, variables, onMutateResult, context) {
                    onSave(data)
                },
            }
        )
        
        }
    return (
        <form onSubmit={Edituser}>
            <div className="flex justify-between items-center flex-row gap-16">
                <div className="flex flex-col">
                    <label htmlFor="Username" className="text-xl text-cyan-300 font-bold">Username:</label>
                    <input type="text" name="username" onChange={handleChange} value={formData.username} className="border-2 p-1 pr-9 bg-gray-100" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="Email" className="text-xl text-cyan-300 font-bold">Email:</label>
                    <input type="email" name="email" onChange={handleChange} value={formData.email} className="border-2 p-1 pr-9 bg-gray-100" />
                </div>
            </div>
            <div className="flex flex-col mt-11">
                <div className="flex flex-col">
                    <label htmlFor="Age" className="text-xl text-cyan-300 font-bold">Age</label>
                    <input type="number" onChange={handleChange} value={formData.age} className="border-2 p-2 pr-9 bg-gray-100" name="age" id="" />
                </div>
                <div className="flex flex-col mt-4">
                    <label htmlFor="location" className="mb-3 text-xl text-cyan-300 font-bold">Location:</label>
                    <input type="text" onChange={handleChange} value={formData.location} className="border-2 p-2 pr-9 bg-gray-100" name="location" id="" />
                </div>
                <div className="flex flex-col mt-4">
                    <label htmlFor="Job" className="mb-3 text-xl text-cyan-300 font-bold">Job:</label>
                    <input type="text" onChange={handleChange} value={formData.job} className="border-2 p-2 pr-9 bg-gray-100" name="Job" id="" />
                </div>
            </div>
            <div className="flex justify-between w-full px-3 mt-3">
                <input
                    className="shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded"
                    type="submit" value={'Edit'} />

            </div>
        </form>
    );
}

export default Edit_User;