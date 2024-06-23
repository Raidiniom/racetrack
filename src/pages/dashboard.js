import { NavLink } from 'react-router-dom'
import '../styles/sitestyle.css'

const Dashboard = () => {
    return (
        <div className="wholesite">
            <div className="header">
                <h1>RaceTrack</h1>

                <nav>
                    <NavLink to="/create">Create Race</NavLink>
                </nav>
            </div>
        </div>
    )
}

export default Dashboard