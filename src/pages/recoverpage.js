import { NavLink, useNavigate } from 'react-router-dom'
import '../styles/recoverpage.css'
import '../styles/sitestyle.css'
import { useState } from 'react'
import supabase from "../config/supabaseclient"

const Recover = () => {
    const [forUsername, setForUsername] = useState('')
    const [forPassword, setForPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const redirect = useNavigate()

    const [formError, setformError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!forUsername || !forPassword || !newPassword) {
            setformError('Please Fill Out all the fields!')
            return
        }

        if (forPassword !== newPassword) {
            setformError('Passwords do not match!')
            return
        }

        const {data, error} = await supabase
          .from('app_users')
          .update({
            password: newPassword
          })
          .eq('username', forUsername)

        if (error) {
            setformError('Failed to Changed Password!')
        } else {
            setformError('Successfuly Changed Password!')
        }

        redirect('/login')

    }

    return (
        <div className="wholesite">
            <div className="rec-body">
                {/* Recover Container */}
                <div className="rec-container">
                    {/* Logo */}
                    <div className="log-logo">
                    <NavLink to='/landingpage'><img src="/img/RaceTrack Logos/2_FFFF.png" alt="logo" className="RaceTrack-logo" /></NavLink>
                    </div>
                    {/* Recover Form */}
                    <form className="rec-form" onSubmit={handleSubmit}>
                        {/* Title */}
                        <h1 className='title'>Recover Your Account</h1>
                        <div className='user-details'>
                            {/* Email */}
                            <div className='input-box'>
                                <label className='details'>Username</label>
                                <input
                                placeholder='Enter a registered username'
                                type="text" 
                                id="foruser" 
                                value={forUsername}
                                onChange={(e) => setForUsername(e.target.value)}
                                required/>  
                            </div>
                            {/* Password */}
                            <div className='input-box'>
                                <label className='details'>Set New Password</label>
                                <input
                                placeholder='Enter new password*'
                                type="password" 
                                id="forpass" 
                                value={forPassword}
                                onChange={(e) => setForPassword(e.target.value)}
                                required/>  
                            </div>
                            {/* New Password */}
                            <div className='input-box'>
                                <label className='details'>Confirm New Password</label>
                                <input
                                placeholder='Confirm new password*'
                                type="password" 
                                id="fornewpass" 
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required/>  
                            </div>
                            {/* Recover Button */}
                            <button type="submit" className="recButton">Recover</button>
                            {formError && <p className='error'>{formError}</p>}
                            <div className='misc'>
                                <div className="no-acc">
                                    <label className>Don't have an account?
                                        <NavLink to="/register" className="rec-nav-link">Sign Up</NavLink>
                                    </label> 
                                </div> 
                                <div className="rec-acc">
                                    <label className>Remembered Your Password?
                                        <NavLink to="/login" className="rec-nav-link">Log In</NavLink>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Recover