import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

// The Pages
import Creater from "./pages/createRace";
import Dashboard from "./pages/dashboard";
import Updater from "./pages/updateRace";
import Landingpage from "./pages/landingpage";
import Login from "./pages/loginpage";
import Recover from "./pages/recoverpage";
import Register from "./pages/registerpage";

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
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create" element={<Creater />} />
        <Route path="/:id" element={<Updater />} />
        <Route path="/landingpage" element={<Landingpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recover" element={<Recover />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
