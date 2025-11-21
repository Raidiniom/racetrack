import React from 'react';
import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'

// CSS
import '../styles/userpfp.css';
import '../styles/header_and_sidebar.css'

// Config
import supabase from "../config/supabaseclient"
import { uploadPFP } from '../config/cloudinaryclient'

// Components
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const Profile = () => {
    const [authuser, setAuthuser] = useState({ user: null });
    const [getuser, setGetuser] = useState(null);
    const [fetchError, setFetchError] = useState(null);
    const [preview, setPreview] = useState(null);
    const [selectFile, setSelectFile] = useState(null);

    const [updateUsername, setUpdateUsername] = useState('');
    const [updateEmail, setUpdateEmail] = useState('');
    const [updateBirthday, setUpdateBirthday] = useState('');
    const [updateGender, setUpdateGender] = useState('');

    const handleProfileUpdate = async (e) => {
        e.preventDefault();

        try {
            const { data: sess, error: nosess } = await supabase.auth.getSession();

            if (nosess) {
                setFetchError('User not found!');
                return;
            }

            const user = sess.session.user;

            let uploadURL = getuser?.[0]?.profile_pic;

            if (selectFile) {
                uploadURL = await uploadPFP(selectFile);
            }

            const { error: updateErr } = await supabase
                .from('app_users')
                .update({
                    pfp_url: uploadURL,
                    username: updateUsername,
                    email: updateEmail,
                    birth_day: updateBirthday,
                    gender: updateGender,
                })
                .eq('email', user.email)

            if (updateErr) throw updateErr
            
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

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        if (getuser && getuser.length > 0) {
            const user_data = getuser[0]

            setUpdateUsername(user_data.username || '')
            setUpdateEmail(user_data.email || '')
            setUpdateBirthday(user_data.birth_day || '')
            setUpdateGender(user_data.gender || '')
        }

        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="pf-body">
            {/* Headerbar */}
            <Header />

            {/* Sidebar */}
            <Sidebar />

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
                                        value={updateUsername}
                                        onChange={(e) => setUpdateUsername(e.target.value)}
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
                                        value={updateEmail}
                                        onChange={(e) => setUpdateEmail(e.target.value)}
                                    />
                                </label>
                            </div>
                            <div className='prof-input-box'>
                                <label className='prof-details'>
                                    Change Birthday:
                                    <input 
                                    type="date" 
                                    name="bday" 
                                    value={updateBirthday}
                                    onChange={(e) => setUpdateBirthday(e.target.value)}
                                />
                                </label>
                            </div>
                            <div className='prof-input-box'>
                                <label className='prof-gender-title'>Gender</label>
                                    <select name="gender" id="gender" value={updateGender} onChange={(e) => setUpdateGender(e.target.value)}>
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
