import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/userpfp.css';
import '../styles/header_and_sidebar.css'
import { useEffect, useState } from 'react'
import supabase from "../config/supabaseclient"

const Profile = () => {
    const [ fetchError, setFetchError ] = useState(null)
    const [ getuser, setGetuser ] = useState(null)
    /* I's using localstorage so when the user refreshes the page the details will still display */

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const storeUser = localStorage.getItem('lsusername')
                if (storeUser) {
                    const { data, error } = await supabase
                     .from('app_users')
                     .select('*')
                     .eq('username', storeUser)

                     if (error) {
                        throw error
                     }

                     if (data) {
                        setGetuser(data)
                     }
                    }

                setFetchError(null)
            } catch (error) {
                setFetchError('Failed to Fetch User Data')
                console.error('Error: ', error.message)
            }
        }

        fetchUser()
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('lsusername')
        setGetuser(null)
    }

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="wholesite">
            <div className="dashboard">
            <div class="dashboard-header">
                    <div className="dash-logo">
                        <img src="\img\RaceTrack Logos\RT-logo.png" alt="logo" className="RaceTrack-logo" />
                    </div>
                </div>

                {/* Sidebar */}
                <div class="dashboard-sidebar">
                    <ul>
                        <li><NavLink to="/profile">Your Profile</NavLink></li>
                        <li><NavLink to="/">Dashboard</NavLink></li>
                        <li><NavLink to="/madeevents">Your Events</NavLink></li>
                        <li><NavLink to="/create">Create Race</NavLink></li>
                        <li><NavLink to="/joinedevents">Joined Event</NavLink></li>
                        <li><NavLink to="/login" onClick={handleLogout}>Log Out</NavLink></li>
                    </ul>
                </div>

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
                                {fetchError && (<p className='error'>{fetchError}</p>)}
                                {getuser && (
                                    <div>
                                        {getuser.map(output => (
                                            <div>
                                                <h2>{output.username}</h2>
                                                <p>Email: {output.email}</p>
                                                <p>Birthday: {output.birth_day}</p>
                                                <p>Gender: {output.gender}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* kailangan bani or different stuff lang i dunno */}
                            <div className="buttons">
                                <NavLink to="/" className="nav-link">Dashboard</NavLink>
                                <NavLink to="/madeevents" className="nav-link">Your Events</NavLink>
                                <button className="edit-button" onClick={openModal}>Update Profile</button>
                                <NavLink to="/login" className="nav-link" onClick={handleLogout}>Logout</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="close" onClick={closeModal}>&times;</div>
                        <h2>Update Profile</h2>
                        <form>
                            <label>
                                Username:
                                <input type="text" name="username" />
                            </label>
                            <label>
                                Enter current password:
                                <input type="password" name="oldpass" />
                            </label>
                            <label>
                                Enter new password:
                                <input type="password" name="newpass" />
                            </label>
                            <label>
                                Confirm new password:
                                <input type="password" name="connewpass" />
                            </label>
                            <label>
                                Email:
                                <input type="email" name="email" />
                            </label>
                            <label>
                                Birthday:
                                <input type="date" name="bday" />
                            </label>
                            <div className='input-box'>
                                <label className='gender-title-pfp'>Gender</label>
                                <select name="gender" id="gender">
                                    <option value="not selected">Default Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="prefer-not-to-say">Prefer not to say</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <button type="submit" className="edit-button">Save Changes</button>
                        </form>
                    </div>
                </div>
            )}
            </div>
        </div>
    );
}

export default Profile;
