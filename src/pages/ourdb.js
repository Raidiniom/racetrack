import '../styles/sitestyle.css'
import { useState } from 'react'
import supabase from "../config/supabaseclient"

const Db = () => {
   const [regusername, setUsername] = useState('')
   const [regpassword, setPassword] = useState('')

   const [formError, setFormError] = useState(null)

   const handleSubmit = async (e) => {
        e.preventDefault()

        if (!regusername || !regpassword) {
            setFormError('Please Fill all Fields!')
            return
        }
        
        console.log('akoang gipa gawas',regusername, regpassword)

        const {data, error} = await supabase
          .from('testing')
          .insert({ 
            username: regusername, 
            password: regpassword })
          .select('*')

   }

    return (
        <div className="testsite">
            <div className="input">
                <div className="log">
                    <h2>Login</h2>
                    {/* Testing for logging in */}

                    
                </div>

                <div className="reg">
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

                <div className="rec">
                    <h2>Recover</h2>
                    {/*This is the Recovery Page for user accounts*/}
                </div>

                <div className="crr">
                    <h2>Create Race</h2>
                    {/*  */}
                </div>
            </div>
        </div>
    )
}

export default Db