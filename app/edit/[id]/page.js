"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Header from "@/app/components/Header";

// Changed function name from 'edit' to 'Edit' to follow React component naming convention
export default function Edit({ params }) {
    const router = useRouter()
    const [newName, setNewName] = useState("");
    const [newPhone, setNewPhone] = useState("")
    const [newCompany, setNewCompany] = useState("");
    const [newAddress, setNewAddress] = useState("");
    const [newType, setNewType] = useState("")
    const [newPurpose, setNewPurpose] = useState("")
    const [newCompname, setNewCompname] = useState("")
    const [newCompadd, setNewCompadd] = useState("")

    useEffect(() => {
        async function getdata() {
            let response = await fetch(`http://localhost:3000/api/users/${params.id}`, {
                cache: 'no-store',
                method: 'GET'
            })
            response = await response.json()

            setNewName(response.data.name)
            setNewPhone(response.data.phone)
            setNewCompany(response.data.company)
            setNewAddress(response.data.address)
            setNewType(response.data.type)
            setNewPurpose(response.data.purpose)
            setNewCompname(response.data.compname)
            setNewCompadd(response.data.compadd)
        }

        getdata()
    }, [params.id]) // Added params.id as a dependency

    const handlesubmit = async (e) => {
        e.preventDefault()
        try {
            let result = await fetch(`http://localhost:3000/api/users/${params.id}`, {
                cache: 'no-store',
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    newName,
                    newPhone,
                    newCompany,
                    newAddress,
                    newType,
                    newPurpose,
                    newCompname,
                    newCompadd
                })
            })
            result = await result.json()
            if (result.success) {
                alert(result.message)
                router.refresh()
                router.push(`/admin`)
            } else {
                alert("Couldn't update record ")
            }
        } catch (error) {
            alert(error)
        }
    }

    const handledelete = async (e) => {
        e.preventDefault()
        if (confirm("Are you sure you want to delete this user info?") === true) {
            try {
                let response = await fetch(`http://localhost:3000/api/users/${params.id}`, {
                    cache: 'no-store',
                    method: 'DELETE',
                });
                let data = await response.json()
                alert(data.message)
                router.refresh()
                router.push('/admin')
            } catch (error) {
                alert(error)
            }
        }
        else {
            alert("Record not deleted")
        }
    }

    return (
        <>
            <Header />
            <div className="mt-2">
                <form onSubmit={handlesubmit} onReset={handledelete}
                    className="relative border w-[70%] pt-16 md:w-[55%] py-2 mx-auto gap-5 flex flex-col" >
                    <div className="mx-auto py-2">
                        <h1 className="text-2xl font-bold text-center">Edit Details</h1>
                    </div>
                    <div className="mx-auto md:grid md:grid-cols-2 md:gap-6">
                        <div className="">
                            <label htmlFor="name" className="mb-2 ">Username</label>
                            <div className="flex w-full mb-2">
                                <span className="inline-flex items-center px-4 bg-gray-100 border border-e-0 border-gray-300 rounded-s-md ">
                                    <Image
                                        src="/person1.svg"
                                        alt="img"
                                        width={30}
                                        height={30}
                                        priority
                                    />
                                </span>
                                <input
                                    onChange={(e) => setNewName(e.target.value)}
                                    value={newName}
                                    type="text"
                                    id="name"
                                    placeholder="Your Name"
                                    className="rounded-e-lg text-black w-[100%]  p-2.5 " />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="name" className="mb-2 ">Phone</label>
                            <div className="flex w-full mb-2">
                                <span className="inline-flex items-center px-4 bg-gray-100 border border-e-0 border-gray-300 rounded-s-md ">
                                    <Image
                                        src="/phone.svg"
                                        alt="img"
                                        width={30}
                                        height={30}
                                        priority
                                    />
                                </span>
                                <input
                                    onChange={(e) => setNewPhone(e.target.value)}
                                    value={newPhone}
                                    type="tel"
                                    id="phone"
                                    placeholder="+91-0000000000"
                                    className="rounded-e-lg text-black w-[100%] p-2.5"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="name" className="mb-2 ">Company</label>
                            <div className="flex w-full mb-2">
                                <span className="inline-flex items-center px-4 bg-gray-100 border border-e-0 border-gray-300 rounded-s-md ">
                                    <Image
                                        src="/company.svg"
                                        alt="img"
                                        width={30}
                                        height={30}
                                        priority
                                    />
                                </span>
                                <input
                                    onChange={(e) => setNewCompany(e.target.value)}
                                    value={newCompany}
                                    type="text"
                                    id="company"
                                    placeholder="Company Name"
                                    className="rounded-e-lg text-black w-[100%] p-2.5"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="name" className="mb-2 ">Company Address</label>
                            <div className="flex w-full mb-2">
                                <span className="inline-flex items-center px-4 bg-gray-100 border border-e-0 border-gray-300 rounded-s-md ">
                                    <Image
                                        src="/address.svg"
                                        alt="img"
                                        width={30}
                                        height={30}
                                        priority
                                    />
                                </span>
                                <input
                                    onChange={(e) => setNewAddress(e.target.value)}
                                    value={newAddress}
                                    type="text"
                                    id="address"
                                    placeholder="Company Address"
                                    className="rounded-e-lg text-black w-[100%] p-2.5"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="name" className="mb-2 ">Type</label>
                            <div className="flex w-full mb-2">
                                <span className="inline-flex items-center px-4 bg-gray-100 border border-e-0 border-gray-300 rounded-s-md ">
                                    <Image
                                        src="/person.svg"
                                        alt="img"
                                        width={30}
                                        height={30}
                                        priority
                                    />
                                </span>
                                <select
                                    onChange={(e) => setNewType(e.target.value)}
                                    value={newType}
                                    className="border rounded-e-lg block w-full p-2.5" name="cars" id="cars" form="carform">
                                    <option className="text-black" value="volvo">Guests</option>
                                    <option value="Interviewer">Interviewer</option>
                                    <option value="Courier">Courier</option>
                                    <option value="Client">Client</option>
                                    <option value="Vendor">Vendor</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="name" className="mb-2 ">Purpose</label>
                            <div className="flex w-full mb-2">
                                <span className="inline-flex items-center px-4 bg-gray-100 border border-e-0 border-gray-300 rounded-s-md ">
                                    <Image
                                        src="/purpose.svg"
                                        alt="img"
                                        width={30}
                                        height={30}
                                        priority
                                    />
                                </span>
                                <select
                                    onChange={(e) => setNewPurpose(e.target.value)}
                                    value={newPurpose}
                                    className="border rounded-e-lg block w-full p-2.5" name="cars" id="cars" form="carform">
                                    <option value="Meeting">Meeting</option>
                                    <option value="Parcel Delivery">Parcel Delivery</option>
                                    <option value="Parcel Pickup">Parcel Pickup</option>
                                    <option value="Job Interview">Job Interview</option>
                                    <option value="Sales Inquiry">Sales Inquiry</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <h1 className="text-base pt-3 font-bold text-left">Meeting With...</h1>
                    <div className="mx-auto md:grid md:grid-cols-2 md:gap-6">
                        <div>
                            <label htmlFor="name" className="mb-2 ">Name</label>
                            <div className="flex w-full mb-2">
                                <span className="inline-flex items-center px-4 bg-gray-100 border border-e-0 border-gray-300 rounded-s-md ">
                                    <Image
                                        src="/username.svg"
                                        alt="img"
                                        width={30}
                                        height={30}
                                        priority
                                    />
                                </span>
                                <input
                                    onChange={(e) => setNewCompname(e.target.value)}
                                    value={newCompname}
                                    type="text"
                                    id="empname"
                                    placeholder="Employee Name"
                                    className="rounded-e-lg text-black w-[100%] p-2.5"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="name" className="mb-2 ">Department</label>
                            <div className="flex w-full mb-2">
                                <span className="inline-flex items-center px-4 bg-gray-100 border border-e-0 border-gray-300 rounded-s-md ">
                                    <Image
                                        src="/department.svg"
                                        alt="img"
                                        width={30}
                                        height={30}
                                        priority
                                    />
                                </span>
                                <input
                                    onChange={(e) => setNewCompadd(e.target.value)}
                                    value={newCompadd}
                                    type="text"
                                    id="department"
                                    placeholder="Employee Department"
                                    className="rounded-e-lg text-black w-[100%] p-2.5"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center gap-16">
                        <button className="bg-gradient-to-r from-[#832121] via-[#a55151] to-[#d77878] rounded-lg px-9 py-3 text-white font-bold" type="reset">
                            Delete
                        </button>
                        <button className="bg-gradient-to-r from-[#216583] via-[#518ca5] to-[#78bad7] rounded-lg px-6 py-3 text-white font-bold" type="submit">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}