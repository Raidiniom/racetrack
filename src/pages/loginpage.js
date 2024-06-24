import { NavLink, useNavigate } from 'react-router-dom'
import '../styles/loginpage.css'
import { useState } from 'react'
import supabase from "../config/supabaseclient"

// Mo gana nani ang login qweqweqweqweqwe

const Login = () => {
    const [logUsername, setlogUsername] = useState('')
    const [logPassword, setlogPassword] = useState('')
    const redirect = useNavigate()

    const [formError, setformError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!logUsername || !logUsername) {
            setformError('Please Fill Out all the fields!')
            return
        }

        const {data: users, error} = await supabase
          .from('users')
          .select('Username, Password')
          .eq('Username', logUsername)
        
          if (error) {
            setformError('Error fetching user data');
            return;
        }

        if (users.length === 0) {
            setformError('Incorrect Username or Password!');
            return;
        }

        const user = users[0];

        if (user.Password !== logPassword) {
            setformError('Incorrect Username or Password!');
            return;
        }

        // Successful login
        setformError('You Successfuly Logged In!');

        redirect('/')
    }

    return (
        <div className="wholesite">
            <div className="whole-2">

             {/* Navbar */}
            <div>
                <nav className="navbar">

                    {/* Logo */}
                    <div className="navbar-logo">
                        <img src="\img\RaceTrack Logos\2.png" alt="logo" className="RaceTrack-logo" />
                    </div>
                
                    {/* navbar login and sign up */}
                    <div className="navbar-links">
                        <NavLink to="/login" className="nav-link">
                            <button className="nav-button">Login</button>
                        </NavLink>
                        <NavLink to="/register" className="nav-link">
                            <button className="nav-button">Sign Up</button>
                        </NavLink>
                    </div>
                    
                </nav>
            </div>

            {/* login form */}
            <div className="main-container">
                <div className="login-form-position">
                    <div className="login-form-container">
                        <h2 className="l-h2">Login</h2>

                        {/* login form */}
                        <form className="login-form" onSubmit={handleSubmit}>

                            {/* input email */}
                            <label htmlFor="username">Username:</label>
                            <input 
                                type='text'
                                id='inuser'
                                value={logUsername}
                                onChange={(e) => setlogUsername(e.target.value)}
                            />
                            
                            {/* input password */}
                            <label htmlFor="password">Password:</label>
                            <input 
                                type='password'
                                id='inpass'
                                value={logPassword}
                                onChange={(e) => setlogPassword(e.target.value)}
                            />

                            {/* forgot password? */}
                            <NavLink to="/recover" className="forgot-password-link">Forgot Password?</NavLink>
                            
                            {/* submit */}
                            <button type="submit" className="login-button">Login</button>
                        
                            {formError && <p className='error'>{formError}</p>}
                        </form>
                    </div>
                </div>
            </div>

            {/* footer */}
            <footer className='footer'>
                    <div className='footer-container'>
                        <div className='group_ab_tos_eula'>
                            <NavLink to="/about" className="footer-link">
                                <li>About Us</li>
                            </NavLink>
                            <NavLink to="/terms" className="footer-link">
                                <li>Terms of Service</li>
                            </NavLink>
                            <NavLink to="/eula" className="footer-link">
                                <li>End-User License Agreement</li>
                            </NavLink>
                        </div>
                        <div className="contact-us">
                            <p className='contact-us'>Contact Us</p>
                            <div className="footer-img-container">
                                <img src="/img/fb.png" alt="Facebook" className="footer-image-fb" />
                                <img src="/img/IG.png" alt="Instagram" className="footer-image-ig" />
                                <img src="/img/message.png" alt="Message" className="footer-image-m" />
                            </div>
                        </div>
                    </div>
                </footer>
        </div>
    )
}

export default Login