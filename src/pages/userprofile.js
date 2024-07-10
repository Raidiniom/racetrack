import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/userpfp.css';
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
                        <NavLink to="/login" className="nav-link" onClick={handleLogout}>Logout</NavLink>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default Profile;
