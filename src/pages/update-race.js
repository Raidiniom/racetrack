//import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom'
import '../styles/viewevents.css';
import '../styles/header_and_sidebar.css'
import supabase from "../config/supabaseclient"
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

//PLEASE AYAW HILABTI ANG CODE KAY HASUL KAAU MAG BACKTRACK!!
const UpdateEvent = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [ getraces, setGetraces ] = useState(null)
    const [ fetchError, setFetchError ] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formError, setFormError] = useState(null)

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
             .select()
             .eq('race_id', id)
             .single();

            if(error){
                console.error('Error fetching race:', error);
                //navigate('/', {replace: true})
                setFetchError('No Races Open!')
                setGetraces(null)
            }
            if(data){
                console.log('Fetched race data:', data);
                setRacetitle(data.racetitle)
                setDescription(data.description)
                setStartdate(data.startdate)
                setRegdate(data.regdate)
                setCapacity(data.capacity)
                setMinage(data.minage)
                setMaxage(data.maxage)
                setTrackkm(data.trackkm)
                setGetraces(data)
                setFetchError(null)
            }
        }
        fetchRaces()
    }, [id, navigate])

    const storeduser = localStorage.getItem('lsusername')

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut()
        sessionStorage.removeItem('token')

        if (error) {
            console.error(error)
        } else {
            window.location.href='/'
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!racetitle || !startdate || !regdate || !capacity || !description || !minage || !maxage || !trackkm) {
            setFormError('Please Fill all Fields!')
            return
        }

        const {data: userdata, error: nouser} = await supabase
         .from('app_users')
         .select('user_id')
         .eq('username', storeduser)

        //  New
         if (nouser || userdata.length === 0) {
            setFormError('User not found!');
            return;
          }
          // End New

        const racemaker = userdata[0].user_id

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
                race_creator: racemaker,
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
        <div className="wholesite">
            <div className="viewEvents">
            <div className="dashboard-header">
                    <div className="dash-logo">
                        <img src="\img\RaceTrack Logos\RT-logo.png" alt="logo" className="RaceTrack-logo" />
                    </div>
                </div>

                {/* Sidebar */}
                <div className="dashboard-sidebar">
                    <ul>
                        <li><NavLink to="/profile">Your Profile</NavLink></li>
                        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                        <li><NavLink to="/madeevents">Your Events</NavLink></li>
                        <li><NavLink to="/create">Create Race</NavLink></li>
                        <li><NavLink to="/joinedevents">Joined Event</NavLink></li>
                        <li><NavLink to="/login" onClick={handleLogout}>Logout</NavLink></li>
                    </ul>
                </div>

                {/* //Main Content */}
                <div className="viewEvents-main-content">
                        <h2 className="ve">Info Event</h2>
                    <div className="view-container-post">

                         {/* //mga events diri display */}
                        <div className="view-content">
                            <div className="card-view">
                                <div className="pad">
                                    <div className="details-event">
                                        <div className="event-picc">
                                                <img src="/img/RaceTrack Logos/RT-logo.png" alt="RaceTrack Logo" />
                                            </div>
                                            <hr></hr>
                                            {fetchError && (<p className='error'>{fetchError}</p>)}
                                            {getraces && (
                                                <div className="details-event-part1">
                                                <h2 className='race-title'>{getraces.race_title}</h2>
                                                <p className='desc'>{getraces.race_description}</p>
                                                <div className="race-container">
                                                    <img src="/img/agereq-icon.png" className="icon"/>
                                                    <div className ="race-details"><label className="race-label">Age Requirement:</label> {getraces.min_age} - {getraces.max_age} years old</div>
                                                    <img src="/img/distance-icon.png" className="icon"/>
                                                    <div className ="race-details"><label className="race-label">Race Distance:</label> {getraces.race_distance} KM</div>
                                                    <img src="/img/capacity-icon.png" className="icon"/>
                                                    <div className ="race-details"><label className="race-label">Maximum Racers:</label> {getraces.capacity}</div>
                                                    <div className ="race-details"><label className="race-label">Location:</label> {getraces.location}</div>
                                                    <img src="/img/participant-icon.png" className="icon"/>
                                                    <div className ="race-details"><label className="race-label">Currently Joined:</label> {getraces.curren_cap}</div>
                                                </div>
                                                <div className="date-container">
                                                    <img src="/img/calendar-icon.png" className="icon"/>
                                                    <div className ="date-details"><label className="date-label">Start Date:</label> {getraces.start_date}</div>
                                                    <div className ="date-details"><label className="date-label">Registration Date:</label> {getraces.registration_date}</div>
                                            </div>
                                            </div>
                                            )}

                                        <div className="details-event-part2">
                                            <button className="update-event" onClick={openModal}>Update Event</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {isModalOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            <div className="close" onClick={closeModal}>&times;</div>
                            <h2>Update Event</h2>
                            <form onSubmit={handleSubmit}>
                                 {/* //update race title */}
                                <label htmlFor="racetitle">Title of the Race:</label>
                                <input 
                                    type="title" 
                                    id="racetitle" 
                                    value={racetitle}  
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

                                {formError && <p className="errors">{formError}</p>}

                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UpdateEvent;
