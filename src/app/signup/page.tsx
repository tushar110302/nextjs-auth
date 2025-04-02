"use client"
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';

function SignUp() {

  const router = useRouter();
  const [user, setUser] = useState({
    "email": "",
    "password": "",
    "username": ""
  })
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log(response.data);
      router.push("/login");

    } catch (error: any) {
      console.log('Sign Up Failed');
      toast.error("Sign Up Failed");
    }
    finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
      setButtonDisabled(false);
    }
    else{
      setButtonDisabled(true);
    }
  }, [user])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
        <h1 className='text-4xl my-5'>{loading ? "Processing" : "Signup"}</h1>
        <hr />
        <label htmlFor="username">username</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 "
            id="username"
            type="text"
            value={user.username}
            onChange={(e) => setUser({...user, username: e.target.value})}
            placeholder="username"
            />
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
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="password"
            />
          <button
          onClick={onSignup}
          disabled={buttonDisabled}
          className={ `${buttonDisabled ? 'cursor-not-allowed' : 'cursor-pointer'} py-2 px-6 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600`}>{buttonDisabled ? "No signup" : "Signup"}
          </button>
          <Link className='py-2 px-3  bg-slate-900 rounded-lg border' href="/login">Visit login page</Link>
    </div>
  )
}


export default SignUp