"use client"
import { useState, useRef } from 'react';
import Image from 'next/image';
import Header from '../components/Header';
import { useRouter } from 'next/navigation';
import { useLogin } from '@/app/components/contexts/LoginContext';

export default function SignUpForm() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [btnText, setBtnText] = useState("Login")
    const [isDisabled, setIsDisabled] = useState(false)
    const ref = useRef(false)
    const { setIsLoggedIn } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsDisabled(true)
        setBtnText("Logging you in...")
        try {
            let response = await fetch("/api/appuser/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });
            response = await response.json()
            setEmail("")
            setPassword("")

            if (response.success) {
                let result1 = await fetch(`http://localhost:3000/api/appuser/login/${email}`, {
                    cache: 'no-store',
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        toggle: true,
                    })
                })
                result1 = await result1.json()
                let result = await fetch(`http://localhost:3000/api/appuser/login/${email}`, {
                    cache: 'no-store',
                })
                ref.current = true
                result = await result.json()
                setIsLoggedIn(true)
                alert(response.message)
                setIsDisabled(false)
                setBtnText("Login")

                // Redirect based on admin status
                const redirectPath = response.isAdmin ? "/admin" : "/user"
                router.push(redirectPath)
                router.refresh()
            } else {
                alert(response.message)
                setIsDisabled(false)
                setBtnText("Login")
            }
        } catch (error) {
            alert(error)
            setIsDisabled(false)
            setBtnText("Login")
        }
    };

    return (
        <>
            <Header />
            <form
                onSubmit={handleSubmit}
                className="w-[80%] pt-20 md:w-[40%] py-2 mx-auto gap-5 flex flex-col" >

                <div className="py-2">
                    <h1 className="text-2xl font-bold text-center">User Login</h1>
                </div>
                <div className='text-center'>
                    Don't have an account yet?<a className="text-blue-500" href="/register">Signup</a>
                </div>
                <div className="mx-11 md:mx-11">

                    <div>
                        <label htmlFor="name" className="mb-2">Email Id</label>
                        <div className="flex w-full mb-2">
                            <span className="shadow inline-flex items-center px-4 bg-gray-100 border border-e-0 border-gray-300 rounded-s-md">
                                <Image
                                    src="/username.svg"
                                    alt='img'
                                    width={30}
                                    height={30}
                                    priority
                                />
                            </span>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                type="email"
                                placeholder="Enter Your Email"
                                className="rounded-e-lg text-black w-[100%] p-2.5"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="mb-2">Password</label>
                        <div className="flex mb-2">
                            <span className="shadow inline-flex items-center px-4 bg-gray-100 border border-e-0 border-gray-300 rounded-s-md">
                                <Image
                                    src="/password.svg"
                                    alt='img'
                                    width={30}
                                    height={30}
                                    priority
                                />
                            </span>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                type="password"
                                placeholder="Enter Your Password"
                                className="rounded-e-lg text-black w-[100%] p-2.5"
                            />
                        </div>

                    </div>
                    <div className="flex justify-center gap-16">
                        <button disabled={isDisabled} type="submit" className="w-full py-3 text-white text-lg font-semibold rounded-md 
                    bg-gradient-to-r from-blue-500 to-indigo-600 mx-40 mt-4 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition duration-75 ease-in-out hover:scale-105 active:scale-95 shadow-md hover:shadow-lg" >
                            {btnText}
                        </button>
                    </div>
                </div>
            </form >
        </>
    );
}