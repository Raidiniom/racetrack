import '../styles/sitestyle.css'
import { useState } from 'react'
import supabase from "../config/supabaseclient"

const Db = () => {
//    R&D picture upload for our site

   const [formError, setFormError] = useState(null)

   const handleSubmit = async (e) => {
        e.preventDefault()

        // handle here
   }

    return (
        <div class="testsite">
            <div class="input">
                
                    <button>Create Race</button>

                    {formError && <p className="errors">{formError}</p>}

            </div>
        </div>
    )
}

export default Db