import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_ENDPOINT;



const SingleProblemPage = () => {
    const { problemId } = useParams();
    const [problemData, setProblemData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSingleProblem = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`http://localhost:9000/api/codecollab/problem/get-problem/${problemId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.status === 200) {
                    setProblemData(response.data.problem);
                    console.log(response.data.problem);
                }

            } catch (err) {
                console.error("Error fetching problem data:", err);
            } finally {
                setLoading(false)
            }
        }

        fetchSingleProblem()
    }, []);


    return (
        <>
            {loading ? (
                <div className="flex items-center justify-center h-screen w-screen bg-white backdrop-blur-3xl">
                    {/* Spinner */}
                    <div className="w-16 h-16 rounded-full border-4 border-t-transparent border-[conic-gradient(from_0deg,_#6e44ff,_#1cb8ff)] animate-spin">
                        CC
                    </div>
                </div>
            ) : problemData ? ( // ✅ CHECK IF problemData EXISTS
                <div className="problemInfo w-screen h-[92.4vh] bg-gradient-to-b from-[#0a0a12] to-[#2a2a4a] flex justify-center items-center">
                    <div className="boxinfo text-center">
                        <h1 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#6e44ff] to-[#1cb8ff]">
                            problemName: {problemData.title}
                        </h1>
                        <h1 className="mt-4 text-lg bg-clip-text text-transparent bg-gradient-to-r from-[#6e44ff] to-[#1cb8ff]">
                            problemDescription: {problemData.description}
                        </h1>
                    </div>
                </div>
            ) : (
                <div className="text-white h-screen w-screen flex justify-center items-center">
                    Failed to load problem data.
                </div>
            )}

        </>

    );




}

export default SingleProblemPage;