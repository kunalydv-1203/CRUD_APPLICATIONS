import React, { useState, useEffect } from 'react';
import '../css/profileupdate.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserProfileUpdate = () => {
    const navigate = useNavigate();

   
    const [username, setUsername] = useState('');
    const [mail, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [education, setEducation] = useState('');
    const [occupation, setOccupation] = useState('');
    const [blog, setBlog] = useState('');
    
   
    useEffect(() => {
        const userId = localStorage.getItem('userId');

        axios.get(`http://localhost:1203/users/singleuserlist/` + userId)
            .then((response) => {
                const data = response.data.message;

                setUsername(data.username || '');
                setEmail(data.mail || '');
                setAge(data.age || '');
                setGender(data.gender || '');
                setEducation(data.education || '');
                setOccupation(data.occupation || '');
                setBlog(data.blog || '');
            });
    }, []);

    const updateHandler = async (event) => {
        event.preventDefault();
        const userId = localStorage.getItem('userId');

        const formData = {
            username,
            mail,
            age,
            gender,
            education,
            occupation,
            blog
        };

        await axios.put(`http://localhost:1203/users/userupdate/${userId}`, formData);
        navigate('/userprofilecard');
    };

    return (
        <div className="page">
            <div className="profile">
                <h2 id='updateheading'>Update Profile</h2>
                <form className='frm2' onSubmit={updateHandler}>
                    <div className="d1">
                        <div className="pinf">
                            <div className="pd1">
                                <label className='lbl'>Username</label>
                                <br />
                                <input
                                    type="text"
                                    className='inp'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder='Enter your username'
                                />
                            </div>

                            <div className="pd1">
                                <label className='lbl'>Email</label>
                                <br />
                                <input
                                    type="email"
                                    className='inp'
                                    value={mail}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='Enter your email'
                                />
                            </div>
                        </div>

                        <div className="pinf">
                            <div className="pd1">
                                <label className='lbl'>Age</label>
                                <br />
                                <input
                                    type="number"
                                    className='inp'
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    placeholder='Enter your age'
                                />
                            </div>

                            <div className="pd1">
                                <label className='lbl'>Gender</label>
                                <div className="genderOptions">
                                    <label>
                                        <input
                                            type="radio"
                                            value="Male"
                                            checked={gender === 'Male'}
                                            onChange={(e) => setGender(e.target.value)}
                                        /> Male
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            value="Female"
                                            checked={gender === 'Female'}
                                            onChange={(e) => setGender(e.target.value)}
                                        /> Female
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="d2">
                        <div className="parts">
                            <label className='lbl'>Education</label>
                            <br />
                            <select
                                value={education}
                                onChange={(e) => setEducation(e.target.value)}
                                className='inp'
                            >
                                <option value="">Select your education</option>
                                <option value="High School">High School</option>
                                <option value="Bachelor's Degree">Bachelor's Degree</option>
                                <option value="Master's Degree">Master's Degree</option>
                                <option value="PhD">PhD</option>
                            </select>
                        </div>

                        <div className="parts">
                            <label className='lbl'>Occupation</label>
                            <br />
                            <input
                                type="text"
                                className='inp'
                                value={occupation}
                                onChange={(e) => setOccupation(e.target.value)}
                                placeholder='Enter your occupation'
                            />
                        </div>
                    </div>

                    <div className="d3">
                        <label className='lbl'>Blog</label> <br />
                        <textarea
                            value={blog}
                            onChange={(e) => setBlog(e.target.value)}
                            id="blg"
                            className='txtarea'
                        ></textarea>
                    </div>

                    <button className='btnthree' type="submit">Update Profile</button>
                </form>
            </div>
        </div>
    );
};

export default UserProfileUpdate;
