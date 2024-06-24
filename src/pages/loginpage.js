import { NavLink } from 'react-router-dom'
import '../styles/loginpage.css'

const Login = () => {
    return (
        <div className="wholesite">

            <div className="logo">
                <img src="\img\RaceTrack Logos\2.png" alt="logo" className="RaceTrack-logo" />
            </div>
            {/* login form */}
            <div className="main-container">
                <div className="login-form-position">
                    <div className="login-form-container">
                        <h2 className="l-h2">Login</h2>

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
        </div>
    )
}

export default Login