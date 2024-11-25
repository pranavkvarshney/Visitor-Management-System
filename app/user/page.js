"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Header from '../components/Header'
const UsersPage = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredUsers, setFilteredUsers] = useState([])

    const fetchUsers = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/users", {
                cache: 'no-store',
                method: 'GET'
            })
            const result = await response.json()
            if (result.success) {
                setUsers(result.data)
                setFilteredUsers(result.data)
                setLoading(false)
            } else {
                setError(result.message)
                setLoading(false)
            }
        } catch (err) {
            setError('Failed to fetch users')
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const searchUser = (user, term) => {
        const searchTerms = term.toLowerCase().trim().split(/\s+/)
        const searchableText = `${user.name || ''} ${user.phone || ''} ${user.company || ''} ${user.type || ''} ${user.purpose || ''}`.toLowerCase()

        return searchTerms.every(term => {
            if (!isNaN(term)) {
                return user.phone?.includes(term)
            }
            return searchableText.includes(term)
        })
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchTerm.trim() === '') {
                setFilteredUsers(users)
            } else {
                const filtered = users.filter(user => searchUser(user, searchTerm))
                setFilteredUsers(filtered)
            }
        }, 300)

        return () => clearTimeout(delayDebounceFn)
    }, [searchTerm, users])

    const handleStatusUpdate = async (userId, status) => {
        try {
            const response = await fetch(`http://localhost:3000/api/users/entry/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    newEntry: status
                })
            })
            const result = await response.json()

            if (result.success) {
                await fetchUsers()
            } else {
                alert(result.message || 'Failed to update status')
            }
        } catch (error) {
            console.error('Error updating status:', error)
            alert('Failed to update status')
        }
    }

    const getStatusClass = (entry) => {
        if (entry === true) return 'bg-emerald-100 text-emerald-800'
        if (entry === false) return 'bg-rose-100 text-rose-800'
        return 'bg-amber-100 text-amber-800'
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="bg-white shadow-md rounded-lg p-8 text-center max-w-md w-full">
                    <div className="flex justify-center mb-4">
                        <Image
                            src="/danger.svg"
                            alt="Error"
                            width={60}
                            height={60}
                            className="mx-auto"
                        />
                    </div>
                    <h2 className="text-xl font-semibold text-red-600 mb-2">
                        Error Retrieving Users
                    </h2>
                    <p className="text-gray-600">
                        {error}
                    </p>
                </div>
            </div>
        )
    }

    return (
        <>
            <Header />

            <div className="min-h-screen  p-4 md:p-8">
                <div className=" shadow-md rounded-lg overflow-hidden">
                    <div className=" px-4 pt-10 py-4 border-b flex flex-col md:flex-row justify-between items-center">
                        <h2 className="text-xl md:text-2xl font-semibold  mb-3 md:mb-0">User Management</h2>
                        <div className="flex items-center space-x-2 w-full md:w-auto">
                            <div className="relative w-full md:w-auto">
                                <input
                                    type="text"
                                    placeholder="Search users..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full md:w-auto px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {searchTerm && (
                                    <button
                                        onClick={() => setSearchTerm('')}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        ×
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {filteredUsers.length === 0 ? (
                        <div className="text-center py-8 ">
                            No users found matching your search criteria
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="">
                                    <tr>
                                        <th className="px-2 md:px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">No.</th>
                                        <th className="px-2 md:px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                                        <th className="px-2 md:px-4 py-3 text-left text-xs font-medium uppercase tracking-wider hidden md:table-cell">Phone</th>
                                        <th className="px-2 md:px-4 py-3 text-left text-xs font-medium uppercase tracking-wider hidden md:table-cell">Company</th>
                                        <th className="px-2 md:px-4 py-3 text-left text-xs font-medium uppercase tracking-wider hidden md:table-cell">Type</th>
                                        <th className="px-2 md:px-4 py-3 text-left text-xs font-medium uppercase tracking-wider hidden md:table-cell">Purpose</th>
                                        <th className="px-2 md:px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                                        <th className="px-2 md:px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className=" divide-y divide-gray-200">
                                    {filteredUsers.map((user, index) => (
                                        <tr key={user._id} className="hover:bg-slate-400 transition-colors">
                                            <td className="px-2 md:px-4 py-3">{index + 1}</td>
                                            <td className="px-2 md:px-4 py-3">
                                                <div className="md:hidden">
                                                    <div>{user.name}</div>
                                                    <div className="text-xs ">{user.phone}</div>
                                                    <div className="text-xs ">{user.type} - {user.purpose}</div>
                                                </div>
                                                <div className="hidden md:block">{user.name}</div>
                                            </td>
                                            <td className="px-2 md:px-4 py-3 hidden md:table-cell">{user.phone}</td>
                                            <td className="px-2 md:px-4 py-3 hidden md:table-cell">{user.company}</td>
                                            <td className="px-2 md:px-4 py-3 hidden md:table-cell">{user.type}</td>
                                            <td className="px-2 md:px-4 py-3 hidden md:table-cell">{user.purpose}</td>
                                            <td className="px-2 md:px-4 py-3">
                                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(user.entry)}`}>
                                                    {user.entry === true ? "Accepted" : user.entry === false ? "Rejected" : "Pending"}
                                                </span>
                                            </td>
                                            <td className="px-2 md:px-4 py-3">
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => handleStatusUpdate(user._id, true)}
                                                        className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                                        disabled={user.entry === true}
                                                    >
                                                        <Image
                                                            className="inline mr-1"
                                                            src="/right.svg"
                                                            alt="accept"
                                                            width={16}
                                                            height={16}
                                                            priority
                                                        />
                                                        Accept
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusUpdate(user._id, false)}
                                                        className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                                        disabled={user.entry === false}
                                                    >
                                                        <Image
                                                            className="inline mr-1"
                                                            src="/wrong.svg"
                                                            alt="reject"
                                                            width={16}
                                                            height={16}
                                                            priority
                                                        />
                                                        Reject
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    <div className=" px-4 py-3 flex items-center justify-between border-t">
                        <div className="text-sm ">
                            Showing {filteredUsers.length} of {users.length} users
                        </div>
                        <div className="flex space-x-2">
                            <button
                                className="px-4 py-2 border rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200"
                            >
                                Previous
                            </button>
                            <button
                                className="px-4 py-2 border rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UsersPage