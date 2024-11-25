"use client"
import { useState, useEffect } from 'react';
import React from 'react'
import Image from 'next/image'

const Buttons = ({ userId }) => {
    const [newEntry, setNewEntry] = useState(false);
    useEffect(() => {
        async function getentry() {
            let result = await fetch(`http://localhost:3000/api/users/entry/${userId}`, {
                cache: 'no-store',


            })
            result = await result.json()
            setNewEntry(result.data.entry)
        }
        getentry()



    }, [])
    const handleentry = async (e) => {
        setNewEntry(e)
        try {
            let result = await fetch(`http://localhost:3000/api/users/entry/${userId}`, {
                cache: 'no-store',
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    newEntry: e
                })
            })
        } catch (error) {
            alert(error)

        }
    }

    return (
        <>       <center><button onClick={() => { handleentry(true) }} className="bg-green-400 my-1 hover:bg-green-500 text-green-800 font-bold  border-b-4 py-1 px-2 border-green-500 hover:border-green-600 rounded"><Image className='inline mx-1'
            src="/right.svg"
            alt='img'
            width={22}
            height={22}
            priority
        />
            Accept
        </button> <button onClick={() => { handleentry(false) }} className="bg-red-400 my-1 hover:bg-red-500 text-red-800 font-bold  border-b-4 py-1 px-3 border-red-500 hover:border-red-600 rounded">
                <Image className='inline mx-1'
                    src="/wrong.svg"
                    alt='img'
                    width={22}
                    height={22}
                    priority
                />Reject
            </button></center></>
    )
}

export default Buttons
