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
                    <div className="notifications-container">
                        <NavLink to="/notifications">
                            <button className="notification-button">
                                Notifications
                            </button>
                        </NavLink>
                    </div>
                </div> 
            {/* Profile */}
            <div className="pf-container">
                <div className="pf-content">
                    <div className="pf-pic">
                        <img src="\img\Default Img\defaultpfp.jpg" alt="Profile Picture" />
                    </div>
                    <div className="pf-info">
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
                        <div class='pf-button-container'>
                            <button className="pf-button" onClick={openModal}>Update Profile</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

            {isModalOpen && (
                <div className="prof-modal">
                    <div className="prof-modal-container">
                        <div className="prof-close" onClick={closeModal}>&times;</div>
                        <form>
                            <h1 class='prof-title'>Update Profile</h1>
                            <div className='prof-user-details'>
                                <div className='prof-input-box'>
                                <label className='prof-details'>
                                    Change Username:
                                    <input 
                                        placeholder='Enter your preferred username'
                                        type="text" 
                                        name="username" 
                                    />
                                </label>
                            </div>
                            <div className='prof-input-box'>
                                <label className='prof-details'>
                                    Email:
                                    <input 
                                        placeholder='Enter new email address'
                                        type="email" 
                                        name="email" 
                                    />
                                </label>
                            </div>
                            <div className='prof-input-box'>
                                <label className='prof-details'>
                                    Birthday:
                                    <input 
                                    type="date" 
                                    name="bday" />
                                </label>
                            </div>
                            <div className='prof-input-box'>
                                <label className='prof-gender-title'>Gender</label>
                                    <select name="gender" id="gender">
                                        <option value="not selected">Default Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="prefer-not-to-say">Prefer not to say</option>
                                        <option value="other">Other</option>
                                    </select>
                            </div>
                            <button type="submit" className="prof-button">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;
