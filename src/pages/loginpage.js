import { NavLink } from 'react-router-dom'
import '../styles/sitestyle.css'

const Login = () => {
    return (
        <div class="wholesite">

             {/* Navbar */}
            <div>
                <nav class="navbar">

                    {/* Logo */}
                    <div className="navbar-logo">
                        <p>RaceTrack</p>
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
                <div className="form-position">
                    <div className="login-form-container">
                        <h2>Login</h2>

                        {/* login form */}
                        <form className="login-form">

                            {/* input email */}
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" required />
                            
                            {/* input password */}
                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password" name="password" required />

                            {/* forgot password? */}
                            <NavLink to="/recover" className="forgot-password-link">Forgot Password?</NavLink>
                            
                            {/* submit */}
                            <button type="submit" className="login-button">Login</button>
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