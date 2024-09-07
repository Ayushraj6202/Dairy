import React, { useState } from "react";
import {NavLink,Link} from 'react-router-dom'
import {useForm} from 'react-hook-form'


export default function Login(){
    const [error,setError] = useState(false);
    const { register,handleSubmit } = useForm()
    const login = async (data) => {
        setError('')
        try {

        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <div
            className='my-10 flex items-center justify-center w-full'
        >
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        logo
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
                        <input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email",{
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        
                        <input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password",{
                                required: true,
                            })}
                        />
                        <button
                            type="submit"
                            className="w-full"
                        >Sign in</button>
                    </div>
                </form>
            </div>
        </div>
    )
}