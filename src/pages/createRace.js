import { NavLink } from 'react-router-dom'
import '../styles/sitestyle.css'
import { useState } from 'react'
import supabase from "../config/supabaseclient"

const Db = () => {

    const [racetitle, setRacetitle] = useState('')
   const [startdate, setStartdate] = useState('')
   const [regdate, setRegdate] = useState('')
   const [capacity, setCapacity] = useState('')
   const [description, setDescription] = useState('')
   const [minage, setMinage] = useState('')
   const [maxage, setMaxage] = useState('')
   const [trackkm, setTrackkm] = useState('')

   const [formError, setFormError] = useState(null)

   const handleSubmit = async (e) => {
     e.preventDefault()


         if (!racetitle || !startdate || !regdate || !capacity || !description || !minage || !maxage || !trackkm) {
            setFormError('Please Fill all Fields!')
            return
        }

    console.log('Race Created', racetitle, startdate, regdate, capacity, description, minage, maxage, trackkm)

        const {data, error} = await supabase
            .from('createRace')
            .insert([{ racetitle, startdate, regdate, capacity, description, minage, maxage, trackkm}])
             .select('*')

        if (error) {
             console.log(error)
            setFormError('Please Fill all Fields!')
        }
        if (data){
        console.log(data)
        setFormError(null)
        }
    }

        return (
            <div className="wholesite">
                <div className="create-main-container">
                    <div className="create-form-position">
                        <div className="create-form-container">
                        <h2 className="create-h2">Create Race</h2>

                        {/* create form */}
                            <form onSubmit={handleSubmit}>

                                {/* input title */}
                                <label htmlFor="racetitle">Title of the Race:</label>
                                <input 
                                type="title" 
                                id="racetitle" 
                                value={racetitle}  
                                onChange={(e) => setRacetitle(e.target.value)}
                                />
                            
                                {/* input start date */}
                                <label htmlFor="stardate">Start Date:</label>
                                <input 
                                type="date" 
                                id="startdate" 
                                value={startdate}  
                                onChange={(e) => setStartdate(e.target.value)}
                                />

                                {/* input registration date */}
                                <label htmlFor="regdate">Registration Date:</label>
                                <input 
                                type="date" 
                                id="regdate" 
                                value={regdate}  
                                onChange={(e) => setRegdate(e.target.value)}
                                />

                                {/* input capacity */}
                                <label htmlFor="capacity">Capacity (Number of Participant):</label>
                                <input 
                                type="int" 
                                id="capacity" 
                                value={capacity}  
                                onChange={(e) => setCapacity(e.target.value)}
                                />

                                {/* input race description */}
                                <label htmlFor="description">Enter Race Description:</label>
                                {/* <input 
                                type="text" 
                                id="description" 
                                value={description}  
                                onChange={(e) => setDescription(e.target.value)}
                                /> */}
                                <textarea id="raceDescription" name="raceDescription" rows="4" cols="50" placeholder='Input additional details about the race here...' 
                                value={description}  
                                onChange={(e) => setDescription(e.target.value)}
                                /> 

                                
                            
                                {/* event race banner */}

                                {/* payment method */}
                                    {/* <select name="payment_method" id="payment_method">
                                        <option value="GCash">Default Gender</option>
                                        <option value="Paypal">Male</option>
                                        <option value="Credit/Debit Card">Female</option>
                                        <option value="other">Other</option> */}
                                {/* genre */}
                            
                                {/* age restriction */}
                                <label htmlFor="minage">Minimum Age:</label>
                                <input 
                                type="int" 
                                id="minage" 
                                value={minage}  
                                onChange={(e) => setMinage(e.target.value)}
                                />

                                {/* input age Maximum limit */}
                                <label htmlFor="maxage">Maximum Age:</label>
                                <input 
                                type="int" 
                                id="maxage" 
                                value={maxage}  
                                onChange={(e) => setMaxage(e.target.value)}
                                />

                                {/* distance */}
                                <label htmlFor="trackkm">Track Kilometers:</label>
                                <input 
                                type="int" 
                                id="trackkm" 
                                value={trackkm}  
                                onChange={(e) => setTrackkm(e.target.value)}
                                />
                            
                                {/* submit */}
                                <button>Create Race</button>

                                {formError && <p className="errors">{formError}</p>}

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        
        )
    
}

export default Db