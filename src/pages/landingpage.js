import { NavLink } from 'react-router-dom'
import '../styles/sitestyle.css'

const Landingpage = () => {
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
                        <NavLink to="/create" className="nav-link">
                            <button className="nav-button">Login</button>
                        </NavLink>
                        <NavLink to="/create" className="nav-link">
                            <button className="nav-button">Sign Up</button>
                        </NavLink>
                    </div>
                    
                </nav>
            </div>

            <h2>Landingpage</h2>
            <p>THIS THE Landingpage</p>

            {/* footer */}
                <div className='footer'>
                    <NavLink to="/create">About Us</NavLink>
                    <NavLink to="/create">Terms of Service</NavLink>
                    <NavLink to="/create">End-User License Agreement</NavLink>
                </div>
        </div>
    )
}

export default Landingpage