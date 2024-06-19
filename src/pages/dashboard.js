import { NavLink } from 'react-router-dom'
import '../styles/sitestyle.css'

const Dashboard = () => {
    return (
        <div class="wholesite">
            <div class="header">
                <h1>RaceTrack</h1>

                <nav>
                    <NavLink to="/create">Create Race</NavLink>
                </nav>
            </div>
        </div>
    )
}

export default Dashboard