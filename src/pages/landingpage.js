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
                            <img src="\img\RaceTrack Logos\2_FFFF.png" alt="logo" className="RaceTrack-logo" />
                        </div>
                        <div className='trial'>              
                            <p className='navbar-buttons'><NavLink to="/tos">Terms of Service</NavLink></p>
                            <p className='navbar-buttons'><NavLink to="/eula">End-User License Agreement</NavLink></p> 
                            <p className='navbar-buttons'><NavLink to="/aboutus">About Us</NavLink></p> 
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

            {/* footer */}
                {/* <footer className='footer'>
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
                </footer> */}
        </div>
    )
}

export default Landingpage