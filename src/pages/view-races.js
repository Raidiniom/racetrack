import { NavLink, useNavigate } from 'react-router-dom'
import '../styles/view-races.css'
import '../styles/header_and_sidebar.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import supabase from '../config/supabaseclient'
//hello
const ViewEvent = () => {
    // naay ny join feature 
    const { id } = useParams();
    const [ fetchError, setFetchError ] = useState(null)
    const [ getraces, setGetraces ] = useState(null)
    const [hasJoined, setHasJoined] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRaces = async () => {
            const { data, error } = await supabase
             .from('user_created_race')
             .select('*')
             .eq('race_id', id)
             .single()

            if (error) {
                setFetchError('No Races Open!')
                setGetraces(null)
            }

            if (data) {
                setGetraces(data)
                setFetchError(null)

                const username = localStorage.getItem('lsusername');
                if (username) {
                    const { data: user, error: userError } = await supabase
                        .from('app_users')
                        .select('user_id')
                        .eq('username', username)
                        .single();

                    if (!userError) {
                        const { data: participant, error: participantError } = await supabase
                            .from('participant_list')
                            .select('*')
                            .eq('from_race', id)
                            .eq('user_participant', user.user_id)
                            .single();

                        if (!participantError && participant) {
                            setHasJoined(true);
                        }
                    }
                }
            }
        };

        fetchRaces()
    }, [id])

    const joinEvent = async (e) => {
        e.preventDefault();

        const username = localStorage.getItem('lsusername');
        if (!username) {
            setFetchError('Please log in to join the event.');
            return;
        }

        try {
            const { data: user, error: userError } = await supabase
                .from('app_users')
                .select('user_id')
                .eq('username', username)
                .single();

            if (userError) {
                console.error('Error fetching user:', userError);
                setFetchError('User not found!');
                return;
            }

            const user_participant = user.user_id;

            const parsedRaceId = parseInt(id, 10);
            if (isNaN(parsedRaceId)) {
                setFetchError('Invalid race ID!');
                return;
            }

            if (getraces.current_participant >= getraces.capacity) {
                setFetchError('The event is full!');
                return;
            }

            const payload = { user_participant: user_participant, from_race: parsedRaceId };

            const { error } = await supabase
                .from('participant_list')
                .insert([payload]);

            if (error) {
                console.error('Error joining the event:', error);
                setFetchError('Error joining the event!');
            } else {
                const { data: updatedRace, error: updateError } = await supabase
                    .from('user_created_race')
                    .update({ current_participant: getraces.current_participant + 1 })
                    .eq('race_id', parsedRaceId)
                    .single();

                if (updateError) {
                    console.error('Error updating participant count:', updateError);
                    setFetchError('Error updating participant count!');
                } else {
                    setGetraces(updatedRace);
                    setFetchError(null);
                    alert('Successfully joined the event!');
                    navigate('/joined-races');
                }
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            setFetchError('Unexpected error occurred!');
        }
    };


    const handleLogout = () => {
        localStorage.removeItem('lsusername')
    }

    return (
            <div class="viewraces-body">
                {/* Headerbar */}
                <div class="gen-headerbar">
                    <div className="gen-headerbar-logo">
                        <NavLink to='/'><img src="/img/RaceTrack Logos/RT-logo.png" alt="logo" className="RaceTrack-logo" /></NavLink>
                    </div>
                    <div className="notifications-container">
                        <NavLink to="/notifications">
                            <button className="notification-button">
                                <img src="img/noti-icon.png" alt="icon" class="noti-icon"/> Notifications
                            </button>
                        </NavLink>
                    </div>
                </div>
                {/* Sidebar */}
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
                {/* Main Content */}
                <div class="viewraces-main-content">
                    <div class='viewraces-main-content-header'>
                        <h2>Race Details</h2>
                    </div>  
                        {/* Race Display */}
                        <div class="viewraces-main-container">           
                            {fetchError && (<p className='error'>{fetchError}</p>)}
                            {getraces && (
                                <div className="viewraces-card">
                                    <div class='viewraces-card-racetitle'>
                                        {getraces.race_title}
                                    </div>
                                    <p class='desc'>{getraces.race_description}</p>
                                    {/* Insert Picture/Banner here */}
                                    <div class="viewraces-card-banner-container">
                                    <img src="insert-path-here" alt="banner" class="dashb-card-banner"/>
                                    </div>
                                    <div class="viewraces-card-details-container">
                                        <div class='viewraces-card-details-wrapper'>
                                            <img src="/img/agereq-icon.png" class="icon"/>
                                            <div><label class="viewraces-card-details">Age Requirement:</label> {getraces.min_age} - {getraces.max_age} years old</div>
                                        </div>
                                        <div class='viewraces-card-details-wrapper'>
                                            <img src="/img/distance-icon.png" class="icon"/>
                                            <div><label class="viewraces-card-details">Race Distance:</label> {getraces.race_distance} KM</div>
                                        </div>
                                        <div class='viewraces-card-details-wrapper'>
                                            <img src="/img/capacity-icon.png" class="icon"/>
                                            <div><label class="viewraces-card-details">Maximum Racers:</label> {getraces.capacity}</div>
                                        </div>
                                        <div class='viewraces-card-details-wrapper'>
                                            <img src="/img/loc-icon.png" class="icon"/>
                                            <div><label class="viewraces-card-details">Location:</label> {getraces.location}</div>
                                        </div>
                                        <div class='viewraces-card-details-wrapper'>
                                            <img src="/img/participant-icon.png" class="icon"/>
                                            <div><label class="viewraces-card-details">Currently Joined:</label> {getraces.current_participant}</div>
                                        </div>
                                        <div class='viewraces-card-details-wrapper'>
                                            <img src="/img/calendar-icon.png" class="icon"/>
                                            <div><label class="viewraces-card-details">Start Date:</label> {getraces.start_date}</div>
                                            <div><label class="viewraces-card-details">Registration Date:</label> {getraces.registration_date}</div>
                                        </div>
                                    </div>
                                    <div className="join-button-container">
                                        <button className="join-button" onClick={joinEvent}>Join Event</button>
                                    </div>
                                </div>
                            )}
                                    
                        </div>
                </div>
            </div>
    )
}

export default ViewEvent