import '../styles/sitestyle.css'
import { useState } from 'react'
import supabase from "../config/supabaseclient"

const Db = () => {
   const [regusername, setUsername] = useState('')
   const [regpassword, setPassword] = useState('')

   const [racename, setRacename] = useState('')
   const [racedate, setRacedate] = useState('')
   const [venue, setVenue] = useState('')
   

   const [formError, setFormError] = useState(null)

   const handleSubmit = async (e) => {
        e.preventDefault()

        // if (!regusername || !regpassword) {
        //     setFormError('Please Fill all Fields!')
        //     return
        // }
        
        // console.log('akoang gipa gawas',regusername, regpassword)

        // const {data, error} = await supabase
        //   .from('testing')
        //   .insert({ 
        //     username: regusername, 
        //     password: regpassword })
        //   .select('*')

        if (!racename || !racedate || !venue) {
                setFormError('Please Fill all Fields!')
                return
            }

        console.log('Race Created', racename, racedate, venue)

        const {data, error} = await supabase
          .from('createRace')
          .insert([{ racename, racedate, venue}])
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
        <div class="testsite">
            <div class="input">
                <div class="log">
                    <h2>Login</h2>
                    {/* Testing for logging in */}

                    
                </div>

                <div class="reg">
                    <h2>Register</h2>  
                    {/* This is the register form */}

                    <form onSubmit={handleSubmit}>
                    <label htmlFor='username'>Username: </label>
                        <input
                            type='text'
                            id='inputuser'
                            value={regusername}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                    <label htmlFor='password'>Password: </label>
                        <input
                            type='password'
                            id='inputpass'
                            value={regpassword}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                    <button>Submit</button>

                    {formError && <p className="errors">{formError}</p>}
                    </form>
                </div>

                <div class="rec">
                    <h2>Recover</h2>
                    {/*This is the Recovery Page for user accounts*/}
                </div>

                <div class="crr">
                    <h2>Create Race</h2>
                    {/*  */}
                    
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="raceName">Race Name:</label>
                        <input
                            type="text"
                            id="racename"
                            value={racename}
                            onChange={(e) => setRacename(e.target.value)}
                        />
                        
                        <label htmlFor="racedate">Race Date:</label>
                        <input
                            type="date"
                            id="racedate"
                            value={racedate}
                            onChange={(e) => setRacedate(e.target.value)}
                        />

                        <label htmlFor="venue">Venue Location:</label>
                        <input
                            type="text"
                            id="venue"
                            value={venue}
                            onChange={(e) => setVenue(e.target.value)}
                        />
                    <button>Create Race</button>

                    {formError && <p className="errors">{formError}</p>}

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Db