import { NavLink } from 'react-router-dom'
import '../styles/registerpage.css'
import '../styles/sitestyle.css'
import { useState } from 'react'
import supabase from "../config/supabaseclient"

const Register = () => {
    const [regUsername, setRegUsername] = useState('')
    const [regPassword, setRegPassword] = useState('')
    const [regEmail, setRegEmail] = useState('')
    const [regBDay, setRegBDay] = useState('')
    const [regGender, setRegGender] = useState('')
    const [regContactNo, setRegContactNo] = useState('')

    const [formError, setformError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!regUsername || !regPassword || !regEmail || !regBDay || !regGender || !regContactNo) {
            setformError('Please Fill Out all the fields!')
            return
        }

        console.log('Debugging Output: ', regUsername, regPassword, regEmail, regBDay, regGender, regEmail)

        const {data, error} = await supabase
          .from('users')
          .insert({
            Username: regUsername,
            Password: regPassword,
            Email: regEmail,
            Birth_day: regBDay,
            Gender: regGender,
            Contact_no: regContactNo
          })
          .select('*')
    }

    return (
        <div class="wholesite">
            {/* Navbar */}
            <div>
                <nav class="navbar">

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

            {/* register form */}
            <div className="main-container">
                <div className="register-form-position">
                    <div className="register-form-container">
                        <h2>Register</h2>

                        {/* register form */}
                        <form className="registration-form" onSubmit={handleSubmit}>

                            {/* input username */}
                            <label htmlFor="username">Username</label>
                            <input 
                                type='text'
                                id='inuser'
                                value={regUsername}
                                onChange={(e) => setRegUsername(e.target.value)}
                            />

                            <div className="form-row">
                                <div className="form-group">

                                    {/* input password */}
                                    <label htmlFor="password">Password</label>
                                    <input 
                                        type='password'
                                        id='inpass'
                                        value={regPassword}
                                        onChange={(e) => setRegPassword(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">

                                    {/* input confirm password */}
                                    <label htmlFor="confirm-password">Confirm Password</label>
                                    <input type="password" id="confirm-password" name="confirm-password" required />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">

                                    {/* input email */}
                                    <label htmlFor="email">Email Address</label>
                                    <input 
                                        type='email'
                                        id='inemail'
                                        value={regEmail}
                                        onChange={(e) => setRegEmail(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">

                                    {/* input phone number */}
                                    <label htmlFor="phone">Phone No.#</label>
                                    <input 
                                        type='text'
                                        id='incontactno'
                                        value={regContactNo}
                                        onChange={(e) => setRegContactNo(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">

                                    {/* input gender */}
                                    <label htmlFor="gender">Gender</label>
                                    <select name="gender" id="gender" value={regGender} onChange={(e) => setRegGender(e.target.value)}>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="prefer-not-to-say">Prefer not to say</option>
                                        <option value="other">Other</option>
                                        
                                    </select>
                                </div>
                                <div className="form-group">

                                    {/* input birthday */}
                                    <label htmlFor="birthday">Birthday</label>
                                    <input 
                                        type='date'
                                        id='indate'
                                        value={regBDay}
                                        onChange={(e) => setRegBDay(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="form-group-tos">
                                <label>

                                    {/* tos checkbox */}
                                    <input type="checkbox" name="tos" required />
                                    I agree to the Terms of Service
                                </label>
                            </div>

                            <div className="form-group-eula">
                                <label>

                                    {/* eula checkbox */}
                                    <input type="checkbox" name="eula" required />
                                    I agree to the EULA
                                </label>
                            </div>

                        <button className="register-button" type='submit'>Submit</button>

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

export default Register