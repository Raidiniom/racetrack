import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { ProvideContext } from "./pages/passuser";

// The Pages
import Creater from "./pages/createRace";
import Dashboard from "./pages/dashboard";
import Landingpage from "./pages/landingpage";
import Login from "./pages/loginpage";
import Recover from "./pages/recoverpage";
import Register from "./pages/registerpage";
import Tos from "./pages/tospage";
import Eula from "./pages/eulapage";
import Profile from "./pages/userprofile";
import MadeEvents from "./pages/createdevents";
import ViewEvent from "./pages/viewEvent";
import UpdateEvent from "./pages/updateevent";
import JoinedEvent from "./pages/joinedEvents";
import Aboutus from "./pages/aboutus";



function App() {
  return (
    <ProvideContext>
      <BrowserRouter>
      {/* Ang nav kay maoy ei comment out para ma wagtang siya sa top sa site */}
        {/* <nav>
          <p>Access to all Pages</p>
          <Link to="/">| Dashboard |</Link>
          <Link to="/create">| Create Page |</Link>
          <Link to='/landingpage'>| Landing Page |</Link>
          <Link to='/login'>| Login Page |</Link>
          <Link to='/register'>| Register Page |</Link>
          <Link to='/recover'>| Recover Page |</Link>
          <Link to='/eula'>| EULA Page |</Link>
          <Link to='/tos'>| TOS Page |</Link>
          <Link to='/profile'>| User Profile Page |</Link>
          <Link to='/madeevents'>| MadeEvents |</Link>
          <Link to='/viewevent'>| ViewEvent |</Link>
          <Link to='/updateevent'>| Update your events |</Link>
          <Link to='/joinedevents'>| Joined Events |</Link>
        </nav> */}

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create" element={<Creater />} />
          <Route path="/landingpage" element={<Landingpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recover" element={<Recover />} />
          <Route path="/eula" element={<Eula />} />
          <Route path="/tos" element={<Tos />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/madeevents" element={<MadeEvents />} />
          <Route path="/viewevent" element={<ViewEvent />} />
          {/* <Route path="/updateevent" element={<UpdateEvent />} /> */}
          <Route path="/joinedevents" element={<JoinedEvent />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/:id" element={<UpdateEvent />}/>
          <Route path="/viewevent/:id" element={<ViewEvent />} />
        </Routes>
      </BrowserRouter>
    </ProvideContext>
  );
}

export default App;
