// Original

import { NavLink, useNavigate } from 'react-router-dom'
import '../styles/signup-page.css'
import '../styles/errors.css'
import { useState } from 'react'
import supabase from "../config/supabaseclient"

const Register = () => {
    const [regUsername, setRegUsername] = useState('')
    const [regPassword, setRegPassword] = useState('')
    const [regConfirmPassword, setRegConfirmPassword] = useState('')
    const [regEmail, setRegEmail] = useState('')
    const [regBDay, setRegBDay] = useState('')
    const [regGender, setRegGender] = useState('')
    const [regNickname, setRegNickname] = useState('')

    const redirect = useNavigate()

    const [formError, setformError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const {data, error} = await supabase
          .from('app_users')
          .insert({
            display_name: regNickname,
            username: regUsername,
            password: regPassword,
            email: regEmail,
            birth_day: regBDay,
            gender: regGender
          })
          .select('*')

          if (!regUsername || !regPassword || !regConfirmPassword || !regEmail || !regBDay || !regGender || !regNickname) {
            setformError('Please Fill Out all the fields!')
            return
        }
        
        if (regPassword !== regConfirmPassword) {
            setformError('Password does not Match Try Again!')
            return
        }

          setformError('You Successfuly Registered')
          redirect('/login')
    }

    return (
        
            <div className="reg-body">
                {/* Register Container */}
                <div className="reg-container">
                    {/* Logo */}
                    <div>
                        <NavLink to='/landing'><img src="/img/RaceTrack Logos/RT-logo.png" alt="logo" className="reg-logo"/></NavLink>
                    </div>
                    {/* Register Form */}
                    <form onSubmit={handleSubmit}>
                        {/* Title */}
                        <h1 className='reg-title'>Registration</h1>
                        <div className='reg-user-details'>
                            {/* Username */}
                            <div className='reg-input-box'>
                                <label className='reg-details'>Username</label>
                                <input
                                    placeholder='Enter your preferred username'
                                    type='text'
                                    id='inuser'
                                    value={regUsername}
                                    onChange={(e) => setRegUsername(e.target.value)}
                                    required/>
                            </div>
                            {/* Email */}
                            <div className='reg-input-box'>
                                <label className='reg-details'>Email Address</label>
                                <input
                                placeholder='Enter your email address'
                                type='email'
                                id='inemail'
                                value={regEmail}
                                onChange={(e) => setRegEmail(e.target.value)}
                                required/>
                            </div>
                            {/* Password */}
                            <div className='reg-input-box'>
                                <label className='reg-details'>Password</label>
                                <input
                                    placeholder='Enter your password'
                                    type='password'
                                    id='inpass'
                                    value={regPassword}
                                    onChange={(e) => setRegPassword(e.target.value)}
                                    required/>
                            </div>
                            {/* Nickname */}
                            <div className='reg-input-box'>
                                <label className='reg-details'>Nickname</label>
                                <input
                                    placeholder='Enter your nickname'
                                    type='text'
                                    id='innickname'
                                    value={regNickname}
                                    onChange={(e) => setRegNickname(e.target.value)}
                                    required/>
                            </div>
                            
                            {/* Conf. Password */}
                            <div className='reg-input-box'>
                                <label className='reg-details'>Confirm Password</label>
                                <input
                                    placeholder='Confirm your password'
                                    type='password'
                                    id='inconpass'
                                    value={regConfirmPassword}
                                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                                    required/>
                            </div>
                            {/* Birthday */}
                            <div className='reg-input-box'>
                                <label className='reg-details'>Birthday</label>
                                <input 
                                    type='date'
                                    id='indate'
                                    value={regBDay}
                                    onChange={(e) => setRegBDay(e.target.value)}
                                    required/>
                            </div>
                            {/* Gender */}
                            <div className='reg-input-box'>
                                <label className='reg-gender-title'>Gender</label>
                                <select name="gender" id="gender" value={regGender} onChange={(e) => setRegGender(e.target.value)} required>
                                    <option value="not selected">Default Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="prefer-not-to-say">Prefer not to say</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className='reg-misc'>
                                {/* EULA and TOS */}
                                <div className='reg-agreements-details'>
                                    <label className='reg-agreements-title'><input type="checkbox" name="tos" required/>
                                        I agree to the  <NavLink to="/tos" className="reg-nav-link"> Terms of Service</NavLink>
                                    </label>
                                    <label className='reg-agreements-title'><input type="checkbox" name="eula" required/>
                                        I agree to the <NavLink to="/eula" className="reg-nav-link"> End-User License Agreement (EULA)</NavLink>
                                    </label>
                                </div> 
                                {/* Sign Up Button */}
                                <button className="reg-button" type='submit'>Sign Up</button>
                                {/* Navigation Links */}
                                <div>
                                    Already have an account?<NavLink to="/login" className="reg-nav-link">Login</NavLink>
                                </div> 
                                <div>
                                    {formError && <p className='error'>{formError}</p>}
                                </div> 
                            </div>
                        </div> 
                    </form>
                </div>
            </div>
        
    )
}

export default Register