import { NavLink } from 'react-router-dom'
import '../styles/sitestyle.css'

const Updater = () => {
    return (
        <div className="wholesite">
            <div className='/'>
                <div className='update-form-container'>
                    <form>
                        {/* Change race tile */}
                        <label>Race Tile:</label>
                        {/* input */}

                        {/* Change race description */}
                        <label>Description:</label>
                        {/* input */}

                        {/* Change race start date */}
                        <label>Start Date:</label>
                        {/* input */}

                        {/* Change race registration date */}
                        <label>Registration Date:</label>
                        {/* input */}

                        {/* Change race capacity */}
                        <label>Race Capacity:</label>
                        {/* input */}

                        {/* age requirements */}
                        <label>Minimum Age:</label>
                        {/* input */}

                        <label>Maximum Age:</label>
                        {/* input */}

                        {/* Change race track distance */}
                        <label>Track distance:</label>
                        {/* input */}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Updater