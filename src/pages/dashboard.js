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
                    <h2>Events</h2>
                    <div class="card">Display the events made by others here</div>
                    <div class="card">Display the events made by others here</div>
                    <div class="card">Display the events made by others here</div>
                </div>
                <div class="dashboard-footer">
                    <p>???</p>
                </div>
            </div>
        </div>
    )
}

export default Dashboard