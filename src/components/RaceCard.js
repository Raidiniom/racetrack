import { NavLink } from "react-router-dom"
import supabase from "../config/supabaseclient"

const RaceCard = ({output}) => {

    const handleDelete = async () => {

        const { data: relatedData, error: relatedError } = await supabase
        .from('race_create_by')
        .delete()
        .eq('what_race', output.race_id);

    if (relatedError) {
        console.log(relatedError);
        return;
    }

        const { data, error } = await supabase
        .from('user_created_race')
        .delete()
        .eq('race_id', output.race_id)

        if(error) {
            console.log(error)
        }

        if(data) {
            console.log(data)
        }
    }

    return (
        <div className="container-post">
            <div className="card-ye">
                
                <div className='user-name-ye'>
                    <h3>{output.race_title}</h3>
                        <div className='contents-post-ye'>
                            <p>{output.race_description}</p>
                        </div>
                </div>
                <div className="buttons">
                    <NavLink to={'/' + output.race_id}>
                    <button className="update-event">Update Event</button>
                    </NavLink>
                    <button className="delete-event" onClick={handleDelete}>Delete Event</button>
                </div>
            </div>
        </div>
    )
}

export default RaceCard