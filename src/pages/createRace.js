import { NavLink } from 'react-router-dom'
import '../styles/sitestyle.css'

const Creater = () => {
    return (
        <div className="wholesite">
            <div className="create-main-container">
                <div className="create-form-position">
                    <div className="create-form-container">
                        <h2 className="create-h2">Create Race</h2>

                        {/* create form */}
                        <form className="create-form">

                            {/* input title */}
                            <label htmlFor="title">Title of the Race:</label>
                            <input type="title" id="title" name="title" required />
                            
                            {/* input start date */}
                            <label htmlFor="startDate">Start Date:</label>
                            <input type="date" id="startDate" name="startDate" required />

                            {/* input registration date */}
                            <label htmlFor="registrationDate">Registration Date:</label>
                            <input type="date" id="registrationDate" name="registrationDate" required />

                            {/* input capacity */}
                            <label htmlFor="capacity">Capacity (Number of Participant):</label>
                            <input type="number" id="capacity" name="capacity" required />

                            {/* input race description */}
                            <label for="raceDescription">Enter race description</label>
                            <textarea id="raceDescription" name="raceDescription" rows="4" cols="50" placeholder='Input additional details about the race here...'></textarea>
                            
                            {/* event race banner */}

                            {/* payment method */}
                                    {/* <select name="payment_method" id="payment_method">
                                        <option value="GCash">Default Gender</option>
                                        <option value="Paypal">Male</option>
                                        <option value="Credit/Debit Card">Female</option>
                                        <option value="other">Other</option> */}
                            {/* genre */}
                            
                            {/* age restriction */}
                            <label htmlFor="minAge">Minimum Age:</label>
                            <input type="number" id="minAge" name="minAge" required />

                            {/* input age Maximum limit */}
                            <label htmlFor="maxAge">Maximum Age:</label>
                            <input type="number" id="maxAge" name="maxAge" required />

                            {/* distance */}
                            <label htmlFor="distance">Track Kilometers:</label>
                            <input type="number" id="distance" name="distance" required />
                            
                            {/* submit */}
                            <button type="submit" className="create-button">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default Creater