import { useEffect, useState } from 'react';
import supabase from '../config/supabaseclient';

// CSS
import '../styles/created-races.css';
import '../styles/header_and_sidebar.css';

// Components
import RaceCard from '../components/RaceCard';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const CreatedRaces = () => {
    const [fetchError, setFetchError] = useState(null);
    const [races, setRaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {

        const fetchRaces = async () => {
            setLoading(true);
            setFetchError(null);

            const { data: sess, error: sessErr } = await supabase.auth.getSession();

            if (sessErr || !sess || !sess.session) {
                setFetchError("Session expired. Please log in again.");
                setLoading(false);
                return;
            }

            const user = sess.session.user;
            if (!user?.email) {
                setFetchError("No user found in session.");
                setLoading(false);
                return;
            }

            const { data: userData, error: userErr } = await supabase
                .from("app_users")
                .select("user_id")
                .eq("email", user.email);

            if (userErr) {
                setFetchError("Error fetching user data.");
                setLoading(false);
                return;
            }

            if (!userData || userData.length === 0) {
                setFetchError("User not found in app_users.");
                setLoading(false);
                return;
            }

            const u_id = userData[0].user_id;

            const { data: raceList, error: raceErr } = await supabase
                .from("user_created_race")
                .select("*")
                .eq("race_creator", u_id)
                .order("race_id", { ascending: false });

            if (raceErr) {
                setFetchError("Error fetching races.");
                setLoading(false);
                return;
            }

            setRaces(raceList || []);
            setLoading(false);
        };

        fetchRaces();
    }, [refresh]);

    const handleDelete = () => setRefresh(prev => !prev);

    return (
        <div className="createdr-body">
            <Header />
            <Sidebar />

            <div className="createdr-main-content">
                <div className="createdr-main-content-header">
                    <h2>Your Races</h2>
                </div>

                <div className="createdr-main-container">

                    {/* Loading Indicator */}
                    {loading && <p>Loading race data...</p>}

                    {/* Errors */}
                    {!loading && fetchError && (
                        <p className="error">{fetchError}</p>
                    )}

                    {/* No Races */}
                    {!loading && !fetchError && races.length === 0 && (
                        <p>You have not created any races yet.</p>
                    )}

                    {/* Races */}
                    {!loading && races.length > 0 && (
                        <div>
                            {races.map(race => (
                                <RaceCard 
                                    key={race.race_id}
                                    output={race}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default CreatedRaces;