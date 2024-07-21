import { NavLink, useNavigate } from 'react-router-dom'
import '../styles/recover-page.css'
import '../styles/errors.css'
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
            <div className="rec-body">
                <div className="rec-container">
                    {/* Logo */}
                    <div>
                        <NavLink to='/landingpage'><img src="/img/RaceTrack Logos/RT-logo.png" alt="logo" className="rec-logo"/></NavLink>
                    </div>
                    {/* Recover Form */}
                    <form onSubmit={handleSubmit}>
                        {/* Title */}
                        <h1 className='rec-title'>Recover Your Account</h1>
                        <div className='rec-user-details'>
                            {/* Email */}
                            <div className='rec-input-box'>
                                <label className='rec-details'>Username:</label>
                                <input
                                placeholder='Enter a registered username'
                                type="text" 
                                id="foruser" 
                                value={forUsername}
                                onChange={(e) => setForUsername(e.target.value)}
                                required/>  
                            </div>
                            {/* Password */}
                            <div className='rec-input-box'>
                                <label className='rec-details'>Set New Password:</label>
                                <input
                                placeholder='Enter new password*'
                                type="password" 
                                id="forpass" 
                                value={forPassword}
                                onChange={(e) => setForPassword(e.target.value)}
                                required/>  
                            </div>
                            {/* New Password */}
                            <div className='rec-input-box'>
                                <label className='rec-details'>Confirm New Password:</label>
                                <input
                                placeholder='Confirm new password*'
                                type="password" 
                                id="fornewpass" 
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required/>  
                            </div>
                            {/* Recover Button */}
                            <div className='rec-button-container'>
                                <button type="submit" className="rec-button">Recover</button>
                            </div>
                            <div className='rec-misc'>
                                <div>
                                    Don't have an account?<NavLink to="/signup" className="rec-nav-link">Sign Up</NavLink>
                                </div> 
                                <div>
                                    Already have an account?<NavLink to="/login" className="rec-nav-link">Log In</NavLink>       
                                </div>
                            </div>
                            <div>
                                {formError && <p className='error'>{formError}</p>}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
    )
}

export default Recover