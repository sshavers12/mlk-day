import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicLayout from './components/PublicLayout';
// Placeholder imports for pages
import Home from './public/Home';
import Locations from './public/Locations';
import LocationDetail from './public/LocationDetail';
import Stations from './public/Stations';
import LathamStations from './public/LathamStations';
import StationDetail from './public/StationDetail';
import Forms from './public/Forms';
import Watch from './public/Watch';
import Login from './dashboard/Login';
import SignUp from './dashboard/SignUp';
import DashboardLayout from './dashboard/DashboardLayout';
import AdminDashboard from './dashboard/AdminDashboard';
import VolunteerDashboard from './dashboard/VolunteerDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        {/* <Route path="locations" element={<Locations />} /> Legacy */}
        <Route path="loc/:slug" element={<LocationDetail />} />
        {/* <Route path="stations" element={<Stations />} /> Legacy */}
        <Route path="latham-stations" element={<LathamStations />} />
        <Route path="forms" element={<Forms />} />
        {/* <Route path="station/:slug" element={<StationDetail />} /> Legacy */}
        <Route path="watch" element={<Watch />} />
      </Route>

      <Route path="/login" element={<Login />} />
      {/* <Route path="/signup" element={<SignUp />} /> Public signup disabled */}

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<AdminDashboard />} /> {/* Default to Admin for now, or maybe a Gateway page? */}
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="volunteer" element={<VolunteerDashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
