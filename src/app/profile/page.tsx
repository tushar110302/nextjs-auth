"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

function Profile() {
    const router = useRouter();
    const [user, setUser] = useState('')

    const getUserDetails = async () => {
        try {
            const response = await axios.post('/api/users/profile');
            console.log(response.data.data);
            setUser(response.data.data._id);
        } catch (error) {
            console.log(error);
        }
    }

    const logout = async () => {
        try {
            await axios.get('/api/users/logout');
            toast.success("Logout Successfully");
            router.push("/login");
        } catch (error: any) {
            toast.error(error)
        }
    }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>Profile</h1>
        <hr />
        <p>Profile page</p>
        <h2 className="p-1 rounded bg-green-500">
            {
                user === 'nothing' ? "Nothing" : 
                <Link href={`/profile/${user}`}>{user}</Link>
            }
        </h2>
        <hr />
        <button
        onClick={logout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
            Logout
        </button>

        <button
        onClick={getUserDetails}
        className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
            GetUser Details
        </button>


    </div>
  )
}

export default Profile