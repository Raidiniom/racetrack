import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import '../styles/update-race.css'
import '../styles/header_and_sidebar.css'
import '../styles/errors.css'

import supabase from "../config/supabaseclient"
import { uploadBanner } from '../config/cloudinaryclient'
import Header from '../components/Header'

const UpdateEvent = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [race, setRace] = useState(null)
    const [formError, setFormError] = useState(null)
    const [raceBanner, setRaceBanner] = useState(null)
    const [previewBanner, setPreviewBanner] = useState(null)

    useEffect(() => {
        const fetchRaces = async () => {
            const { data, error } = await supabase
                .from('user_created_race')
                .select('*')
                .eq('race_id', id)
                .single();

            if (error) {
                setFormError('No Races Open!')
            } else {
                setRace(data)
            }
        }
        fetchRaces()
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!race.race_title || !race.race_description || !race.start_date ||
            !race.registration_date || !race.capacity || !race.min_age ||
            !race.max_age || !race.race_distance) {
            setFormError("Please fill all required fields!")
            return
        }

        let bannerUrl = race.race_banner_url

        if (raceBanner) {
            try {
                bannerUrl = await uploadBanner(raceBanner)
            } catch {
                setFormError("Banner upload failed")
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
                race_banner_url: bannerUrl
            })
            .eq('race_id', id)

        if (error) {
            setFormError("Error updating race!")
        } else {
            navigate("/created-races")
        }
    }

    if (!race) return <p className='loading-text'>Loading race data...</p>

    return (
        <div className="update-body">
            <Header />

            <div className="update-main">

                <div className="update-title"><h2>Update Event</h2></div>

                <form onSubmit={handleSubmit} className="update-form">

                    <div className="update-grid">

                        {/* LEFT COLUMN */}
                        <div className="update-left">

                            <div className="update-section-label-header">Banner Preview</div>

                            {(previewBanner || race.race_banner_url) ? (
                                <div className="update-banner-box">
                                    <img
                                        src={previewBanner || race.race_banner_url}
                                        alt="Banner Preview"
                                        className="update-banner-img"
                                    />
                                </div>
                            ) : (
                                <div className="update-banner-box update-no-banner">
                                    No Banner Available
                                </div>
                            )}

                            <div className="update-section-label">Upload New Image</div>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0]
                                    setRaceBanner(file)

                                    if (file) {
                                        const reader = new FileReader()
                                        reader.onloadend = () => setPreviewBanner(reader.result)
                                        reader.readAsDataURL(file)
                                    } else {
                                        setPreviewBanner(null)
                                    }
                                }}
                                
                            />
                            

                            {[["Title of the Race", "race_title"],
                            ["Description", "race_description", "textarea"]]
                                .map(([lbl, key, type = "text"]) => (
                                    <div key={key} className="update-field">
                                        <label className="update-label">{lbl}</label>

                                        {type === "textarea" ? (
                                            <textarea
                                                value={race[key] || ""}
                                                onChange={(e) =>
                                                    setRace({ ...race, [key]: e.target.value })
                                                }
                                                className="update-textarea"
                                            />
                                        ) : (
                                            <input
                                                type={type}
                                                value={race[key] || ""}
                                                onChange={(e) =>
                                                    setRace({ ...race, [key]: e.target.value })
                                                }
                                                className="update-input"
                                            />
                                        )}
                                    </div>
                                ))}

                        </div>

                        {/* RIGHT COLUMN */}
                        <div className="update-right">

                            {[["Start Date", "start_date", "date"],
                            ["Registration Date", "registration_date", "date"],
                            ["Minimum Age", "min_age", "number"],
                            ["Maximum Age", "max_age", "number"],
                            ["Capacity", "capacity", "number"],
                            ["Distance (KM)", "race_distance", "number"],
                            ["Location", "location", "text"]]
                                .map(([lbl, key, type]) => (
                                    <div key={key} className="update-field">
                                        <label className="update-label">{lbl}</label>
                                        <input
                                            type={type}
                                            value={race[key] || ""}
                                            onChange={(e) =>
                                                setRace({ ...race, [key]: e.target.value })
                                            }
                                            className="update-input"
                                        />
                                    </div>
                                ))}

                        </div>

                    </div>

                    <div className="cr-button-container">
                        {/* Create Race Button and Back Button */}

                        <button type="button" className="update-back-btn" onClick={() => navigate('/created-races')}>
                            Go Back
                        </button>
                        <button type="submit" className="update-submit-btn">Save Changes</button>

                        {formError && <p className="error">{formError}</p>}
                    </div>
                </form>

            </div>
        </div>
    )
}

export default UpdateEvent
