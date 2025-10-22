import { useEffect, useState, useCallback } from "react"
import { NavLink } from "react-router-dom"
import supabase from "../config/supabaseclient"
import "../styles/header_and_sidebar.css"
import "../styles/notifications.css"

const Header = () => {
  const [unreadCount, setUnreadCount] = useState(0)
  const [authUser, setAuthUser] = useState(null)

  const fetchUnreadCount = useCallback(async () => {
    try {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
      if (sessionError || !sessionData.session) return

      const user = sessionData.session.user
      setAuthUser(user)

      const { data, error } = await supabase
        .from("notification")
        .select("read")
        .eq("user_id", user.id)

      if (error) throw error

      const unread = data.filter((n) => n.read === false || n.read === null).length
      setUnreadCount(unread)
    } catch (err) {
      console.error("Error fetching unread notifications:", err)
    }
  }, [])

  useEffect(() => {
    fetchUnreadCount()

    const channel = supabase
      .channel("notification_realtime_header")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "notification" },
        () => {
          fetchUnreadCount()
        }
      )
      .subscribe()

      const refreshListener = () => fetchUnreadCount()
      window.addEventListener("mark-as-all-read", refreshListener)

    return () => {
      supabase.removeChannel(channel)
      window.addEventListener("mark-as-all-read", refreshListener)
    }
  }, [fetchUnreadCount])

  return (
    <div className="gen-headerbar">
      <div className="gen-headerbar-logo">
        <NavLink to="/dashboard">
          <img
            src="/img/RaceTrack Logos/RT-logo.png"
            alt="logo"
            className="RaceTrack-logo"
          />
        </NavLink>
      </div>

      <div className="header-right">
        <div className="pfp">
          <NavLink to="/profile">
            <button className="notification-button">
              <img src="img/pfp.png" alt="icon" className="pfp-icon" /> Profile
            </button>
          </NavLink>
        </div>

        <div className="notifications-container">
          <NavLink to="/notifications">
            <button className="notification-button">
              <img src="img/noti-icon.png" alt="icon" className="noti-icon" />{" "}
              Notifications{" "}
              {unreadCount > 0 && (
                <p className="notif-count">{unreadCount}</p>
              )}
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default Header
