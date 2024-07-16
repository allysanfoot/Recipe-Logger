import React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Homepage from "./pages/Homepage"
import Error from "./pages/Error"
import ProtectedRoutes from "./components/ProtectedRoutes"

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterThenLogout() {
  // so we don't have any old access tokens lying around
  localStorage.clear()
  return <Register />
}

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoutes><Homepage /></ProtectedRoutes>} />
        <Route path="/register" element={<RegisterThenLogout />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  )
}

export default App
