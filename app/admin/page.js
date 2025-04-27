"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../components/Header'
import Image from 'next/image'
import EntryTrue from '@/app/components/EntryTrue'

const Page = () => {
    const router = useRouter()
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("/api/users", {
                    cache: 'no-store',
                    method: 'GET'
                })
                const data = await response.json()
                if (data.success) {
                    setUsers(data.data)
                } else {
                    setError(data.message)
                }
            } catch (err) {
                setError("Failed to fetch users")
            } finally {
                setLoading(false)
            }
        }

        fetchUsers()
    }, [])

    const getStatusClass = (entry) => {
        if (entry === true) return 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-500/20 shadow-sm'
        if (entry === false) return 'bg-rose-50 text-rose-600 ring-1 ring-rose-500/20 shadow-sm'
        return 'bg-amber-50 text-amber-600 ring-1 ring-amber-500/20 shadow-sm'
    }

    const view = (e) => {
        router.push(`/edit/${e}`)
    }

    if (loading) {
        return (
            <div className="min-h-screen">
                <Header />
                <div className="min-h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />
                <div className="min-h-screen flex items-center justify-center p-4">
                    <div className="bg-white shadow-lg rounded-xl p-8 text-center max-w-md w-full border border-gray-200">
                        <div className="flex justify-center mb-6">
                            <Image
                                src="/danger.svg"
                                alt="Error"
                                width={56}
                                height={56}
                                className="text-red-500"
                                priority
                            />
                        </div>
                        <h2 className="text-2xl font-semibold text-red-600 mb-3">Error</h2>
                        <p className="text-gray-600 text-lg">{error}</p>
                    </div>
                </div>
            </div>
        )
    }

    const totalPages = Math.ceil(users.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentUsers = users.slice(startIndex, endIndex)

    const handlePrevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1))
    }

    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages))
    }

    return (
        <div className="min-h-screen">
            <Header />
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-24">
                <div className="rounded-xl shadow-md border border-gray-200 overflow-hidden">
                    <div className="px-8 py-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-semibold">Visitor Management</h2>
                            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-50 text-blue-600 border border-blue-100 shadow-sm">
                                {users.length} Visitors
                            </span>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">No.</th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Phone</th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Company</th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Address</th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Type</th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Purpose</th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Company Name</th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Company Address</th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {currentUsers.map((user, index) => (
                                    <tr key={user._id} className="hover:bg-slate-400 transition-colors duration-150 ease-in-out">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">{startIndex + index + 1}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{user.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">{user.phone}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">{user.company}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">{user.address}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">{user.type}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">{user.purpose}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">{user.compname}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">{user.compadd}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-4 py-2 inline-flex text-sm font-medium rounded-full ${getStatusClass(user.entry)}`}>
                                                {user.entry === true ? "Permitted" : user.entry === false ? "Denied" : "Pending"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex flex-col space-y-2">
                                                {user.entry && (
                                                    <button
                                                        onClick={() => router.push(`/user/${user._id}`)}
                                                        className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 shadow-sm hover:shadow transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                                    >
                                                        <Image
                                                            className="mr-2"
                                                            src="/person1.svg"
                                                            alt="gate pass"
                                                            width={16}
                                                            height={16}
                                                            priority
                                                        />
                                                        Gate Pass
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => view(user._id)}
                                                    className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200 shadow-sm hover:shadow transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                >
                                                    <Image
                                                        className="mr-2"
                                                        src="/edit.svg"
                                                        alt="edit"
                                                        width={16}
                                                        height={16}
                                                        priority
                                                    />
                                                    Edit
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="px-8 py-4 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="flex-1 flex justify-between sm:hidden">
                                <button
                                    onClick={handlePrevPage}
                                    disabled={currentPage === 1}
                                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
                                >
                                    Next
                                </button>
                            </div>
                            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm">
                                        Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                                        <span className="font-medium">
                                            {Math.min(endIndex, users.length)}
                                        </span>{' '}
                                        of <span className="font-medium">{users.length}</span> results
                                    </p>
                                </div>
                                <div>
                                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                        <button
                                            onClick={handlePrevPage}
                                            disabled={currentPage === 1}
                                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
                                        >
                                            <span className="sr-only">Previous</span>
                                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                        <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                                            Page {currentPage} of {totalPages}
                                        </span>
                                        <button
                                            onClick={handleNextPage}
                                            disabled={currentPage === totalPages}
                                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
                                        >
                                            <span className="sr-only">Next</span>
                                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page