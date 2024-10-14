import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/userprofilecard.css'; 

const UserProfileCard = () => {
    const [userData, setUserData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('userId');

        if (!userId) {
            setErrorMessage("No userId found in localStorage");
            return;
        }

      
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:1203/users/singleuserlist/${userId}`);
                const data = await response.json();
                setUserData(data.message);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setErrorMessage("Failed to load user data.");
            }
        };

        fetchData();
    }, []);

    const handleDelete = async () => {
        const userId = localStorage.getItem('userId');

        if (!userId) {
            setErrorMessage("No userId found in localStorage");
            return;
        }

        try {
            const response = await fetch(`http://localhost:1203/users/userdelete/${userId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                localStorage.clear(); 
                navigate('/userlogin'); 
            } else {
                const data = await response.json();
                setErrorMessage(data.message || "Failed to delete user.");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            setErrorMessage("Failed to delete user.");
        }
    };

    return (
        <div className="profile-card-container">
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {userData ? (
                <div className="profile-card">
                    <h2 className="profile-title">{userData.username}'s Profile</h2>
                    <div className="profile-details">
                        <div className="detail-item">
                            <strong>Email:</strong> {userData.mail}
                        </div>
                        <div className="detail-item">
                            <strong>Age:</strong> {userData.age}
                        </div>
                        <div className="detail-item">
                            <strong>Gender:</strong> {userData.gender}
                        </div>
                        <div className="detail-item">
                            <strong>Education:</strong> {userData.education}
                        </div>
                        <div className="detail-item">
                            <strong>Occupation:</strong> {userData.occupation}
                        </div>
                        <div className="detail-item">
                            <strong>Blog:</strong> {userData.blog}
                        </div>
                    </div>
                    <div className="button-container">
                        <button className="edit-button" onClick={() => { navigate('/userprofileupdate') }}>Edit Profile</button>
                        <button className="delete-button" onClick={handleDelete}>Delete Profile</button>
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default UserProfileCard;
