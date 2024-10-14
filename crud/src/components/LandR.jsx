import '../css/loginandregicss.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const LoginRegi = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); 
    const [successMessage, setSuccessMessage] = useState(""); 

    useEffect(() => {
        
        setUsername("");
        setMail("");
        setPassword("");
        setErrorMessage(""); 
        setSuccessMessage(""); 
    }, [location.pathname]);

    const handleUsername = (event) => {
        setUsername(event.target.value);
    };

    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleMail = (event) => {
        setMail(event.target.value);
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        setErrorMessage(""); 
        setSuccessMessage("");

        if (location.pathname === "/userregi" && (!username || !mail || !password)) {
            setErrorMessage("Please fill in all fields.");
            return;
        } else if (location.pathname === "/userlogin" && (!mail || !password)) {
            setErrorMessage("Please fill in all fields.");
            return;
        }

        try {
            if (location.pathname === "/userregi") {
                
                let formData = {
                    username: username,
                    mail: mail,
                    password: password,
                };

                const response = await axios.post('http://localhost:1203/users/userregistration', formData);
                console.log(response);
                setSuccessMessage("You have been registered. Now you can log in.");
                setTimeout(() => navigate('/userlogin'), 3000); 
            } else if (location.pathname === "/userlogin") {
                
                let formData = {
                    mail: mail,
                    password: password,
                };

                const response = await axios.post('http://localhost:1203/users/userlogin', formData);

                if (response.data.success) {
                    console.log(response);
                    console.log(response.data.message._id);
                    localStorage.setItem("userId", response.data.message._id);
                    localStorage.setItem("username", response.data.message.username);
                    navigate('/userprofilecard');
                } else {
                    
                    setErrorMessage('Incorrect email or password. Please try again.');
                }
            }
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage('Something went wrong. Please try again.'); 
        }
    };

    return (
        <>
            <section className="mainSec">
                <div className="parent">
                    <h3 className="one">Account Access</h3>
                    <span id="txt">Login or Create a new account</span>

                    <div id="btns">
                        <button id='log' onClick={() => { navigate('/userlogin') }}>Login</button>
                        <button id='reg' onClick={() => { navigate('/userregi') }}>Register</button>
                    </div>

                    <div id="form">
                        {location.pathname !== '/userlogin' && 
                            <>
                                <label className="formlabel">Username</label>
                                <input
                                    type="text"
                                    id='inputusername'
                                    value={username}
                                    onChange={handleUsername}
                                    placeholder='Enter your username'
                                />
                            </>
                        }

                        <label className="formlabel">E-Mail</label>
                        <input
                            type="email"
                            id='inputusermail'
                            value={mail}
                            onChange={handleMail}
                            placeholder='Enter your Email'
                        />

                        <label className="formlabel">Password</label>
                        <input
                            type="password"
                            id='inputpsw'
                            value={password}
                            onChange={handlePassword}
                            placeholder='Enter your password'
                        />
                    </div>

                    {successMessage && <div className="success-message">{successMessage}</div>}
                    {errorMessage && <div className="error-message">{errorMessage}</div>}

                    <button id='frmBtn' onClick={submitHandler}>
                        {location.pathname === '/userregi' ? 'Register' : 'Login'}
                    </button>
                </div>
            </section>
        </>
    );
};

export default LoginRegi;
 