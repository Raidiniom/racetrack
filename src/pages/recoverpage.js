import { NavLink, useNavigate } from 'react-router-dom'
import '../styles/recoverstyle.css'
import { useState } from 'react'
import supabase from "../config/supabaseclient"

const Recover = () => {
    const [forUsername, setForUsername] = useState('')
    const [forPassword, setForPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const redirect = useNavigate()

    const [formError, setformError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!forUsername || !forPassword || !newPassword) {
            setformError('Please Fill Out all the fields!')
            return
        }

        if (forPassword !== newPassword) {
            setformError('Both Password are not the same!')
            return
        }

        const {data, error} = await supabase
          .from('users')
          .update({
            Password: newPassword
          })
          .eq('Username', forUsername)

        if (error) {
            setformError('Failed to Changed Password!')
        } else {
            setformError('Successfuly Changed Password!')
        }

        redirect('/login')

    }

    return (
        <div className="wholesite">
            <div className="whole-recover">
                    {/* Logo */}
                    <div className="logo-recover">
                        <img src="\img\RaceTrack Logos\2.png" alt="logo" className="RaceTrack-logo" />
                    </div>

                {/* recover form */}
                <div className="recover-main-container">
                    <div className="recover-form-position">
                        <div className="recover-form-container">
                            <h2 className="header-recover">Recover</h2>

                            {/* recover form */}
                            <form className="recover-form" onSubmit={handleSubmit}>

                                {/* input email */}
                                <label htmlFor="username">Username:</label>
                                <input 
                                    type="text" 
                                    id="foruser" 
                                    value={forUsername}
                                    onChange={(e) => setForUsername(e.target.value)}
                                    required 
                                />

                                {/* input password */}
                                <label htmlFor="email">Password:</label>
                                <input 
                                    type="password" 
                                    id="forpass" 
                                    value={forPassword}
                                    onChange={(e) => setForPassword(e.target.value)}
                                    required 
                                />

                                {/* input new password */}
                                <label htmlFor="email">New Password:</label>
                                <input 
                                    type="password" 
                                    id="fornewpass" 
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required 
                                />
                                
                                {/* submit */}
                                <button type="submit" className="recover-button">Submit</button>

                                {formError && <p className='error'>{formError}</p>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Recover