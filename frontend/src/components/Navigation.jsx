import React, { useState } from 'react';
import { BrowserRouter, Link, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from '../pages/SignUp';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import { createContext } from 'react';
import { MdOutlineLogout } from "react-icons/md";


export const UserLoginContext = createContext();
export const BackendURLContext = createContext();

export const Navigation = () => {
    const [userLoginContext, setUserLoginContext] = useState(false);

    return (
    //    <BackendURLContext.Provider value={{ backendURL: 'https://task-manager-backend-gizf.onrender.com' }}>
       <BackendURLContext.Provider value={{ backendURL: 'http://localhost:8000' }}>
        <UserLoginContext.Provider value={{ userLoginContext, setUserLoginContext }}>
         <BrowserRouter>
            <div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '10px',
                    background: 'green',
                    fontSize: '20px',
                }}>
                    <Link to={'/'} style={{ color: 'white', textDecoration: 'none' }}>
                        TaskEase
                    </Link>

                    {/* Hide Login & SignUp when token exists */}
                    {!userLoginContext && (
                        <span>
                            <Link to={'/login'} style={{ color: 'white', marginRight: '15px', textDecoration: 'none' }}>
                                Login
                            </Link>
                            <Link to={'/signup'} style={{ color: 'white', textDecoration: 'none' }}>
                                SignUp
                            </Link>
                        </span>
                    )}

                    {/* Show Logout button if token exists */}
                    {userLoginContext && (
                        <button
                            onClick={() => {
                                localStorage.removeItem("token"); // Remove token
                                window.location.reload(); // Refresh page
                                setUserLoginContext(userLoginContext => !userLoginContext);
                            }}
                            style={{ color: 'white', background: 'red', border: 'none', cursor: 'pointer', textDecoration: 'none' }}
                        >
                            Logout <MdOutlineLogout />
                        </button>
                    )}
                </div>
            </div>

            <Routes>
                <Route path="/" element={userLoginContext ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/dashboard" element={userLoginContext ? <Dashboard /> : <Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>

       </UserLoginContext.Provider>

       </BackendURLContext.Provider>
    );
};
