import { NavLink, useNavigate } from 'react-router-dom'
import '../styles/create-page.css'
import '../styles/header_and_sidebar.css'
import { useState } from 'react'
import supabase from "../config/supabaseclient"
//hello
const Db = () => {
    const [racetitle, setRacetitle] = useState('');
    const [startdate, setStartdate] = useState('');
    const [regdate, setRegdate] = useState('');
    const [capacity, setCapacity] = useState('');
    const [description, setDescription] = useState('');
    const [minage, setMinage] = useState('');
    const [maxage, setMaxage] = useState('');
    const [trackkm, setTrackkm] = useState('');
    const [location, setLocation] = useState('');
    const [formError, setFormError] = useState(null);

    const storeduser = localStorage.getItem('lsusername');
    const redirect = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!racetitle || !startdate || !regdate || !capacity || !description || !minage || !maxage || !trackkm || !location) {
            setFormError('Please fill all fields!');
            return;
        }

        const { data: userdata, error: nouser } = await supabase
            .from('app_users')
            .select('user_id')
            .eq('username', storeduser);

        if (nouser) {
            console.log('Error fetching user data:', nouser);
            setFormError('Error fetching user data!');
            return;
        }

        if (!userdata || userdata.length === 0) {
            console.log('User data is empty or undefined');
            setFormError('User does not exist!');
            return;
        }

        const racemaker = userdata[0].user_id;

        const { data: raceData, error: insertError } = await supabase
            .from('user_created_race')
            .insert({
                race_title: racetitle,
                race_description: description,
                start_date: startdate,
                registration_date: regdate,
                capacity: capacity,
                min_age: minage,
                max_age: maxage,
                race_distance: trackkm,
                race_creator: racemaker,
                location: location
            })
            .select('race_id');

        if (insertError) {
            console.log('Error inserting race data:', insertError);
            setFormError('Error creating race!');
            return;
        }

        if (!raceData || raceData.length === 0) {
            console.log('Race data is empty or undefined');
            setFormError('Error creating race!');
            return;
        }

        setFormError(null);
        redirect('/madeevents');
    };

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        sessionStorage.removeItem('token');

        if (error) {
            console.error(error);
        } else {
            window.location.href = '/';
        }
    };

    return (
        <div className="wholesite">
            <div className="makeEvents">
                <div className="dashboard-header">
                    <div className="dash-logo">
                        <img src="/img/RaceTrack Logos/RT-logo.png" alt="logo" className="RaceTrack-logo" />
                    </div>
                </div>
                {/* Sidebar */}
                <div className="dashboard-sidebar">
                    <ul>
                        <li><NavLink to="/profile">Your Profile</NavLink></li>
                        <li><NavLink to="/created-races">Your Races</NavLink></li>
                        <li><NavLink to="/joined-races">Joined Races</NavLink></li>
                        <li><NavLink to="/dashboard">Join a Race</NavLink></li>
                        <li><NavLink to="/create-race">Create a Race</NavLink></li>
                        <li><NavLink to="/landing" onClick={handleLogout}>Log Out</NavLink></li>
                    </ul>
                </div>
                <div className="cr-main-content">
                    <div className="cr-main-content-header">
                        <h2>Create a Race</h2>
                    </div>
                    {/* Create Form Container */}
                    <div className="cr-container">
                        <form onSubmit={handleSubmit}>
                            <div className='cr-user-details'>
                                {/* Race Title */}
                                <div className='cr-input-box'>
                                    <label className='cr-details'>Race Title:</label>
                                    <input
                                        placeholder='Enter race title'
                                        type="text"
                                        id="racetitle"
                                        value={racetitle}
                                        onChange={(e) => setRacetitle(e.target.value)}
                                        required
                                    />
                                </div>
                                {/* Start Date */}
                                <div className='cr-input-box'>
                                    <label className='cr-details'>Start Date:</label>
                                    <input
                                        placeholder='Enter start date'
                                        type="date"
                                        id="startdate"
                                        value={startdate}
                                        onChange={(e) => setStartdate(e.target.value)}
                                        required
                                    />
                                </div>
                                {/* Description */}
                                <div className='cr-input-box'>
                                    <label className='cr-details'>Description:</label>
                                    <textarea
                                        id="raceDescription"
                                        name="raceDescription"
                                        rows="4"
                                        cols="20"
                                        placeholder='Input additional details about the race here...'
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                                {/* Registration Date */}
                                <div className='cr-input-box'>
                                    <label className='cr-details'>Registration Date:</label>
                                    <input
                                        placeholder='Enter registration date'
                                        type="date"
                                        id="regdate"
                                        value={regdate}
                                        onChange={(e) => setRegdate(e.target.value)}
                                        required
                                    />
                                </div>
                                {/* Track Distance */}
                                <div className='cr-input-box'>
                                    <label className='cr-details'>Track Distance (km):</label>
                                    <input
                                        placeholder='Enter race distance'
                                        type="number"
                                        id="trackkm"
                                        value={trackkm}
                                        onChange={(e) => setTrackkm(e.target.value)}
                                        required
                                    />
                                </div>
                                {/* Min. Age Requirement */}
                                <div className='cr-input-box'>
                                    <label className='cr-details'>Minimum Age Requirement:</label>
                                    <input
                                        placeholder='Enter min. age requirement'
                                        type="number"
                                        id="minage"
                                        value={minage}
                                        onChange={(e) => setMinage(e.target.value)}
                                        required
                                    />
                                </div>
                                {/* Max. Age Requirement */}
                                <div className='cr-input-box'>
                                    <label className='cr-details'>Maximum Age Requirement:</label>
                                    <input
                                        placeholder='Enter max. age requirement'
                                        type="number"
                                        id="maxage"
                                        value={maxage}
                                        onChange={(e) => setMaxage(e.target.value)}
                                        required
                                    />
                                </div>
                                {/* Location */}
                                <div className='cr-input-box'>
                                    <label className='cr-details'>Location:</label>
                                    <input
                                        placeholder='Enter race location'
                                        type="text"
                                        id="location"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        required
                                    />
                                </div>
                                {/* Create Race Button */}
                                <button className="crtButton">Create Race</button>
                                {formError && <p className="errors">{formError}</p>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Db;
