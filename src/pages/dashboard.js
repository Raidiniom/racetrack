import { NavLink } from 'react-router-dom'
import '../styles/dashboardpage.css'

const Dashboard = () => {
    return (
        <div className="wholesite">
            <div class="dashboard">
                <div class="dashboard-header">
                    <h1>RaceTrack</h1>
                </div>
                <div class="dashboard-sidebar">
                    <ul>
                        <li>Profile</li>
                        <li><NavLink to="/create">Create Race</NavLink></li>
                        <li><NavLink to="/update">Update Race</NavLink></li>
                        <li>Settings</li>
                        <li><NavLink to="/login">Logout</NavLink></li>
                    </ul>
                </div>
                <div class="dashboard-main-content">
                    <h2>Main Content</h2>
                    <div class="card">Card 1</div>
                    <div class="card">Card 2</div>
                    <div class="card">Card 3</div>
                </div>
                <div class="dashboard-footer">
                    <p>???</p>
                </div>
            </div>
                <nav>
                    
                </nav>
            
        </div>
    )
}

export default Dashboard