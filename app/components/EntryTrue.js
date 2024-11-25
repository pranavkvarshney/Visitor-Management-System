"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import Image from 'next/image'

const EntryTrue = ({ userId }) => {
    const router = useRouter()

    return (
        <button
            onClick={() => router.push(`/user/${userId}`)}
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
        >
            <Image
                className="mr-1.5"
                src="/person1.svg"
                alt="gate pass"
                width={16}
                height={16}
                priority
            />
            Gate Pass
        </button>
    )
}

export default EntryTrue