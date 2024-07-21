import { NavLink } from 'react-router-dom'
import '../styles/landing-page.css'
//hello
const Landingpage = () => {
    return (
           <div className="landing-body">
                <div>
                    {/* Header Bar */}
                    <div>
                        <nav className="header-bar-container">
                            <div>    
                                <div className='header-bar-wrapper'>
                                {/* Logo */}
                                <div>
                                    <img src="\img\RaceTrack Logos\RT-logo.png" alt="logo" className="header-bar-logo" />
                                </div>
                                {/* Header Buttons */}
                                <div className='header-buttons-wrapper'>              
                                    <p className='header-buttons'><NavLink to="/tos">Terms of Service</NavLink></p>
                                    <p className='header-buttons'><NavLink to="/eula">End-User License Agreement</NavLink></p> 
                                </div>
                                </div>    
                            </div>
                        </nav>
                    </div>
                    {/* Content */}
                    <div className="content-container">
                        <h1>Join Events. Hassle Free.</h1>
                        <p>Optimize the process of creating and managing races and marathons, from initial planning 
                        <br></br> to seamless participant registration, with ease.</p>
                        <NavLink to="/login">
                            <button className="content-button"><span></span>Login</button>
                        </NavLink>
                        <NavLink to="/signup">
                             <button className="content-button"><span></span>Sign Up</button>
                        </NavLink>
                    </div>
                </div>
            </div> 
    )
}

export default Landingpage