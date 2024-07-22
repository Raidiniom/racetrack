import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/userpfp.css';
import '../styles/header_and_sidebar.css'
import { useEffect, useState } from 'react'
import supabase from "../config/supabaseclient"

const Profile = () => {
    const [ fetchError, setFetchError ] = useState(null)
    const [ getuser, setGetuser ] = useState(null)

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
        <div className="pf-body">
            {/* Headerbar */}
            <div class="gen-headerbar">
                    <div className="gen-headerbar-logo">
                        <NavLink to='/dashboard'><img src="/img/RaceTrack Logos/RT-logo.png" alt="logo" className="RaceTrack-logo" /></NavLink>
                    </div>
                    <div className="notifications-container">
                        <NavLink to="/notifications">
                            <button className="notification-button">
                                <img src="img/noti-icon.png" alt="icon" class="noti-icon"/> Notifications
                            </button>
                        </NavLink>
                    </div>
                </div>
            {/* Sidebar */}
            <div className="gen-sidebar">
                <ul>
                    <li><NavLink to="/profile">Your Profile</NavLink></li>
                    <li><NavLink to="/created-races">Your Races</NavLink></li>
                    <li><NavLink to="/joined-races">Joined Races</NavLink></li>
                    <li><NavLink to="/dashboard">Join a Race</NavLink></li>
                    <li><NavLink to="/create-race">Create a Race</NavLink></li>
                    <li><NavLink to="/landing" onClick={handleLogout}>Log Out</NavLink></li>
                </ul>
            </div>
            {/* Main Content */}
            <div className="pf-main-content">
                <div class='pf-main-content-header'>
                    <h2>Your Profile</h2>
                </div> 
            {/* Profile */}
            <div className="pf-container">
                <div className="pf-content">
                    <div className="profile-picture">
                        <img src="\img\Default Img\defaultpfp.jpg" alt="Profile Picture" />
                    </div>
                    <div className="profile-info">
                        <div className="info">
                            {fetchError && (<p className='error'>{fetchError}</p>)}
                            {getuser && (
                                <div>
                                    {getuser.map(output => (
                                        <div className='content-wrap'>
                                            <div class='user-name'><h2>{output.username}</h2></div>
                                            <div class='user-container'>
                                            <img src="img/email-icon.png" alt="icon" class="icon"/>
                                            <div><label class='user-label'>Email:</label> {output.email}</div>
                                            <img src="img/bday-icon.png" alt="icon" class="icon"/>          
                                            <div><label class='user-label'>Birthday:</label> {output.birth_day}</div>
                                            <div><label class='user-label'>Gender:</label> {output.gender}</div>
                                        </div>
                                    </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div class='upd-button-container'>
                            <button className="upd-button" onClick={openModal}>Update Profile</button>
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
    );
}

export default Profile;
