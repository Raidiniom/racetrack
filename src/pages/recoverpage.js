import { NavLink, useNavigate } from 'react-router-dom'
import '../styles/recoverstyle.css'
import { useState } from 'react'
import supabase from "../config/supabaseclient"

const Recover = () => {
    const [forUsername, setForUsername] = useState('')
    const [forPassword, setForPassword] = useState('')
    const [upPassword, setUpPassword] = useState('')

    const [formError, setformError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!forUsername || !forPassword || !upPassword) {
            setformError('Please Fill Out all the fields!')
            return
        }

        const {data: users, error} = await supabase
          .from('users')
    }

    return (
        <div className="wholesite">

             {/* Navbar */}
            <div>
                <nav className="navbar">

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

            {/* recover form */}
            <div className="main-container">
                <div className="recover-form-position">
                    <div className="recover-form-container">
                        <h2 className="l-h2">Recover</h2>

                        {/* recover form */}
                        <form className="recover-form">

                            {/* input email */}
                            <label htmlFor="email">Input your email address</label>
                            <input type="email" id="email" name="email" required />
                            
                            {/* submit */}
                            <button type="submit" className="recover-button">Submit</button>
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

export default Recover