
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './NavBar/Navbar';
import Login from "./pages/Login";
import Conference from "./pages/Conference";
import AdminUser from "./pages/AdminUser";
import AdminConference from "./pages/AdminConference";
import CreateConference from "./pages/CreateConference";
import EditConference from "./pages/EditConference";
import ConferenceDetails from "./conference/ConferenceDetails";
import {UserProvider} from "./context/UserContext";

function App() {
  return (
      <UserProvider>
      <Router>
          <Navbar />
          <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/conference" element={<Conference />} />
              <Route path="/adminuser" element={<AdminUser />} />
              <Route path="/createconference" element={<CreateConference />} />
              <Route path="/conferencedetails/:id" element={<ConferenceDetails />} />
              <Route path="/editconference/:id" element={<EditConference />} />
              <Route path="/adminconference" element={<AdminConference />} />
          </Routes>
      </Router>
      </UserProvider>
  );
}

export default App;
