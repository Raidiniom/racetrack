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
                        <img src="\img\RaceTrack Logos\2_FF.png" alt="logo" className="RaceTrack-logo" />
                    </div>
                </div>

                {/* Sidebar */}
                <div class="dashboard-sidebar">
                    <ul>
                        <li><NavLink to="/profile">Your Profile</NavLink></li>
                        <li><NavLink to="/">Dashboard</NavLink></li>
                        <li><NavLink to="/madeevents">Your Events</NavLink></li>
                        <li><NavLink to="/create">Create Race</NavLink></li>
                        <li><NavLink to="/joinedevents">Joined Event</NavLink></li>
                        <li><NavLink to="/login" onClick={handleLogout}>Logout</NavLink></li>
                    </ul>
                </div>

                {/* Main Content */}
                <div className='whole-create'>
                    <div className="create-main-container">
                        <div className="create-form-position">
                            <div className="create-form-container">
                            <h2 className="create-h2">Create Race</h2>

                            {/* create form */}
                                <form className="create-form" onSubmit={handleSubmit}>

                                    {/* input title */}
                                    <label htmlFor="racetitle">Title of the Race:</label>
                                    <input 
                                    type="title" 
                                    id="racetitle" 
                                    value={racetitle}  
                                    onChange={(e) => setRacetitle(e.target.value)}
                                    />
                                
                                    {/* input start date */}
                                    <div className="form-row-age">
                                        <div className="form-group-age">
                                            <label htmlFor="stardate">Start Date:</label>
                                            <input 
                                            type="date" 
                                            id="startdate" 
                                            value={startdate}  
                                            onChange={(e) => setStartdate(e.target.value)}
                                            />
                                        </div>

                                            {/* input registration date */}
                                        <div className="form-group-age">
                                            <label htmlFor="regdate">Registration Date:</label>
                                            <input 
                                            type="date" 
                                            id="regdate" 
                                            value={regdate}  
                                            onChange={(e) => setRegdate(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    {/* input capacity */}
                                    <label htmlFor="capacity">Capacity (Number of Participant):</label>
                                    <input 
                                    type="int" 
                                    id="capacity" 
                                    value={capacity}  
                                    onChange={(e) => setCapacity(e.target.value)}
                                    />

                                    {/* input race description */}
                                    <label htmlFor="description">Enter Race Description:</label>
                                    {/* <input 
                                    type="text" 
                                    id="description" 
                                    value={description}  
                                    onChange={(e) => setDescription(e.target.value)}
                                    /> */}
                                    <textarea id="raceDescription" name="raceDescription" rows="4" cols="50" placeholder='Input additional details about the race here...' 
                                    value={description}  
                                    onChange={(e) => setDescription(e.target.value)}
                                    /> 

                                    
                                
                                    {/* event race banner */}

                                    {/* payment method */}
                                        {/* <select name="payment_method" id="payment_method">
                                            <option value="GCash">Default Gender</option>
                                            <option value="Paypal">Male</option>
                                            <option value="Credit/Debit Card">Female</option>
                                            <option value="other">Other</option> */}
                                    {/* genre */}
                                
                                    {/* age restriction */}
                                    <div className="form-row-age">
                                        <div className="form-group-age">    
                                            <label htmlFor="minage">Minimum Age:</label>
                                            <input 
                                            type="int" 
                                            id="minage" 
                                            value={minage}  
                                            onChange={(e) => setMinage(e.target.value)}
                                            />
                                        </div>
                                        
                                            {/* input age Maximum limit */}
                                        <div className="form-group-age">
                                            <label htmlFor="maxage">Maximum Age:</label>
                                            <input 
                                            type="int" 
                                            id="maxage" 
                                            value={maxage}  
                                            onChange={(e) => setMaxage(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    {/* distance */}
                                    <label htmlFor="trackkm">Track Kilometers:</label>
                                    <input 
                                    type="int" 
                                    id="trackkm" 
                                    value={trackkm}  
                                    onChange={(e) => setTrackkm(e.target.value)}
                                    />
                                
                                    {/* submit */}
                                    <button className="create-button">Create Race</button>

                                    {formError && <p className="errors">{formError}</p>}

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        
        )
    
}

export default Db