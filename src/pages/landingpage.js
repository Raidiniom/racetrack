import { NavLink } from 'react-router-dom'
import '../styles/landingpage.css'

const Landingpage = () => {
    return (
        <div className="wholesite">
           <div className="landing-body">
                <div>
                {/* Navbar */}
                <div>
                <nav className="nav-bar">
                    {/* NavBar Buttons */}
                    <div>    
                        {/* Logo */}
                        <div className='dasokan'>
                        <div className="navbar-logo">
                            <img src="\img\RaceTrack Logos\RT-logo.png" alt="logo" className="RaceTrack-logo" />
                        </div>
                        <div className='trial'>              
                            <p className='navbar-buttons'><NavLink to="/tos">Terms of Service</NavLink></p>
                            <p className='navbar-buttons'><NavLink to="/eula">End-User License Agreement</NavLink></p> 
                        </div>
                        </div>    
                    </div>
                </nav>
            </div>

                 {/* Content */}
                 <div className="content">
                    <h1>Join Events. Hassle Free.</h1>
                    <p>Optimize the process of creating and managing races and marathons, from initial planning 
                      <br></br> to seamless participant registration, with ease.</p>

                        <NavLink to="/login">
                            <button className="content-button"><span></span>Login</button>
                        </NavLink>
                        <NavLink to="/register">
                            <button className="content-button"><span></span>Sign Up</button>
                        </NavLink>

                    </div>
                </div>
            </div> 
        </div>
    )
}

export default Landingpage