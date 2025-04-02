"use client"
import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

function Login() {
  const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
       
    })
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
        setLoading(true);
        const response = await axios.post("/api/users/login", user);
        console.log("Login success", response.data);
        toast.success("Login success");
        router.push("/profile");
    } catch (error:any) {
        console.log("Login failed", error.message);
        toast.error(error.message);
    } finally{
        setLoading(false);
    }
  }

  useEffect(() => {
      if(user.email.length > 0 && user.password.length > 0) {
          setButtonDisabled(false);
      } else{
          setButtonDisabled(true);
      }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className='text-4xl my-6'>{loading ? "Processing" : "Login"}</h1>
        <hr />
        
        <label htmlFor="email">email</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 "
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="email"
            />
        <label htmlFor="password">password</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 "
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="password"
            />
            <button
            onClick={onLogin}
            disabled={buttonDisabled}
            className={` ${buttonDisabled? 'cursor-not-allowed' : 'cursor-pointer'} py-2 px-6 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600`}>Login here</button>
            <Link className='py-2 px-3  bg-slate-900 rounded-lg border' href="/signup">Visit Signup page</Link>
    </div>
  )
}

export default Login