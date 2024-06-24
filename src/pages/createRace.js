import { NavLink } from 'react-router-dom'
import '../styles/sitestyle.css'

const Creater = () => {
    return (
        <div className="wholesite">
            <div className="main-container">
                <div className="create-form-position">
                    <div className="create-form-container">
                        <h2 className="l-h2">Create Race</h2>

                        {/* login form */}
                        <form className="create-form">

                            {/* input race description */}
                            <label for="raceDescription">Enter race description</label>
                            <textarea id="raceDescription" name="raceDescription" rows="4" cols="50" placeholder='Input additional details about the race here...'></textarea>
                            <br></br>
                            {/* event race banner */}

                            {/* payment method */}
                                    {/* <select name="payment_method" id="payment_method">
                                        <option value="GCash">Default Gender</option>
                                        <option value="Paypal">Male</option>
                                        <option value="Credit/Debit Card">Female</option>
                                        <option value="other">Other</option> */}
                            {/* genre */}
                            
                            {/* age restriction */}

                            {/* distance */}
                            
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