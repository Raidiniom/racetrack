import { NavLink, useNavigate } from 'react-router-dom'
import '../styles/recoverstyle.css'
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
            setformError('Both Password are not the same!')
            return
        }

        const {data, error} = await supabase
          .from('users')
          .update({
            Password: newPassword
          })
          .eq('Username', forUsername)

        if (error) {
            setformError('Failed to Changed Password!')
        } else {
            setformError('Successfuly Changed Password!')
        }

        redirect('/login')

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
                        <form className="recover-form" onSubmit={handleSubmit}>

                            {/* input email */}
                            <label htmlFor="username">Username:</label>
                            <input 
                                type="text" 
                                id="foruser" 
                                value={forUsername}
                                onChange={(e) => setForUsername(e.target.value)}
                                required 
                            />

                            {/* input password */}
                            <label htmlFor="email">Password:</label>
                            <input 
                                type="password" 
                                id="forpass" 
                                value={forPassword}
                                onChange={(e) => setForPassword(e.target.value)}
                                required 
                            />

                            {/* input new password */}
                            <label htmlFor="email">New Password:</label>
                            <input 
                                type="password" 
                                id="fornewpass" 
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required 
                            />
                            
                            {/* submit */}
                            <button type="submit" className="recover-button">Submit</button>

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

export default Recover