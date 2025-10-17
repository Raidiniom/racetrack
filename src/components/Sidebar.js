import { NavLink } from "react-router-dom";
import supabase from "../config/supabaseclient";
import '../styles/header_and_sidebar.css'

const Sidebar = () => {
    const handleLogout = async () => {
        const {error} = await supabase.auth.signOut()

        if (error) {
            console.error(error);
        } else {
            window.location.href='/login'
        }
    }

    return (
        <div className="gen-sidebar">
            <ul>
                <li><NavLink to="/profile">Your Profile</NavLink></li>
                <li><NavLink to="/created-races">Your Races</NavLink></li>
                <li><NavLink to="/joined-races">Joined Races</NavLink></li>
                <li><NavLink to="/dashboard">Join a Race</NavLink></li>
                <li><NavLink to="/create-race">Create a Race</NavLink></li>
                <li><NavLink to="/landing" onClick={handleLogout}>Log Out</NavLink></li>
            </ul>
        </div>
    )
}

export default Sidebar