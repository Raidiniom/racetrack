import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

// The Pages
import Creater from "./pages/createRace"
import Dashboard from "./pages/dashboard"
import Updater from "./pages/updateRace"
import Landingpage from "./pages/landingpage"

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Dashboard</Link>
        <Link to="/create">Create Event</Link>
        <Link to="/update">Update Event</Link>
        <Link to='/landingpage'>Landingpage</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create" element={<Creater />} />
        <Route path="/:id" element={<Updater />} />
        <Route path="/landingpage" element={<Landingpage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
