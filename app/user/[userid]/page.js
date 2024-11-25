"use client"
import React from 'react';
import Image from "next/image";
import Header from "@/app/components/Header";

async function getuser(userIdParam) {
    let response = await fetch(`http://localhost:3000/api/users/${userIdParam}`, {
        cache: 'no-store',
        method: 'GET'
    });
    response = await response.json();
    return response;
}

export default async function ViewUser({ params }) {
    const result = await getuser(params.userid);
    const user = result.data;
    const id = user._id;
    const part1 = id.substring(18, id.length);
    let date = user.createdAt;
    const day = date.substring(4, 10);
    const year = date.substring(11, 15);
    let time = date.substring(16, 24);

    const handlePrint = () => {
        const printContent = document.getElementById('printableCard');
        const originalContents = document.body.innerHTML;

        document.body.innerHTML = printContent.innerHTML;

        window.print();

        document.body.innerHTML = originalContents;
        window.location.reload(); // Reload to restore event handlers
    };

    // Function to render photo or placeholder
    const renderPhoto = () => {
        if (user.photo) {
            // If there's a photo in base64 format
            return (
                <img
                    src={user.photo}
                    alt="Visitor Photo"
                    className="w-full h-full object-cover rounded-full"
                />
            );
        } else {
            // Fallback to placeholder
            return (
                <Image
                    src="/photo.svg"
                    alt="Visitor Photo"
                    fill
                    className="object-cover"
                    priority
                />
            );
        }
    };

    return (
        <>
            {/* Non-printable page content */}
            <div className="print:hidden">
                <Header />
                <div className="pt-20 px-4">
                    <div className="max-w-3xl mx-auto">
                        <div className="mb-4 flex justify-end">
                            <button
                                onClick={handlePrint}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                </svg>
                                Print Visitor Pass
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Printable ID Card */}
            <div id="printableCard" className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <div className="text-center text-xl font-semibold text-black mb-6">Visitor Pass</div>

                <div className="flex flex-col md:flex-row gap-6">
                    {/* Photo Section */}
                    <div className="md:w-1/3 flex flex-col items-center border-b md:border-b-0 md:border-r border-gray-200 pb-6 md:pb-0">
                        <div className="relative w-48 h-48 bg-gray-50 rounded-full overflow-hidden mb-4">
                            {renderPhoto()}
                        </div>
                        <div className="text-2xl font-bold text-center text-gray-900">
                            {user.name}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                            ID: {part1}
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="md:w-2/3 md:pl-6">
                        <div className="grid grid-cols-3 gap-y-4">
                            <div className="col-span-1 text-sm font-medium text-gray-500">Phone</div>
                            <div className="col-span-2 text-sm text-gray-900">{user.phone}</div>

                            <div className="col-span-1 text-sm font-medium text-gray-500">Company</div>
                            <div className="col-span-2 text-sm text-gray-900">{user.company}</div>

                            <div className="col-span-1 text-sm font-medium text-gray-500">Address</div>
                            <div className="col-span-2 text-sm text-gray-900">{user.address}</div>

                            <div className="col-span-1 text-sm font-medium text-gray-500">To Meet</div>
                            <div className="col-span-2 text-sm text-gray-900">
                                {user.compname}<br />
                                {user.compadd}
                            </div>

                            <div className="col-span-1 text-sm font-medium text-gray-500">Purpose</div>
                            <div className="col-span-2 text-sm text-gray-900">{user.purpose}</div>

                            <div className="col-span-1 text-sm font-medium text-gray-500">Visit Date</div>
                            <div className="col-span-2 text-sm text-gray-900">{day}-{year}</div>

                            <div className="col-span-1 text-sm font-medium text-gray-500">In Time</div>
                            <div className="col-span-2 text-sm text-gray-900">{time}</div>
                        </div>

                        {/* Signature Section */}
                        <div className="mt-8 grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                            <div className="text-center">
                                <div className="h-16 border-b border-gray-300"></div>
                                <div className="mt-2 text-sm font-medium text-gray-500">Visitor Sign</div>
                            </div>
                            <div className="text-center">
                                <div className="h-16 border-b border-gray-300"></div>
                                <div className="mt-2 text-sm font-medium text-gray-500">Employee Sign</div>
                            </div>
                            <div className="text-center">
                                <div className="h-16 border-b border-gray-300"></div>
                                <div className="mt-2 text-sm font-medium text-gray-500">Security Sign</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add print-specific styles */}
            <style jsx global>{`
                @media print {
                    @page {
                        size: auto;
                        margin: 0mm;
                    }
                    body {
                        margin: 1cm;
                        background: white;
                    }
                    #printableCard {
                        box-shadow: none !important;
                        border: 1px solid #e5e7eb;
                    }
                }
            `}</style>
        </>
    );
}