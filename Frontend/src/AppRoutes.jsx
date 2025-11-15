import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import React from 'react'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'

// Simple auth check function
const hasValidToken = () => {
    return document.cookie.split(';').some(cookie => 
        cookie.trim().startsWith('token=')
    );
}

const RootRedirect = () => {
    // Always redirect root to login first
    return <Navigate to="/login" replace />;
};

const AppRoutes = () => {
    return (
        <BrowserRouter>
        <Routes>
                {/* Always redirect root to login */}
                <Route path="/" element={<Navigate to="/login" replace />} />
                
                {/* Auth routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Protected home route */}
                <Route path="/home" element={
                    hasValidToken() ? <Home /> : <Navigate to="/login" replace />
                } />
                
                {/* Catch all */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
            
    );
}

export default AppRoutes