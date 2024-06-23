import { NavLink } from 'react-router-dom'
import '../styles/sitestyle.css'

const Register = () => {
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

            {/* register form */}
            <div className="main-container">
                <div className="register-form-position">
                    <div className="register-form-container">
                        <h2>Register</h2>

                        {/* register form */}
                        <form className="registration-form">

                            {/* input username */}
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" name="username" required />

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" id="password" name="password" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirm-password">Confirm Password</label>
                                    <input type="password" id="confirm-password" name="confirm-password" required />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="email">Email Address</label>
                                    <input type="email" id="email" name="email" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Phone No.#</label>
                                    <input type="tel" id="phone" name="phone" required />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="gender">Gender</label>
                                    <input type="text" id="gender" name="gender" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="birthday">Birthday</label>
                                    <input type="date" id="birthday" name="birthday" required />
                                </div>
                            </div>

                            <div className="form-group-tos">
                                <label>
                                    <input type="checkbox" name="tos" required />
                                    I agree to the Terms of Service
                                </label>
                            </div>

                            <div className="form-group-eula">
                                <label>
                                    <input type="checkbox" name="eula" required />
                                    I agree to the EULA
                                </label>
                            </div>

                            <button type="submit" className="register-button">Submit</button>
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

export default Register