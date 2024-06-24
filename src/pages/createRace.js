import { NavLink } from 'react-router-dom'
import '../styles/sitestyle.css'

const Creater = () => {
    return (
        <div className="wholesite">
            <div className="main-container">
                <div className="create-form-position">
                    <div className="create-form-container">
                        <h2 className="l-h2">Create Race</h2>

                        {/* login form */}
                        <form className="create-form">

                            {/* input email */}
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" required />
                            
                            {/* input password */}
                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password" name="password" required />

                            {/* forgot password? */}
                            <NavLink to="/recover" className="forgot-password-link">Forgot Password?</NavLink>
                            
                            {/* submit */}
                            <button type="submit" className="create-button">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default Creater