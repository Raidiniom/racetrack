import { NavLink, useNavigate } from 'react-router-dom'
import '../styles/login-page.css'
import '../styles/errors.css'
import { useState } from 'react'
import supabase from "../config/supabaseclient"
//hello
const Login = () => {
    const [logEmail, setlogEmail] = useState('')
    const [logPassword, setlogPassword] = useState('')
    const redirect = useNavigate()

    const [formError, setformError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!logEmail || !logPassword) {
            setformError('Please fill in all required fields to proceed.')
            return
        }

        try {
            const { data: users, error: nousers } = await supabase.auth.signInWithPassword({
                email: logEmail,
                password: logPassword
            })

            if (nousers) throw nousers

            

            console.log(users)

            alert('Successfuly Logged In~!')
            redirect('/dashboard')
        } catch (nousers) {
            alert(nousers)
        }
    }

    return (
            <div className="log-body">
                <div className="log-container">
                    {/* Logo */}
                    <div>
                        <NavLink to='/landing'><img src="/img/RaceTrack Logos/RT-logo.png" alt="logo" className="log-logo"/></NavLink>
                    </div>
                    {/* Login Form */}
                    <form onSubmit={handleSubmit}>
                        {/* Title */}
                        <h1 className='log-title'>Log In</h1>
                        <div className='log-user-details'>
                            {/* Username */}
                            <div className='log-input-box'>
                                <label className='log-details'>Email:</label>
                                <input
                                    placeholder='Enter your username*'
                                    type='email'
                                    id='inuser'
                                    value={logEmail}
                                    onChange={(e) => setlogEmail(e.target.value)} />
                            </div>
                            {/* Password */}
                            <div className='log-input-box'>
                                <label className='log-details'>Password:</label>
                                <input
                                    placeholder='Enter your password*'
                                    type='password'
                                    id='inpass'
                                    value={logPassword}
                                    onChange={(e) => setlogPassword(e.target.value)} />
                            </div>
                            <div className='log-misc'>
                                {/* Login Button */}
                                <div class='log-button-container'>
                                    <button class="log-button" type='submit'>Log In</button>
                                </div>
                                <div class='log-nav-wrapper'>
                                    {/* Navigation Links */}
                                    <div>
                                        Don't have an account?<NavLink to="/signup" className="log-nav-link">Sign Up</NavLink>
                                    </div>
                                    <div>
                                        <NavLink to="/recover" className="log-nav-link">Forgot Password?</NavLink>
                                    </div>
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

export default Login