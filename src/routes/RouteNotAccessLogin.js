import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext/AuthContext';

const RouteNotAccessLogin = ({ children }) => {
    const { cookie } = useAuth();

    return cookie.user_token ? <Navigate to={'/apmf/account'} /> : children
}
 
export default RouteNotAccessLogin;
