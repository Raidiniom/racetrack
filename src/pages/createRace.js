import { NavLink, useNavigate } from 'react-router-dom'
import '../styles/createpage.css'
import '../styles/header_and_sidebar.css'
import { useState } from 'react'
import supabase from "../config/supabaseclient"

const Db = () => {

    const [racetitle, setRacetitle] = useState('')
    const [startdate, setStartdate] = useState('')
    const [regdate, setRegdate] = useState('')
    const [capacity, setCapacity] = useState('')
    const [description, setDescription] = useState('')
    const [minage, setMinage] = useState('')
    const [maxage, setMaxage] = useState('')
    const [trackkm, setTrackkm] = useState('')

    const [formError, setFormError] = useState(null)

    const storeduser = localStorage.getItem('lsusername')

    const redirect = useNavigate()

   const handleSubmit = async (e) => {
    e.preventDefault();

    if (!racetitle || !startdate || !regdate || !capacity || !description || !minage || !maxage || !trackkm) {
        setFormError('Please Fill all Fields!');
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
            current_cap: 0,
            min_age: minage,
            max_age: maxage,
            race_distance: trackkm,
            race_creator: racemaker
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

    const raceID = raceData[0].race_id;

    const { data: record, error: no_record } = await supabase
        .from('race_create_by')
        .insert({
            what_race: raceID,
            user_creator: racemaker
        });

    if (no_record) {
        console.log('Error linking race with creator:', no_record);
        setFormError('Error linking race with creator!');
        return;
    }

    setFormError(null);
    redirect('/madeevents');
};

const handleLogout = () => {
    localStorage.removeItem('lsusername')
}

        return (
            <div className="wholesite">
                <div class="makeEvents">
                <div class="dashboard-header">
                    <div className="dash-logo">
                        <img src="\img\RaceTrack Logos\RT-logo.png" alt="logo" className="RaceTrack-logo" />
                    </div>
                </div>

                {/* Sidebar */}
                <div class="dashboard-sidebar">
                    <ul>
                        <li><NavLink to="/profile">Your Profile</NavLink></li>
                        <li><NavLink to="/">Dashboard</NavLink></li>
                        <li><NavLink to="/madeevents">Your Races</NavLink></li>
                        <li><NavLink to="/create">Create a Race</NavLink></li>
                        <li><NavLink to="/joinedevents">Joined Races</NavLink></li>
                        <li><NavLink to="/login" onClick={handleLogout}>Log Out</NavLink></li>
                    </ul>
                </div>
                {/* Create Container */}
                <form className='crt-container' onSubmit={handleSubmit}>
                    {/* Title */}
                    <h1 className='title'>Create a Race</h1>
                    <div className='user-details'>
                        {/* Race Title */}
                        <div className='input-box'>
                            <label className='details'>Race Title:</label>
                            <input
                                placeholder='Enter race title'
                                type="title" 
                                id="racetitle" 
                                value={racetitle}  
                                onChange={(e) => setRacetitle(e.target.value)}
                                required/>
                        </div>
                        {/* Registration Date */}
                        <div className='input-box'>
                            <label className='details'>Registration Date:</label>
                            <input
                                placeholder='Enter registration date'
                                type="date" 
                                id="startdate" 
                                value={startdate}  
                                onChange={(e) => setRegdate(e.target.value)}
                                required/>
                        </div>
                        {/* Start Date */}
                        <div className='input-box'>
                            <label className='details'>Start Date:</label>
                            <input
                                placeholder='Enter start date'
                                type="date" 
                                id="startdate" 
                                value={startdate}  
                                onChange={(e) => setStartdate(e.target.value)}
                                required/>
                        </div>
                        {/* Capacity */}
                        <div className='input-box'>
                            <label className='details'>Max Number of Participants:</label>
                            <input
                                placeholder='Enter max race capacity'
                                type="int" 
                                id="capacity" 
                                value={capacity}  
                                onChange={(e) => setCapacity(e.target.value)}
                                required/>
                        </div>
                        {/* Description */}
                        <div className='input-box'>
                            <label className='details'>Description:</label>
                            <textarea id="raceDescription" name="raceDescription" rows="4" cols="50" placeholder='Input additional details about the race here...' 
                                value={description}  
                                onChange={(e) => setDescription(e.target.value)}
                                /> 
                        </div>
                        {/* Min. Age Requirement */}
                        <div className='input-box'>
                            <label className='details'>Minimum Age Requirement:</label>
                            <input
                                placeholder='Enter minimum age requirement'
                                type="int" 
                                id="minage" 
                                value={minage}  
                                onChange={(e) => setMinage(e.target.value)}
                                required/>
                        </div>
                        {/* Max. Age Requirement */}
                        <div className='input-box'>
                            <label className='details'>Maximum Age Requirement:</label>
                            <input
                                placeholder='Enter maximum age requirement'
                                type="int" 
                                id="minage" 
                                value={minage}  
                                onChange={(e) => setMaxage(e.target.value)}
                                required/>
                        </div>
                        {/* Distance */}
                        <div className='input-box'>
                            <label className='details'>Distance:</label>
                            <input
                                placeholder='Enter race distance'
                                type="int" 
                                id="trackkm" 
                                value={trackkm}  
                                onChange={(e) => setTrackkm(e.target.value)}
                                required/>
                        </div>
                         {/* Create Race Button */}
                         <button className="crtButton">Create Race</button>
                        {formError && <p className="errors">{formError}</p>}
                    </div>
                </form>
            </div>
        </div>
        
        )
    
}

export default Db