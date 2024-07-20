import { NavLink, useNavigate } from 'react-router-dom'
import '../styles/loginpage.css'
import { useState } from 'react'
import supabase from "../config/supabaseclient"
import { UseUser } from './passuser'

const Login = () => {
    const [logUsername, setlogUsername] = useState('')
    const [logPassword, setlogPassword] = useState('')
    const redirect = useNavigate()

    const [passUsername, setPasUsername] = UseUser()
    const [formError, setformError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!logUsername || !logPassword) {
            setformError('Please Fill Out all the fields!')
            return
        }

        const { data: users, error } = await supabase
            .from('app_users')
            .select('user_id, username, password')
            .eq('username', logUsername)

        if (error) {
            setformError('Error fetching user data');
            return;
        }

        if (users.length === 0) {
            setformError('Username not Found');
            return;
        }

        const user = users[0];

        if (user.password !== logPassword) {
            setformError('Incorrect Username or Password!');
            return
        }

        setPasUsername(logUsername);
        localStorage.setItem('lsusername', logUsername);
        localStorage.setItem('lsuserid', user.user_id);
        setformError('You Successfully Logged In!');
        redirect('/')
    }

    return (
        <div className="wholesite">
            <div className="log-body">
                <div className="log-container">
                    <div className="log-logo">
                        <NavLink to='/landingpage'><img src="/img/RaceTrack Logos/RT-logo.png" alt="logo" className="RaceTrack-logo" /></NavLink>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <h1 className='title'>Log In</h1>
                        <div className='user-details'>
                            <div className='input-box'>
                                <label className='details'>Username</label>
                                <input
                                    placeholder='Enter your username'
                                    type='text'
                                    id='inuser'
                                    value={logUsername}
                                    onChange={(e) => setlogUsername(e.target.value)} />
                            </div>
                            <div className='input-box'>
                                <label className='details'>Password</label>
                                <input
                                    placeholder='Enter your password'
                                    type='password'
                                    id='inpass'
                                    value={logPassword}
                                    onChange={(e) => setlogPassword(e.target.value)} />
                            </div>
                            <button className="logButton" type='submit'>Log In</button>
                            {formError && <p className='error'>{formError}</p>}
                            <div className='misc'>
                                <div className="no-acc">
                                    <label>Don't have an account?
                                        <NavLink to="/register" className="log-nav-link">Sign Up</NavLink>
                                    </label>
                                </div>
                                <div className="rec-acc">
                                    <NavLink to="/recover" className="log-nav-link">Forgot Password?</NavLink>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login