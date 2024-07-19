import { NavLink } from 'react-router-dom'
import '../styles/viewevents.css'
import '../styles/header_and_sidebar.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import supabase from '../config/supabaseclient'

const ViewEvent = () => {
    // naay ny join feature 
    const { id } = useParams();
    const [ fetchError, setFetchError ] = useState(null)
    const [ getraces, setGetraces ] = useState(null)

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
            }
        }

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
        <div className="wholesite">
            <div class="viewEvents">
                <div class="dashboard-header">
                    <div className="dash-logo">
                        <NavLink to='/'><img src="/img/RaceTrack Logos/RT-logo.png" alt="logo" className="RaceTrack-logo" /></NavLink>
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

                {/* Main Content */}
                <div class="viewEvents-main-content">
                    <h2 className="ve">Information</h2>
                        <div className="view-container-post">

                            {/* mga events diri display */}
                            <div class="view-content">
                                <div className="card-view">
                                    <div className="pad">
                                        <div className="details-event">
                                        <div className="event-picc">
                                            <img src="https://wallpapercave.com/wp/wp4043831.jpg" alt="Profile Picture" />
                                        </div>
                                        <hr></hr>
                                        {fetchError && (<p className='error'>{fetchError}</p>)}
                                        {getraces && (
                                            <div className="details-event-part1">
                                            <h2 class='race-title'>{getraces.race_title}</h2>
                                            <p class='desc'>{getraces.race_description}</p>
                                            <div class="race-container">
                                                <img src="/img/agereq-icon.png" class="icon"/>
                                                <div class ="race-details"><label class="race-label">Age Requirement:</label> {getraces.min_age} - {getraces.max_age} years old</div>
                                                <img src="/img/distance-icon.png" class="icon"/>
                                                <div class ="race-details"><label class="race-label">Race Distance:</label> {getraces.race_distance} KM</div>
                                                <img src="/img/capacity-icon.png" class="icon"/>
                                                <div class ="race-details"><label class="race-label">Maximum Racers:</label> {getraces.capacity}</div>
                                                <img src="/img/participant-icon.png" class="icon"/>
                                                <div class ="race-details"><label class="race-label">Currently Joined:</label> {getraces.curren_cap}</div>
                                            </div>
                                            <div class="date-container">
                                                <img src="/img/calendar-icon.png" class="icon"/>
                                                <div class ="date-details"><label class="date-label">Start Date:</label> {getraces.start_date}</div>
                                                <div class ="date-details"><label class="date-label">Registration Date:</label> {getraces.registration_date}</div>
                                           </div>
                                        </div>
                                        )}
                                            
                                            <div className="details-event-part2">
                                                <button className="join-event" onClick={joinEvent}>Join Event</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default ViewEvent