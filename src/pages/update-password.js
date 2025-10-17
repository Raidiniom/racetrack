import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Config
import supabase from "../config/supabaseclient"

const UpdatePassword = () => {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [formError, setFormError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!newPassword || !confirmPassword) {
      setFormError("Please fill out both fields.")
      return
    }

    if (newPassword !== confirmPassword) {
      setFormError("Passwords do not match.")
      return
    }

    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (error) {
      setFormError(error.message)
    } else {
      alert("Password successfully updated. Please log in.")
      navigate("/login")
    }
  }

  return (
    <div className="rec-body">
      <div className="rec-container">
        <form onSubmit={handleSubmit}>
          <h1 className='rec-title'>Set New Password</h1>

          <div className='rec-input-box'>
            <label className='rec-details'>New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className='rec-input-box'>
            <label className='rec-details'>Confirm New Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className='rec-button-container'>
            <button type="submit" className="rec-button">Update Password</button>
          </div>

          {formError && <p className='error'>{formError}</p>}
        </form>
      </div>
    </div>
  )
}

export default UpdatePassword
