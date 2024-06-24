import { NavLink, useNavigate } from 'react-router-dom'
import '../styles/loginpage.css'
import { useState } from 'react'
import supabase from "../config/supabaseclient"

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
            setformError('Username not Found');
            return;
        }

        const user = users[0];

        if (user.Password !== logPassword) {
            setformError('Incorrect Username or Password!');
            return
        }

        setformError('You Successfuly Logged In!');
        redirect('/')
    }

    return (
        <div className="wholesite">
            <div className="whole-login">

            {/* Logo */}
                <div className="login-logo">
                    <img src="\img\RaceTrack Logos\2.png" alt="logo" className="RaceTrack-logo" />
                </div>

            {/* login form */}
            <div className="login-main-container">
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
            </div>
        </div>
    )
}

export default Login