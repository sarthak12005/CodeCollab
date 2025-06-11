import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { useAuth } from '../context/userContext';
import Header from '../components/Header';


const Profile = () => {
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
    }


    return (
        <>
            <Header />
            <div className=' h-[91.1vh] flex flex-col items-center justify-center bg-gradient-to-b from-[#0a0a12] to-[#2a2a4a]'>
                <TypeAnimation
                    sequence={[
                        "The Profile page",
                        1500,
                        "The Profile page\nis not build yet",
                        2000,
                        "The Profile page\nis not build yet\nComming soon...",
                        3000,

                    ]}
                    wrapper="div"
                    style={{
                        whiteSpace: "pre-line",
                        display: "block",
                        fontSize: "7rem",
                        fontFamily: "monospace",
                    }}
                    cursor={true}
                    repeat={false}
                    className="bg-gradient-to-r bg-clip-text text-transparent from-[#6e44ff] to-[#1cb8ff] drop-shadow-[0_0_15px_rgba(110,68,255,0.5)] "
                />


                <button className="mt-6 px-6 py-3 bg-gradient-to-r from-[#6e44ff] to-[#1cb8ff] cursor-pointer text-white rounded-md shadow-glow hover:shadow-[0_0_15px_rgba(110,68,255,0.5)] transition duration-300"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </>
    )
};


export default Profile;