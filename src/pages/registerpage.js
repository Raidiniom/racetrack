import { NavLink, useNavigate } from 'react-router-dom'
import '../styles/registerpage.css'
import '../styles/sitestyle.css'
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
        <div className="wholesite">
            <div className="whole-register">
                    {/* Logo */}
                    <div className="register-logo">
                        <img src="\img\RaceTrack Logos\2.png" alt="logo" className="RaceTrack-logo" />
                    </div>

                {/* register form */}
                <div className="register-main-container">
                    <div className="register-form-position">
                        <div className="register-form-container">
                            <h2 className="header-form">Create an Account</h2>

                            {/* register form */}
                            <form className="registration-form" onSubmit={handleSubmit}>

                                {/* input username */}
                                <label htmlFor="username" className="usernameStyle">Username</label>
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
                                        <input 
                                            type='password'
                                            id='inconpass'
                                            value={regConfirmPassword}
                                            onChange={(e) => setRegConfirmPassword(e.target.value)}
                                        />
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
                                        <label htmlFor="phone">Set Nickname</label>
                                        <input 
                                            type='text'
                                            id='innickname'
                                            value={regNickname}
                                            onChange={(e) => setRegNickname(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">

                                        {/* input gender */}
                                        <label htmlFor="gender">Gender</label>
                                        <select name="gender" id="gender" value={regGender} onChange={(e) => setRegGender(e.target.value)}>
                                            <option value="not selected">Default Gender</option>
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
                                        <NavLink to="/tos" className="tos-link">I agree to the Terms of Service</NavLink>
                                    </label>
                                </div>

                                <div className="form-group-eula">
                                    <label>

                                        {/* eula checkbox */}
                                        <input type="checkbox" name="eula" required />
                                        <NavLink to="/eula" className="eula-link">I agree to the End-User License Agreement (EULA)</NavLink>
                                    </label>
                                </div>

                            <button className="register-button" type='submit'>Submit</button>

                            {formError && <p className='error'>{formError}</p>}    

                            <label className="have-acc">Already have an account?
                                <NavLink to="/login" className="login"> Login</NavLink>
                            </label>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register