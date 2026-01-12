import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicLayout from './components/PublicLayout';
// Placeholder imports for pages
import Home from './public/Home';
import Locations from './public/Locations';
import LocationDetail from './public/LocationDetail';
import Stations from './public/Stations';
import StationDetail from './public/StationDetail';
import Watch from './public/Watch';
import Login from './dashboard/Login';
import DashboardLayout from './dashboard/DashboardLayout';
import AdminDashboard from './dashboard/AdminDashboard';
import VolunteerDashboard from './dashboard/VolunteerDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="locations" element={<Locations />} />
        <Route path="loc/:slug" element={<LocationDetail />} />
        <Route path="stations" element={<Stations />} />
        <Route path="station/:slug" element={<StationDetail />} />
        <Route path="watch" element={<Watch />} />
      </Route>

      <Route path="/dashboard" element={<Login />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="volunteer" element={<VolunteerDashboard />} />
        {/* Add specific admin subroutes later */}
      </Route>
    </Routes>
  );
}

export default App;
