import '../styles/sitestyle.css'
import supabase from "../config/supabaseclient"
import { useEffect, useState } from 'react'

const Db = () => {
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')

    const [formError, setformError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!username || !password) {
            setformError('Fill the feilds please')
            return
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
                            value={username}
                            onChange={(e) => setusername(e.target.value)}
                        />

                    <label htmlFor='password'>Password: </label>
                        <input
                            type='text'
                            id='inputpass'
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                        />

                    <button>Submit</button>

                    {formError && <p>{formError}</p>}
                    </form>
                </div>

                <div class="rec">
                    <h2>Recover</h2>
                    {/*This is the Recovery Page for user accounts*/}
                </div>

                <div class="crr">
                    <h2>Create Race</h2>
                    {/*  */}
                </div>
            </div>
        </div>
    )
}

export default Db