import allUsers from '../../api/allUsers';

const UserManagement = () => {

    const [users, refetch] = allUsers();
    console.log("Curren user )0-0()0-0()0-0()0-0()0-0()0-0(", users)

    return (
        <div>
            <h1 className='text-xl font-bold'>User list</h1>
            <table className="border-collapse border border-gray-400 w-full text-left">
                <thead className="bg-gray-200">
                    <tr className='text-center'>
                        <th className="border border-gray-400 px-4 py-2">Name</th>
                        <th className="border border-gray-400 px-4 py-2">Email</th>
                        <th className="border border-gray-400 px-4 py-2">Role</th>
                        <th className="border border-gray-400 px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users && users.map((user) => (

                    <tr>
                        <td className="border border-gray-400 px-4 py-2 text-center">{user?.name}</td>
                        <td className="border border-gray-400 px-4 py-2 text-center">{user?.email}</td>
                        <td className="border border-gray-400 px-4 py-2 text-center">{user?.isAdmin === false ? "Regular User" : "Admin"}</td>
                        <td className="border border-gray-400 px-4 py-2 flex justify-center items-center space-x-2">
                        <button className='bg-blue-400 rounded-sm px-2 py-0.5 cursor-pointer hover:scale-110 transition duration-200'>View</button>
                        <button className='bg-red-400 text-white px-4 py-0.5 rounded-sm cursor-pointer hover:scale-110 transition duration-200'>Block</button>
                        <button className='bg-black text-white px-2 py-0.5 rounded-sm cursor-pointer hover:scale-110 transition duration-200'>Delete</button>
                        </td>
                    </tr>
                        ))
                    }
                </tbody>
            </table>
            {/* modal */}
            <div className='inset-0 bg-black/20 z-40 fixed'>
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 w-xl z-50 bg-white'>
                    <h1 className='text-center'>This is modal</h1>
                </div>

            </div>
        </div>
    );
};

export default UserManagement;