import '../styles/sitestyle.css'
import { useState } from 'react'
import supabase from "../config/supabaseclient"


const Db = () => {
    // R&D for picture file upload
    const [ file, setFile ] = useState()

    const handleSubmit = async (e) => {
        setFile(e.target.files[0])
    }

    return (
        <div class="testsite">
            <div class="input">
                
                {/* File Upload Here!!! */}
                <input type='file' onChange={handleSubmit}></input>
            </div>
        </div>
    )
}

export default Db