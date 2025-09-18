import { User } from "../interfaces/IUser";

const Edit_User = ({user}:{user:User}) => {
    return ( 
        <form action="">
                        <div className="flex justify-between items-center flex-row gap-16">
                        <div className="flex flex-col">
                            <label htmlFor="Username" className="text-xl text-cyan-300 font-bold">Username:</label>
                          <input type="text" defaultValue={user.username} className="border-2 p-1 pr-9 bg-gray-100" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="Email" className="text-xl text-cyan-300 font-bold">Email:</label>
                            <input type="email" defaultValue={user.email} className="border-2 p-1 pr-9 bg-gray-100"  />
                        </div>
                        </div>
                        <div className="flex flex-col mt-11">
                            <div className="flex flex-col">
                                <label htmlFor="Age" className="text-xl text-cyan-300 font-bold">Age</label>
                                <input type="number" defaultValue={user.age}  className="border-2 p-2 pr-9 bg-gray-100" name="" id="" />
                            </div>
                            <div className="flex flex-col mt-4">
                                <label htmlFor="location" className="mb-3 text-xl text-cyan-300 font-bold">Location:</label>
                                <input type="text" defaultValue={user.location}  className="border-2 p-2 pr-9 bg-gray-100" name="" id="" />
                            </div>
                        </div>
                        <div className="flex justify-between w-full px-3 mt-3">
                    <button
                        className="shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded"
                        type="submit">
                        Edit
                    </button>
                </div>
                    </form>
     );
}
 
export default Edit_User;