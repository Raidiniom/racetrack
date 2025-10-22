import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

// The Pages
import CreateRace from './pages/create-race';
import Dashboard from './pages/dashboard';
import Landing from './pages/landing';
import Login from './pages/login';
import Recover from './pages/recover';
import SignUp from './pages/signup';
import Tos from './pages/tos';
import Eula from './pages/eula';
import Profile from './pages/user-profile';
import CreatedRaces from './pages/created-races';
import ViewRaces from './pages/view-races';
import UpdateEvent from './pages/update-race';
import JoinedRaces from './pages/joined-races';
import Notifications from './pages/notifications';
import { useEffect, useState } from 'react';
import supabase from './config/supabaseclient';
import UpdatePassword from './pages/update-password';


function App() {
  const [authed, setAuthed] = useState({ user: null})

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const { data: sestok, error: nosestok } = await supabase.auth.getSession()

        if (nosestok) {
          console.error('Session Error:', nosestok.message);
          return;
        }

        const token = sestok?.session.access_token
      } catch (error) {
        
      }
    }
  }, [])

  return (
      <BrowserRouter>
      {/* Ang nav kay maoy ei comment out para ma wagtang siya sa top sa site */}
         <nav>
          <p>Access to all Pages</p>
          <Link to='/'>| Landing Page |</Link>
          <Link to='/dashboard'>| Dashboard |</Link>
          <Link to='/login'>| Login Page |</Link>
          <Link to='/signup'>| Sign Up |</Link>
          <Link to='/recover'>| Recover Page |</Link>
          <Link to='/create-race'>| Create Race |</Link>
          <Link to='/update-race'>| Update Race |</Link>
          <Link to='/created-races'>| Only User Created Race |</Link>
          <Link to='/view-races'>| View all Races |</Link>
          <Link to='/joined-races'>| Joined Events |</Link>
          <Link to='/profile'>| User Profile Page |</Link>
          <Link to='/notifications'>| Notification |</Link>
          <Link to='/eula'>| EULA Page |</Link>
          <Link to='/tos'>| TOS Page |</Link>
        </nav>

        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/create-race' element={<CreateRace />} />
          <Route path='/landing' element={<Landing />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/recover' element={<Recover />} />
          <Route path='/update-password' element={<UpdatePassword />}/>
          <Route path='/eula' element={<Eula />} />
          <Route path='/tos' element={<Tos />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/created-races' element={<CreatedRaces />} />
          <Route path='/view-races' element={<ViewRaces />} />
          <Route path='/joined-races' element={<JoinedRaces />} />
          <Route path='/:id' element={<UpdateEvent />}/>
          <Route path='/view-races/:id' element={<ViewRaces />} />
          <Route path='/notifications' element={<Notifications />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
