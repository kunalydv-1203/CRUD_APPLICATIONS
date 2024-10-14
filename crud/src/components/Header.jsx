import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/header.css'; // Make sure to create a CSS file for styling

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const username = localStorage.getItem('username'); 

    const handleLogout = () => {
        localStorage.clear(); 
        navigate('/userlogin'); 
    };

    return (
        <header className="header">
            <p className="app-title">CRUD Application</p>

            {location.pathname !== '/userlogin' && location.pathname !== '/userregi' && 
            <>
                <div className="user-info">
                    <h1 className="greeting">Hello,{username}!</h1>
                    <button className="logout-button" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </>
            }

            {location.pathname !== '/userprofileupdate' && location.pathname !== '/userprofilecard' && 
            <>
            <div className="auth-buttons">
                <button className="loginBtn" onClick={() => { navigate('/userlogin') }}>
                    Login
                </button>
                <button className="RegiBtn" onClick={() => { navigate('/userregi') }}>
                    Register
                </button>
            </div>
            </>
            }
        </header>
    );
};

export default Header;
