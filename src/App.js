import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { ProvideContext } from "./pages/passuser";

// The Pages
import CreateRace from "./pages/create-race";
import Dashboard from "./pages/dashboard";
import Landing from "./pages/landing";
import Login from "./pages/login";
import Recover from "./pages/recover";
import SignUp from "./pages/signup";
import Tos from "./pages/tos";
import Eula from "./pages/eula";
import Profile from "./pages/user-profile";
import CreatedRaces from "./pages/created-races";
import ViewRaces from "./pages/view-races";
import UpdateEvent from "./pages/update-race";
import JoinedRaces from "./pages/joined-races";


function App() {
  return (
    <ProvideContext>
      <BrowserRouter>
      {/* Ang nav kay maoy ei comment out para ma wagtang siya sa top sa site */}
         <nav>
          <p>Access to all Pages</p>
          <Link to="/dashboard">| Dashboard |</Link>
          <Link to="/create-race">| Create Page |</Link>
          <Link to='/landing'>| Landing Page |</Link>
          <Link to='/login'>| Login Page |</Link>
          <Link to='/signup'>| Sign Up |</Link>
          <Link to='/recover'>| Recover Page |</Link>
          <Link to='/eula'>| EULA Page |</Link>
          <Link to='/tos'>| TOS Page |</Link>
          <Link to='/profile'>| User Profile Page |</Link>
          <Link to='/created-races'>| MadeEvents |</Link>
          <Link to='/view-races'>| ViewEvent |</Link>
          <Link to='/update-race'>| Update your events |</Link>
          <Link to='/joined-races'>| Joined Events |</Link>
        </nav>

        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-race" element={<CreateRace />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/recover" element={<Recover />} />
          <Route path="/eula" element={<Eula />} />
          <Route path="/tos" element={<Tos />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/created-races" element={<CreatedRaces />} />
          <Route path="/view-races" element={<ViewRaces />} />
          {/* <Route path="/updateevent" element={<UpdateEvent />} /> */}
          <Route path="/joined-races" element={<JoinedRaces />} />
          <Route path="/:id" element={<UpdateEvent />}/>
          <Route path="/view-races/:id" element={<ViewRaces />} />
        </Routes>
      </BrowserRouter>
    </ProvideContext>
  );
}

export default App;
