import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext/AuthContext';

const RouteGard = ({ children }) => {
    const { cookie } = useAuth();

    return cookie.user_token ? children : <Navigate to={'/apmf/login'} />
}

export default RouteGard;