import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

// The Pages
import Creater from "./pages/createRace";
import Dashboard from "./pages/dashboard";
import Updater from "./pages/updateRace";
import Landingpage from "./pages/landingpage";
import Login from "./pages/loginpage";
import Recover from "./pages/recoverpage";
import Register from "./pages/registerpage";
import Db from "./pages/ourdb";
import Tos from "./pages/tospage";
import Eula from "./pages/eulapage";
import Profile from "./pages/userprofile";
import MadeEvents from "./pages/createdevents";
import Fetch from "./pages/fetchdata";
import ViewEvent from "./pages/viewEvent";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <p>Access to all Pages</p>
        <Link to="/">| Dashboard |</Link>
        <Link to="/create">| Create Page |</Link>
        <Link to="/update">| Update Page |</Link>
        <Link to='/landingpage'>| Landing Page |</Link>
        <Link to='/login'>| Login Page |</Link>
        <Link to='/register'>| Register Page |</Link>
        <Link to='/recover'>| Recover Page |</Link>
        <Link to='/database'>| Access to Database Page |</Link>
        <Link to='/eula'>| EULA Page |</Link>
        <Link to='/tos'>| TOS Page |</Link>
        <Link to='/profile'>| User Profile Page |</Link>
        <Link to='/madeevents'>| MadeEvents |</Link>
        <Link to='/viewevent'>| ViewEvent |</Link>
        <Link to='/fetching'>| Fetch Data from the Database |</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create" element={<Creater />} />
        <Route path="/:id" element={<Updater />} />
        <Route path="/landingpage" element={<Landingpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recover" element={<Recover />} />
        <Route path="/database" element={<Db />} />
        <Route path="/eula" element={<Eula />} />
        <Route path="/tos" element={<Tos />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/madeevents" element={<MadeEvents />} />
        <Route path="/fetching" element={<Fetch />} />
        <Route path="/viewevent" element={<ViewEvent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
