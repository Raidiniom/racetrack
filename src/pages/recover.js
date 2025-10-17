import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'

// CSS
import '../styles/recover-page.css'
import '../styles/errors.css'
import '../styles/success.css'

// Config
import supabase from "../config/supabaseclient"

const Recover = () => {
    const [email, setEmail] = useState('')
    const redirect = useNavigate()

    const [formError, setformError] = useState(null)
    const [success, setSuccess] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!email) {
            setformError('Enter your Email!')
            return
        }

        const { data, error } = await supabase.auth.resetPasswordForEmail(
            email,
            {
                redirectTo: 'http://localhost:3000/update-password'
            }
        )

        if (error) {
            setformError(error.message)
        } else {
            setSuccess("Check your Email for password reset link!")
            setformError(null)
        }
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
                                <label className='rec-details'>Email:</label>
                                <input
                                placeholder='Email Address'
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required/>  
                            </div>

                            {/* Recover Button */}
                            <div class='rec-button-container'>
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
                                {success && <p className='success'>{success}</p>}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
    )
}

export default Recover