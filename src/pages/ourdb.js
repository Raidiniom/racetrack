import '../styles/sitestyle.css'
import supabase from "../config/supabaseclient"
import { useEffect, useState } from 'react'

const Db = () => {
    const [fetchError, setFetchError] = useState(null)
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    const [email, setemail] = useState('')
    const [birth_day, setbrith_day] = useState('')
    const [gender, setgender] = useState('')
    const [contact_no, setcontact_no] = useState('')

    .from('user')
    .insert(
        [{
            username: uname,
            password: pword,
            email: emailing,
            birth_day: bdy,
            gender: gder,
            contact_no: contno,
        }]
    )
    .select()

    // if (er) {
        
    // } else {
        
    // }

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
                    <form>
                        <label>Username</label>
                    </form>
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