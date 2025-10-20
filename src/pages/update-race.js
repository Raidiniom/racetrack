import { NavLink, useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

// CSS
import '../styles/update-race.css'
import '../styles/header_and_sidebar.css'
import '../styles/errors.css'

// Config
import supabase from "../config/supabaseclient"
import { uploadBanner } from '../config/cloudinaryclient'

const UpdateEvent = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [ race, setRace ] = useState(null)
    const [ isModalOpen, setIsModalOpen ] = useState(false)
    const [ formError, setFormError ] = useState(null)
    const [ raceBanner, setRaceBanner ] = useState(null)
    const [ previewBanner, setPreviewBanner ] = useState(null)

    useEffect(() => {
        console.log('[CONSOLE LOG] Fetching race with id:', id);

        const fetchRaces = async () => {
            const { data, error } = await supabase
             .from('user_created_race')
             .select('*')
             .eq('race_id', id)
             .single();

            if(error){
                console.error('[CONSOLE LOG] Error fetching race:', error);
                setFormError('No Races Open!')
            } else {
                console.log('[CONSOLE LOG] Fetched race data:', data);
                setRace(data);
                setFormError(null);
            }
        }
        fetchRaces()
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError(null)

        if ( !race.race_title || !race.race_description || !race.start_date || !race.registration_date ||
            !race.capacity || !race.min_age || !race.max_age || !race.race_distance ) {
            setFormError("Please fill all required fields!");
            return;
        }


        let bannerUrl = race.race_banner_url

        if (raceBanner) {
            try {
                bannerUrl = await uploadBanner(raceBanner)
            } catch (error) {
                console.error("Banner Upload Failed: ", error)
                setFormError("Upload Failed")
                return
            }
        }

        const { error } = await supabase
            .from('user_created_race')
            .update({ 
                race_title: race.race_title,
                race_description: race.race_description,
                start_date: race.start_date, 
                registration_date: race.registration_date, 
                capacity: race.capacity, 
                min_age: race.min_age, 
                max_age: race.max_age, 
                race_distance: race.race_distance,
                location: race.location,
                race_banner_url: bannerUrl,
            })
            .eq('race_id', id);


            if (error) {
                console.log(error)
                setFormError('Error updating race!')
            } else {
                navigate("/created-races")
            }
    }

    if (!race) return <p className='loading-text'>Loading race data...</p>

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

                        {race && (
                            <div className="update-viewraces-card">
                                
                                <div class='update-viewraces-card-racetitle'>
                                    {race.race_title}
                                </div>

                                <p class='update-desc'>{race.race_description}</p>
                                
                                {/* Insert Picture/Banner here */}
                                <div class="update-viewraces-card-banner-container">
                                    {race.race_banner_url && (
                                        <img src={race.race_banner_url}
                                        alt='Race Banner'
                                        className='dashb-card-banner' />
                                    )}
                                </div>

                                <div class="update-viewraces-card-details-container">
                                    <div class='update-viewraces-card-details-wrapper'>
                                        <img src="/img/agereq-icon.png" class="icon"/>
                                        <div><label class="update-viewraces-card-details">Age Requirement:</label> {race.min_age} - {race.max_age} years old</div>
                                    </div>

                                    <div class='update-viewraces-card-details-wrapper'>
                                        <img src="/img/distance-icon.png" class="icon"/>
                                        <div><label class="update-viewraces-card-details">Race Distance:</label> {race.race_distance} KM</div>
                                    </div>

                                    <div class='update-viewraces-card-details-wrapper'>
                                        <img src="/img/capacity-icon.png" class="icon"/>
                                        <div><label class="update-viewraces-card-details">Maximum Racers:</label> {race.capacity}</div>
                                    </div>

                                    <div class='update-viewraces-card-details-wrapper'>
                                        <img src="/img/loc-icon.png" class="icon"/>
                                        <div><label class="update-viewraces-card-details">Location:</label> {race.location}</div>
                                    </div>

                                    <div class='update-viewraces-card-details-wrapper'>
                                        <img src="/img/participant-icon.png" class="icon"/>
                                        <div><label class="update-viewraces-card-details">Currently Joined:</label> {race.current_participant}</div>
                                    </div>

                                    <div class='update-viewraces-card-details-wrapper'>
                                        <img src="/img/calendar-icon.png" class="icon"/>
                                        <div><label class="update-viewraces-card-details">Start Date:</label> {race.start_date}</div>
                                        <div><label class="update-viewraces-card-details">Registration Date:</label> {race.registration_date}</div>
                                    </div>

                                </div>

                                <div className="update-button-container">
                                    <button className="update-event-button" onClick={() => setIsModalOpen(true)}>Update Event</button>
                                </div>
                            </div>
                        )}

                        </div>
                    </div>
                    
                {isModalOpen && (
                    <div className="modal-up">
                        <div className="modal-content">
                            <button className='close' onClick={() => setIsModalOpen(false)}>&times;</button>
                            
                            <h2>Update Event</h2>

                            <form onSubmit={handleSubmit}>
                                 {[
                                    ["Title of the Race", "race_title"],
                                    ["Description", "race_description", "textarea"],
                                    ["Start Date", "start_date", "date"],
                                    ["Registration Date", "registration_date", "date"],
                                    ["Minimum Age", "min_age", "number"],
                                    ["Maximum Age", "max_age", "number"],
                                    ["Capacity", "capacity", "number"],
                                    ["Distance (KM)", "race_distance", "number"],
                                    ["Location", "location"],
                                ].map(([label, key, type = "text"]) => (
                                    <div key={key}>
                                    <label>{label}:</label>
                                    {type === "textarea" ? (
                                        <textarea
                                        value={race[key] || ""}
                                        onChange={(e) => setRace({ ...race, [key]: e.target.value })}
                                        />
                                    ) : (
                                        <input
                                        type={type}
                                        value={race[key] || ""}
                                        onChange={(e) => setRace({ ...race, [key]: e.target.value })}
                                        />
                                    )}
                                    </div>
                                ))}

                                <label>Race Banner</label>
                                <input 
                                    type='file'
                                    accept='image/*'
                                    onChange={(e) => {
                                        const file = e.target.files[0]

                                        setRaceBanner(file)

                                        if (file) {
                                            const reader = new FileReader();

                                            reader.onloadend = () => setPreviewBanner(reader.result)
                                            reader.readAsDataURL(file)
                                        } else {
                                            setPreviewBanner(null)
                                        }
                                    }}
                                />

                                {previewBanner && (
                                    <div className="banner-preview-container">
                                        <p>Banner Preview:</p>
                                        <img
                                        src={previewBanner}
                                        alt="Preview"
                                        className="dashb-card-banner"
                                        style={{ maxWidth: "100%", borderRadius: "12px", marginTop: "8px" }}
                                        />
                                    </div>
                                )}

                                <button type="submit">Save Changes</button>

                                {formError && <p className="error">{formError}</p>}

                            </form>
                        </div>
                    </div>
                )}
        </div>
    );
};

export default UpdateEvent;