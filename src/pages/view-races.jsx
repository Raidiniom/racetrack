import { NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// CSS
import '../styles/view-races.css'
import '../styles/header_and_sidebar.css'

// Config
import supabase from '../config/supabaseclient'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

const ViewEvent = () => {
    const { id } = useParams();
    const [fetchError, setFetchError] = useState(null)
    const [getraces, setGetraces] = useState(null)
    const [hasJoined, setHasJoined] = useState(false);
    const navigate = useNavigate();

    const [authuser, setAuthuser] = useState({ user: null });

    useEffect(() => {
        const fetchRaces = async () => {
            const { data, error } = await supabase
                .from('user_created_race')
                .select('*')
                .eq('race_id', id)
                .single()
            console.log("VIEW RACES DATA:", data);

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

    const calculateAge = (birthDay) => {
        const today = new Date();
        const birthDate = new Date(birthDay);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const joinEvent = async (e) => {
        e.preventDefault();

        try {
            const { data: sess, error: nosess } = await supabase.auth.getSession();

            // Check for errors and log them
            if (nosess) {
                console.error('Session Error:', nosess.message);
                return;
            }

            console.log('This is Sess: ', sess)
            const theU = sess?.session.user;
            setAuthuser({ theU });

            const { data: user, error: userError } = await supabase
                .from('app_users')
                .select('user_id, birth_day')
                .eq('email', theU.email)
                .single();

            if (userError) {
                console.error('Error fetching user:', userError);
                setFetchError('User not found!');
                return;
            }

            const user_participant = user.user_id;
            const user_age = calculateAge(user.birth_day);

            const parsedRaceId = parseInt(id, 10);
            if (isNaN(parsedRaceId)) {
                setFetchError('Invalid race ID!');
                return;
            }

            if (getraces.current_participant >= getraces.capacity) {
                setFetchError('The event is full!');
                return;
            }

            if (user_age < getraces.min_age || user_age > getraces.max_age) {
                setFetchError('You do not meet the age requirements for this event!');
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

    return (
        <div className="viewraces-body">
            {/* Headerbar */}
            <Header />

            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="viewraces-main-content">
                <div className='viewraces-main-content-header'>
                    <h2>Race Details</h2>
                </div>
                {/* Race Display */}
                <div className="viewraces-main-container">
                    {fetchError && (<p className='error'>{fetchError}</p>)}
                    {getraces && (
                        <div className="viewraces-card">

                            {/* TITLE */}
                            <h2 className="viewraces-title">{getraces.race_title}</h2>
                            <p className="viewraces-location">
                                <strong>Location:</strong> {getraces.location}
                            </p>

                            {/* BANNER */}


                            {/* GRID */}
                            <div className="viewraces-grid">

                                {/* LEFT SIDE */}
                                <div className="viewraces-left">
                                    <div className="viewraces-banner-picture">
                                        {getraces.race_banner_url ? (
                                            <img src={getraces.race_banner_url} className="viewraces-banner-img" />
                                        ) : (
                                            <div className="viewraces-banner-placeholder">No Banner Available</div>
                                        )}
                                    </div>
                                    <h3 className="viewraces-header-description">About the Race</h3>

                                    <p className="viewraces-description">
                                        {getraces.race_description}
                                    </p>



                                </div>

                                {/* RIGHT SIDE */}
                                <div className="viewraces-details">

                                    <div className="viewraces-details-wrapper">
                                        <img src="/img/agereq-icon.png" className="viewraces-icon" />
                                        <div>
                                            <label className="viewraces-details-label">Age Requirement:</label>
                                            {getraces.min_age} - {getraces.max_age} yrs old
                                        </div>
                                    </div>

                                    <div className="viewraces-details-wrapper">
                                        <img src="/img/distance-icon.png" className="viewraces-icon" />
                                        <div>
                                            <label className="viewraces-details-label">Race Distance:</label>
                                            {getraces.race_distance} KM
                                        </div>
                                    </div>

                                    <div className="viewraces-details-wrapper">
                                        <img src="/img/capacity-icon.png" className="viewraces-icon" />
                                        <div>
                                            <label className="viewraces-details-label">Maximum Racers:</label>
                                            {getraces.capacity}
                                        </div>
                                    </div>

                                    <div className="viewraces-details-wrapper">
                                        <img src="/img/participant-icon.png" className="viewraces-icon" />
                                        <div>
                                            <label className="viewraces-details-label">Currently Joined:</label>
                                            {getraces.current_participant}
                                        </div>
                                    </div>

                                    <div className="viewraces-details-wrapper">
                                        <img src="/img/calendar-icon.png" className="viewraces-icon" />
                                        <div>
                                            <label className="viewraces-details-label">Start Date:</label>
                                            {getraces.start_date}
                                        </div>
                                    </div>

                                    <div className="viewraces-details-wrapper">
                                        <img src="/img/calendar-icon.png" className="viewraces-icon" />
                                        <div>
                                            <label className="viewraces-details-label">Registration Date:</label>
                                            {getraces.registration_date}
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* BUTTON */}

                            <div className="viewraces-button-container">
                                <button className="viewraces-button-back"onClick={() => navigate('/dashboard')} >
                                    RETURN
                                </button>
                                <button className="viewraces-button" onClick={joinEvent}>
                                    Join Event
                                </button>
                                
                            </div>



                        </div>

                    )}

                </div>
            </div>
        </div>
    )
}

export default ViewEvent