"use client"
import { useState } from 'react';
import Image from 'next/image';
import Header from '../components/Header';
import { useRouter } from 'next/navigation';

export default function SignUpForm() {
    const router = useRouter()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [btnText, setBtnText] = useState("Register")
    const [isDisabled, setIsDisabled] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsDisabled(true)
        setBtnText("Registering...")
        try {
            let response = await fetch("/api/appuser/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });
            response = await response.json()
            setName("")
            setEmail("")
            setPassword("")
            if (response.success) {
                alert(response.message)
                setIsDisabled(false)
                setBtnText("Register")
                router.push("/login")
                router.refresh()
            } else {
                alert(response.message)
                setIsDisabled(false)
                setBtnText("Register")
            }
        } catch (error) {
            alert(error)
            setIsDisabled(false)
            setBtnText("Register")
        }
    };

    return (
        <>
            <Header />
            <form
                onSubmit={handleSubmit}
                className="w-[80%] pt-20 md:w-[40%] py-2 mx-auto gap-5 flex flex-col" >

                <div className="py-2">
                    <h1 className="text-2xl font-bold text-center">User Registration</h1>
                </div>
                <div className='text-center'>
                    Already have an account?<a className="text-blue-500" href="/login">Login</a>
                </div>

                <div className="mx-11 md:mx-11">
                    <div>
                        <label htmlFor="name" className="mb-2">Full Name</label>
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
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                type="text"
                                placeholder="Enter Your Name"
                                className="rounded-e-lg text-black w-[100%] p-2.5"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="mb-2">Email Id</label>
                        <div className="flex w-full mb-2">
                            <span className="shadow inline-flex items-center px-4 bg-gray-100 border border-e-0 border-gray-300 rounded-s-md">
                                <Image
                                    src="/email.svg"
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
                                placeholder="Create Your Password"
                                className="rounded-e-lg text-black w-[100%] p-2.5"
                            />
                        </div>
                    </div>

                    <div className="flex justify-center gap-16">
                        <button
                            disabled={isDisabled}
                            type="submit"
                            className="w-full py-3 text-white text-lg font-semibold rounded-md 
                                bg-gradient-to-r from-blue-500 to-indigo-600 mx-40 mt-4 
                                hover:from-blue-600 hover:to-indigo-700 focus:outline-none 
                                focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                                transform transition duration-75 ease-in-out hover:scale-105 
                                active:scale-95 shadow-md hover:shadow-lg"
                        >
                            {btnText}
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}