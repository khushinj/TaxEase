import React, { useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function DocumentUpload() {
    const [file, setFile] = useState(null);
    const [documentName, setDocumentName] = useState("");
    // const [documentType, setDocumentType] = useState("");
    const navigate = useNavigate();
    const token = localStorage.getItem('token');


    const handleUpload = async (e) => {
        e.preventDefault();

        if (!file || !documentName) {
            alert("Please fill all fields and select a file.");
            return;
        }


        const formData = new FormData();
        formData.append('document', file);
        formData.append('documentName', documentName);
        formData.append('documentType', 'PDF');
        formData.append('userEmail', localStorage.getItem('email')); 
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/upload-document`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `${token}` 
                },
            });


            if (response.status === 200) {
                alert("File uploaded successfully");
                navigate('/documentStorage');
            }
        } catch (err) {
            console.error("Error uploading file", err);
            alert("Error uploading file");
        }
    };

    return (
        <div className='bg-gray-100'>
            <div>
                <button className='px-10 pt-5 text-lg font-semibold flex items-center justify-center' onClick={() => { navigate('/documentStorage') }} >
                    <IoIosArrowBack /> <p className='mb-1'>Back</p>
                </button>
            </div>
            <div className="min-h-screen flex items-center justify-center ">
                <form onSubmit={handleUpload} className="border border-black rounded-xl p-8 rounded-md shadow-md">
                    <h1 className="text-2xl font-semibold mb-2 text-center">Upload Your Document</h1>
                    <p className='text-center mb-5 font-semibold'>Acceptable formats: PDF</p>

                    <input
                        type="text"
                        value={documentName}
                        onChange={(e) => setDocumentName(e.target.value)}
                        placeholder="Document Name"
                        className="border border-gray-300 p-2 rounded-md w-full mb-4"
                    />

                    {/* <select
                        value={documentType}
                        onChange={(e) => setDocumentType(e.target.value)}
                        className="border border-gray-300 p-2 rounded-md w-full mb-4"
                    >
                        <option value="">Select Document Type</option>
                        <option value="PDF">PDF</option>
                        <option value="PNG">PNG</option>
                        <option value="JPEG">JPEG</option>
                        <option value="JPG">JPG</option>
                    </select> */}

                    <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="border border-gray-300 p-2 rounded-md w-full mb-10 py-10"
                    />

                    {file && (
                        <div className="text-md mb-5">
                            <p>File Selected: {file.name}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600"
                    >
                        Upload
                    </button>
                </form>
            </div>
        </div>
    );
}
