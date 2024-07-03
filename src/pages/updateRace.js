import { NavLink } from 'react-router-dom'
import '../styles/updatepage.css'

const Updater = () => {
    return (
        <div className="wholesite">
            <div className='/'>
                <div className='update-form-container'>
                <h2 className="update-h2">Update Race</h2>

                    <form className="update-form">

                        {/* Update Title */}
                        <label htmlFor="racetitle">Title of the Race:</label>
                        <input 
                        type="title" 
                        id="racetitle" 
                        />

                        {/* Update Start Date */}
                        <label htmlFor="stardate">Start Date:</label>
                        <input 
                        type="date" 
                        id="startdate" 
                        />

                        {/* Update Reg Date */}
                        <label htmlFor="regdate">Registration Date:</label>
                        <input 
                        type="date" 
                        id="regdate" 
                        />

                        {/* Update Capacity */}
                        <label htmlFor="capacity">Capacity (Number of Participant):</label>
                        <input 
                        type="int" 
                        id="capacity" 
                        />

                        {/* Update Description */}
                        <label htmlFor="description">Enter Race Description:</label>
                        <textarea id="raceDescription" name="raceDescription" rows="4" cols="50" placeholder='Input additional details about the race here...' 
                        /> 

                        {/* Update Age Restriction */}
                        <div className="form-row-age">
                            <div className="form-group-age">    
                                <label htmlFor="minage">Minimum Age:</label>
                                <input 
                                type="int" 
                                id="minage" 
                                />
                            </div>
                            
                            <div className="form-group-age">
                                <label htmlFor="maxage">Maximum Age:</label>
                                <input 
                                type="int" 
                                id="maxage" 
                                />
                            </div>
                        </div>

                        {/* Update Distance */}
                        <label htmlFor="trackkm">Track Kilometers:</label>
                        <input 
                        type="int" 
                        id="trackkm" 
                        />

                        {/* Submit */}
                        <button className="update-button">Create Race</button>

                        <p className="errors"></p>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Updater