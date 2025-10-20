import { NavLink, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

// CSS
import '../styles/update-race.css'
import '../styles/header_and_sidebar.css'
import '../styles/errors.css'

// Config
import supabase from "../config/supabaseclient"

const UpdateEvent = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [ getraces, setGetraces ] = useState(null)
    const [ fetchError, setFetchError ] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formError, setFormError] = useState(null)

    const [authuser, setAuthuser] = useState(null);

    //race table
    const [racetitle, setRacetitle] = useState('')
    const [startdate, setStartdate] = useState('')
    const [regdate, setRegdate] = useState('')
    const [capacity, setCapacity] = useState('')
    const [description, setDescription] = useState('')
    const [minage, setMinage] = useState('')
    const [maxage, setMaxage] = useState('')
    const [trackkm, setTrackkm] = useState('')
    const [location, setLocation] = useState('')

    useEffect(() => {
        console.log('Fetching race with id:', id);
        const fetchRaces = async () => {
            const { data, error } = await supabase
             .from('user_created_race')
             .select('*')
             .eq('race_id', id)
             .single();

            if(error){
                console.error('Error fetching race:', error);
                setFetchError('No Races Open!')
                setGetraces(null)
            }
            if(data){
                console.log('Fetched race data:', data);
                setRacetitle(data.race_title || '');
                setDescription(data.race_description || '');
                setStartdate(data.start_date || '');
                setRegdate(data.registration_date || '');
                setCapacity(data.capacity || '');
                setMinage(data.min_age || '');
                setMaxage(data.max_age || '');
                setTrackkm(data.race_distance || '');
                setLocation(data.location || '');
                setGetraces(data);
                setFetchError(null);
            }
        }
        fetchRaces()
    }, [id, navigate])

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!racetitle || !startdate || !regdate || !capacity || !description || !minage || !maxage || !trackkm) {
            setFormError('Please Fill all Fields!')
            return
        }

        const { data: session, error: noSession } = await supabase.auth.getSession();
                
        // Check for errors and log them
        if (noSession) {
            console.error('Session Error:', noSession.message);
            return;
        }

        const user = session.session.user
        setAuthuser(user);

        const {data: userdata, error: nouser} = await supabase
         .from('app_users')
         .select('user_id')
         .eq('email', user.email)


        if (nouser || userdata.length === 0) {
            setFormError('User not found!');
            return;
        }

        const {data, error} = await supabase
            .from('user_created_race')
            .update({ 
                race_title: racetitle,
                race_description: description,
                start_date: startdate, 
                registration_date: regdate, 
                capacity: capacity, 
                min_age: minage, 
                max_age: maxage, 
                race_distance: trackkm,
                location: location
            })

            .eq('race_id',id);


            if (error) {
                console.log(error)
                setFormError('Please Fill all Fields!')
            } else {
                console.log(data)
                setFormError(null)
                closeModal();
            }
    }

    return (
        <div className="updatec-body">
            {/* Headerbar */}
            <div class="gen-headerbar">
                    <div className="gen-headerbar-logo">
                        <NavLink to='/dashboard'><img src="/img/RaceTrack Logos/RT-logo.png" alt="logo" className="RaceTrack-logo" /></NavLink>
                    </div>
                    <div className="header-right">
                        <div className="pfp">
                            <NavLink to="/profile">
                                <button className="notification-button">
                                    <img src="img/pfp.png" alt="icon" className="pfp-icon" /> Profile
                                </button>
                            </NavLink>
                        </div>
                        <div className="notifications-container">
                            <NavLink to="/notifications">
                                <button className="notification-button">
                                    <img src="img/noti-icon.png" alt="icon" className="noti-icon" /> Notifications
                                </button>
                            </NavLink>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div class="update-viewraces-main-content">
                    <div class='update-viewraces-main-content-header'>
                        <h2>Race Details</h2>
                    </div>  
                        {/* Race Display */}
                        <div class="viewraces-main-container">
                        {fetchError && (<p className='error'>{fetchError}</p>)}
                            {getraces && (
                                <div className="update-viewraces-card">
                                    <div class='update-viewraces-card-racetitle'>
                                        {getraces.race_title}
                                    </div>
                                    <p class='update-desc'>{getraces.race_description}</p>
                                    {/* Insert Picture/Banner here */}
                                    <div class="update-viewraces-card-banner-container">
                                    <img src="insert-path-here" alt="banner" class="dashb-card-banner"/>
                                    </div>
                                    <div class="update-viewraces-card-details-container">
                                        <div class='update-viewraces-card-details-wrapper'>
                                            <img src="/img/agereq-icon.png" class="icon"/>
                                            <div><label class="update-viewraces-card-details">Age Requirement:</label> {getraces.min_age} - {getraces.max_age} years old</div>
                                        </div>
                                        <div class='update-viewraces-card-details-wrapper'>
                                            <img src="/img/distance-icon.png" class="icon"/>
                                            <div><label class="update-viewraces-card-details">Race Distance:</label> {getraces.race_distance} KM</div>
                                        </div>
                                        <div class='update-viewraces-card-details-wrapper'>
                                            <img src="/img/capacity-icon.png" class="icon"/>
                                            <div><label class="update-viewraces-card-details">Maximum Racers:</label> {getraces.capacity}</div>
                                        </div>
                                        <div class='update-viewraces-card-details-wrapper'>
                                            <img src="/img/loc-icon.png" class="icon"/>
                                            <div><label class="update-viewraces-card-details">Location:</label> {getraces.location}</div>
                                        </div>
                                        <div class='update-viewraces-card-details-wrapper'>
                                            <img src="/img/participant-icon.png" class="icon"/>
                                            <div><label class="update-viewraces-card-details">Currently Joined:</label> {getraces.current_participant}</div>
                                        </div>
                                        <div class='update-viewraces-card-details-wrapper'>
                                            <img src="/img/calendar-icon.png" class="icon"/>
                                            <div><label class="update-viewraces-card-details">Start Date:</label> {getraces.start_date}</div>
                                            <div><label class="update-viewraces-card-details">Registration Date:</label> {getraces.registration_date}</div>
                                        </div>
                                    </div>
                                    <div className="update-button-container">
                                        <button className="update-event-button" onClick={openModal}>Update Event</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    
                {isModalOpen && (
                    <div className="modal-up">
                        <div className="modal-content">
                            <div className="close" onClick={closeModal}>&times;</div>
                            <h2>Update Event</h2>
                            <form onSubmit={handleSubmit}>
                                 {/* //update race title */}
                                 <label htmlFor="racetitle">Title of the Race:</label>
                                <input 
                                    type="text" 
                                    id="racetitle" 
                                    value={racetitle || ''}  
                                    onChange={(e) => setRacetitle(e.target.value)}
                                    />

                                {/* // update race description */}
                                <label htmlFor="description">Enter Race Description:</label>
                                    <textarea id="raceDescription" name="raceDescription" rows="4" cols="50" placeholder='Input additional details about the race here...' 
                                    value={description}  
                                    onChange={(e) => setDescription(e.target.value)}
                                    /> 

                                {/* // update startdate */}
                                <label htmlFor="startdate">Start Date:</label>
                                    <input 
                                    type="date" 
                                    id="startdate" 
                                    value={startdate}  
                                    onChange={(e) => setStartdate(e.target.value)}
                                    />

                                {/* // update registration date */}
                                <label htmlFor="regdate">Registration Date:</label>
                                    <input 
                                    type="date" 
                                    id="regdate" 
                                    value={regdate}  
                                    onChange={(e) => setRegdate(e.target.value)}
                                    />

                                {/* // update minimum age */}
                                <label htmlFor="minage">Minimum Age:</label>
                                    <input 
                                    type="int" 
                                    id="minage" 
                                    value={minage}  
                                    onChange={(e) => setMinage(e.target.value)}
                                    />

                                {/* // update maximum age */}
                                <label htmlFor="maxage">Maximum Age:</label>
                                    <input 
                                    type="int" 
                                    id="maxage" 
                                    value={maxage}  
                                    onChange={(e) => setMaxage(e.target.value)}
                                    />


                                {/* // update capacity */}
                                <label htmlFor="capacity">Capacity (Number of Participant):</label>
                                    <input 
                                    type="int" 
                                    id="capacity" 
                                    value={capacity}  
                                    onChange={(e) => setCapacity(e.target.value)}
                                    />


                                {/* // update distance */}
                                <label htmlFor="trackkm">Track Kilometers:</label>
                                    <input 
                                    type="int" 
                                    id="trackkm" 
                                    value={trackkm}  
                                    onChange={(e) => setTrackkm(e.target.value)}
                                    />

                                <label className='details'>Location:</label>
                                <input
                                    placeholder='Enter race location'
                                    type="text"
                                    id="location"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    />

                                <button type="submit">Update</button>

                                {formError && <p className="error">{formError}</p>}

                            </form>
                        </div>
                    </div>
                )}
        </div>
    );
};

export default UpdateEvent;