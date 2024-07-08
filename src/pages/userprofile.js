import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/userpfp.css';

const Profile = () => {
    return (
        <div className="wholesite">
        <div className="bkuf">
            <div className="profile-container">
                <div className="profile-header">
                    <h1>User Profile</h1>
                </div>
                <div className="profile-content">
                    <div className="profile-picture">
                        <img src="\img\Default Img\defaultpfp.jpg" alt="Profile Picture" />
                    </div>
                    <div className="profile-info">
                        <div className="info">
                            <h2>John Doe</h2>
                            <p>Email: Backend</p>
                            <p>Phone Number: Backend</p>
                            <p>Gender: Backend</p>
                            <p>Birthday: Backend</p>
                        </div>

                        {/* kailangan bani or different stuff lang i dunno */}
                        <div className="buttons">
                            <button className="edit-button">Change Username</button>
                            <button className="edit-button">Change Password</button>
                            <button className="edit-button">Change Email</button>
                            <button className="edit-button">Change Phone Number</button>
                            <button className="edit-button">Change Gender</button>
                            <button className="edit-button">Change Birthday</button>
                        </div>
                    </div>
                </div>
                <nav className="profile-nav">
                    <NavLink to="/" className="nav-link">Dashboard</NavLink>
                    <NavLink to="/madeevents" className="nav-link">Your Events</NavLink>
                    <NavLink to="/login" className="nav-link">Logout</NavLink>
                </nav>
            </div>
        </div>
        </div>
    );
}

export default Profile;
