import React from 'react';
import { uploadCloudinary } from '../config/cloudinaryclient'
import { NavLink } from 'react-router-dom';
import '../styles/userpfp.css';
import '../styles/header_and_sidebar.css'
import { useEffect, useState } from 'react'
import supabase from "../config/supabaseclient"

const Profile = () => {
    const [authuser, setAuthuser] = useState({ user: null });
    const [getuser, setGetuser] = useState(null);
    const [fetchError, setFetchError] = useState(null);
    const [preview, setPreview] = useState(null);
    const [selectFile, setSelectFile] = useState(null);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();

        try {
            let uploadURL = getuser?.profile_pic;

            if (selectFile) {
                uploadURL = await uploadCloudinary(selectFile);
            }

            const insertUrl = await supabase
            .from("app_users")
            .update({
                pfp_url: uploadURL,
            })
            .eq("email", authuser.user.email);

            if (insertUrl.error) throw insertUrl.error
            
            alert("Profile Updated!");
            closeModal();

            window.location.reload();
        } catch (error) {
            console.error(error);
            alert("Profile Updated Failed"+ error.message);
        }
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data: sess, error: nosess } = await supabase.auth.getSession();
                
                // Check for errors and log them
                if (nosess) {
                    console.error('Session Error:', nosess.message);
                    return;
                }
                
                console.log('This is Sess: ', sess)
                const user = sess?.session.user;
                setAuthuser({ user });

                if (user) {
                    const { data, error } = await supabase
                        .from('app_users')
                        .select('*')
                        .eq('email', user.email);

                    if (error) {
                        throw error;
                    }

                    setGetuser(data);
                }

                setFetchError(null);
            } catch (error) {
                setFetchError('Failed to Fetch User Data');
                console.error('Error: ', error.message);
            }
        };

        fetchUser();
    }, []);


    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut()
        
        if (error) {
            console.error(error)
        } else {
            window.location.href='/login'
        }
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
                    <div className="header-right">
                        <div className="pfp">
                            <NavLink to="/profile">
                                <button className="notification-button">
                                    <img src="img/pfp.png" alt="icon" className="pfp-icon" /> Profile
                                </button>
                            </NavLink>
                        </div>
                        <div className="notifications-container">
                            <NavLink to="/notifications">
                                <button className="notification-button">
                                    <img src="img/noti-icon.png" alt="icon" className="noti-icon" /> Notifications
                                </button>
                            </NavLink>
                        </div>
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

                    {getuser && (
                        <div>
                            {getuser.map( output => (
                                <div className='prof-pic-preview'>
                                    <img
                                        src={output.pfp_url}
                                        alt='User Profile Picture'/>
                                </div>
                            ))}
                        </div>
                    )}
                </div> 
            {/* Profile */}
            <div className="pf-container">
                <div className="pf-content-wrap">
                            {fetchError && (<p className='error'>{fetchError}</p>)}
                            {getuser && (
                                <div>
                                    {getuser.map(output => (
                                        <div className='pf-details-container'>
                                            <div class='pf-username'>
                                                {output.username}
                                            </div>
                                            <div class="pf-details-wrapper">
                                                <img src="img/email-icon.png" alt="icon" class="icon"/>
                                                <div><label class='pf-details'>Email:</label> {output.email}</div>
                                            </div>
                                            <div class="pf-details-wrapper">
                                                <img src="img/bday-icon.png" alt="icon" class="icon"/>          
                                                <div><label class='pf-details'>Birthday:</label> {output.birth_day}</div>
                                            </div>
                                            <div class="pf-details-wrapper">
                                                <img src="img/gender-icon.png" alt="icon" class="icon"/>
                                                <div className='gender'><label class='pf-details'>Gender:</label> {output.gender}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        
                        <div class='pf-button-container'>
                            <button className="pf-button" onClick={openModal}>Update Profile</button>
                        </div>
                    
                </div>
            </div>
        </div>

            {isModalOpen && (
                <div className="prof-modal">
                    <div className="prof-modal-container">
                        <div className="prof-close" onClick={closeModal}>&times;</div>
                        <form onSubmit={handleProfileUpdate}>
                            <h1 class='prof-title'>Update Profile</h1>
                            
                            <div className='prof-user-details'>

                                <div className='prof-input-box prof-pic-box'>
                                    <label className='prof-details'>
                                        Profile Picture:
                                    </label>

                                    
                                    <div className='prof-pic-preview'>
                                        <img
                                            src={preview || getuser?.[0]?.profile_pic || "img/pfp.png"}
                                            alt='Profile Preview'/>
                                    </div>

                                    <input
                                        id="file-upload"
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none'}}
                                        name="profile_pic"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                setSelectFile(file);
                                                setPreview(URL.createObjectURL(file));
                                            }
                                        }}
                                    />

                                    <label htmlFor='file-upload' className='prof-upload-btn'>
                                        Choose a picture
                                    </label>
                                </div>

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
                                    Change Email:
                                    <input 
                                        placeholder='Enter new email address'
                                        type="email" 
                                        name="email" 
                                    />
                                </label>
                            </div>
                            <div className='prof-input-box'>
                                <label className='prof-details'>
                                    Change Birthday:
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
