import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Dashboard from './components/Dashboard/UserAdmin'
import AdminDash from './components/AdminDashboard/AdminDashboard'

const App = () => {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/admin" element={<AdminDash Admin_cred={{ email: "jenish747@gmail.com", password: "95@7474" }} />} />
        <Route path="/user" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/:user" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
