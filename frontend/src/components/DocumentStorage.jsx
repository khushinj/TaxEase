import React, { useEffect, useState } from 'react';
import { SlOptionsVertical } from "react-icons/sl";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoChevronBack } from "react-icons/io5";

export default function DocumentStorage() {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDoc, setSelectedDoc] = useState(null);

    const navigate = useNavigate();
    const loggeIn = localStorage.getItem('loggedIn');

    const fetchDocuments = async () => {
        if (!loggeIn) {
            setLoading(false);
            setError("Please login to upload and download your documents.");
            return;
        }

        try {
            const userEmail = localStorage.getItem('email');
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/fetch-documents`, { userEmail });

            if (response.data.documents) {
                setDocuments(response.data.documents);
            } else {
                setError("No documents found");
            }
        } catch (err) {
            console.log(`Error fetching documents: ${err}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, []);


    const handleDownload = async (docId) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/download-document/${docId}`, {
                responseType: 'blob',
            });
            const blob = new Blob([response.data], { type: 'application/octet-stream' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `document-${docId}.pdf`;
            a.click();
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Error downloading document:', err);
        }
    };

    const handleDelete = async (docId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete-document/${docId}`);
            setDocuments(documents.filter(doc => doc._id !== docId));;
        } catch (err) {
            console.error('Error deleting document:', err);
        }
    };

    const showOptions = (doc) => {
        setSelectedDoc(selectedDoc === doc ? null : doc);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".options-menu")) {
                setSelectedDoc(null);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <div className="p-5">
            <p className='ps-6 flex items-center cursor-pointer' onClick={() => navigate('/')}>
                <IoChevronBack /> Back
            </p>
            <h1 className="text-4xl font-semibold text-gray-800 mb-10 text-center mt-4">
                Document Storage
            </h1>

            <div className="flex justify-end mb-5 me-8">
                <button className="bg-green-700 rounded-lg text-white py-2 px-3 flex items-center" onClick={() => navigate('/documentUpload')}>
                    <FaPlus />
                    <h3 className="px-2">Upload</h3>
                </button>
            </div>

            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div className="text-red-500 text-center">{error}</div>
            ) : (
                <div className="overflow-x-auto mt-10">
                    <table className="min-w-full border-collapse border-gray-200">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="px-4 py-2 border-b border-gray-300 text-left font-medium text-gray-700" colSpan={4}>
                                    Document Name
                                </th>
                            </tr>
                        </thead>

                        <tbody className='h-full'>
                            {documents.map((doc, index) => (
                                <tr key={index} className=" relative">
                                    <td className="px-4 py-3 border-b border-gray-300 text-gray-800">
                                        {doc.documentName}
                                    </td>
                                    <td className="px-4 py-3 border-b border-gray-300 text-gray-800">
                                        {doc.documentType}
                                    </td>
                                    <td className="ps-10 py-3 border-b border-gray-300 text-center relative">
                                        <SlOptionsVertical onClick={(e) => {
                                            e.stopPropagation();
                                            showOptions(doc);
                                        }} className="cursor-pointer" />

                                        {selectedDoc === doc && (
                                            <div className="absolute left-16 bottom-2 w-28 bg-white border shadow-md mt-1 p-2 rounded-lg">
                                                <button onClick={() => handleDownload(doc._id)} className="block text-green-600 hover:text-green-800">Download</button>
                                                <button onClick={() => handleDelete(doc._id)} className="block text-red-600 hover:text-red-800">Delete</button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
