import { NavLink } from 'react-router-dom'
import '../styles/sitestyle.css'

const Creater = () => {
    return (
        <div className="wholesite">
            <div className="main-container">
                <div className="create-form-position">
                    <div className="create-form-container">
                        <h2 className="l-h2">Create Race</h2>

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
                            <label htmlFor="capacity">Capacity:</label>
                            <input type="number" id="capacity" name="capacity" required />
                            
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