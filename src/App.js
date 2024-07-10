import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { ProvideContext, UseUser } from "./pages/passuser";

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
import ViewEvent from "./pages/viewEvent";
import UpdateEvent from "./pages/youreventupdate";

function App() {
  return (
    <ProvideContext>
      <BrowserRouter>
      {/* Ang nav kay maoy ei comment out para ma wagtang siya sa top sa site */}
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
          <Link to='/updateevent'>| Update your events |</Link>
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
          <Route path="/viewevent" element={<ViewEvent />} />
          <Route path="/updateevent" element={<UpdateEvent />} />
        </Routes>
      </BrowserRouter>
    </ProvideContext>
  );
}

export default App;
