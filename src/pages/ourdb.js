import '../styles/sitestyle.css'
import supabase from "../config/supabaseclient"
import { useEffect, useState } from 'react'

const Db = () => {
    const [fetchError, setFetchError] = useState(null)
    

    return (
        <div class="testsite">
            <div class="input">
                <div class="log">
                    <h2>Login</h2>
                    {/*  */}
                </div>

                <div class="reg">
                    <h2>Register</h2>  
                    {/*  */}
                </div>

                <div class="rec">
                    <h2>Recover</h2>
                    {/*  */}
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