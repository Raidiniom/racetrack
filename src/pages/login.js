import { NavLink, useNavigate } from 'react-router-dom'
import '../styles/login-page.css'
import '../styles/errors.css'
import { useState } from 'react'
import supabase from "../config/supabaseclient"
//hello
const Login = () => {
    const [logUsername, setlogUsername] = useState('')
    const [logPassword, setlogPassword] = useState('')
    const redirect = useNavigate()

    const [formError, setformError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!logUsername || !logPassword) {
            setformError('Please fill in all required fields to proceed.')
            return
        }

        const { data: users, error } = await supabase
            .from('app_users')
            .select('user_id, username, password')
            .eq('username', logUsername)

        if (error) {
            setformError('Error fetching user data.');
            return;
        }

        if (users.length === 0) {
            setformError('Username not found.');
            return;
        }

        const user = users[0];

        if (user.password !== logPassword) {
            setformError('Incorrect Password.');
            return
        }

        if (user.password !== logPassword) {
            setformError('Incorrect Password.');
            return
        }

        localStorage.setItem('lsusername', logUsername);
        localStorage.setItem('lsuserid', user.user_id);
        setformError('You Successfully Logged In!');
        redirect('/dashboard')
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
                                <label className='log-details'>Username:</label>
                                <input
                                    placeholder='Enter your username*'
                                    type='text'
                                    id='inuser'
                                    value={logUsername}
                                    onChange={(e) => setlogUsername(e.target.value)} />
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