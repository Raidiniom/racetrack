import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/viewevents.css';

const UpdateEvent = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="wholesite">
            <div className="viewEvents">
                <div className="viewEvents-header">
                    <div className="viewEvents-logo">
                        <img src="/img/RaceTrack Logos/2_FF.png" alt="logo" className="RaceTrack-logo" />
                    </div>
                </div>

                {/* Sidebar */}
                <div className="viewEvents-sidebar">
                    <ul>
                        <li><NavLink to="/profile">Your Profile</NavLink></li>
                        <li><NavLink to="/">Dashboard</NavLink></li>
                        <li><NavLink to="/create">Create Race</NavLink></li>
                        <li>Joined Events</li>
                        <li><NavLink to="/login">Logout</NavLink></li>
                    </ul>
                </div>

                {/* Main Content */}
                <div className="viewEvents-main-content">
                    <h2 className="ve">Info Event</h2>
                    <div className="view-container-post">

                        {/* mga events diri display */}
                        <div className="view-content">
                            <div className="card-view">
                                <div className="pad">
                                    <div className="details-event">
                                        <div className="event-picc">
                                            <img src="https://wallpapercave.com/wp/wp4043831.jpg" alt="Profile Picture" />
                                        </div>
                                        <hr />
                                        <div className="details-event-part1">
                                            <h2>Event title</h2>
                                            <p>then the rest info</p>
                                            <p>Event description last</p>
                                            <h2>Event title</h2>
                                            <p>then the rest info</p>
                                            <p>Event description last</p>
                                            <h2>Event title</h2>
                                            <p>then the rest info</p>
                                            <p>Event description last</p>
                                        </div>
                                        <div className="details-event-part2">
                                            <button className="update-event" onClick={openModal}>Update Event</button>
                                            <button className="delete-event">Delete Event</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {isModalOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            <div className="close" onClick={closeModal}>&times;</div>
                            <h2>Update Event</h2>
                            <form>
                                <label>
                                    Event Title:
                                    <input type="text" name="title" />
                                </label>
                                <label>
                                    Event Description:
                                    <textarea name="description"></textarea>
                                </label>
                                <label>
                                    Start Date:
                                    <input type="date" name="start-date" />
                                </label>
                                <label>
                                    Registration Date:
                                    <input type="date" name="reg-date" />
                                </label>
                                <label>
                                    Minimum Age:
                                    <input type="number" name="min-age" />
                                </label>
                                <label>
                                    Maximum Age:
                                    <input type="number" name="max-age" />
                                </label>
                                <label>
                                    Capacity:
                                    <input type="number" name="capacity" />
                                </label>
                                <label>
                                    Track Kilometers:
                                    <input type="number" name="track-km" />
                                </label>
                                <button type="submit">Update</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UpdateEvent;
