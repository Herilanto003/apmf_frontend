import React from 'react';
import { useCookies } from 'react-cookie';

const AuthContext = React.createContext();

export const useAuth = () => {
    return React.useContext(AuthContext); 
}

export const AuthProvider = (props) => {

    // initialisation du cookie 
    const [cookie, setCookie, removeCookie] = useCookies(['user_token']);

    // fonction pour faire un login
    const loginUser = (data) => {
        // date d'expiration
        const dateExpire = new Date()
        const addDateExpireThreeDays = dateExpire.setDate(dateExpire.getDate() + 3)

        setCookie('user_token', data.access_token, { expires: new Date(addDateExpireThreeDays), path: '/' })
    }

    // fonction de deconnexion utilisateur
    const logoutUser = () => {
        removeCookie('user_token', { path: '/' })
        return "SUCCESS"
    }

    // fonction pour tester l'utilisateur s'il est connecté
    const isUserLogin = () => {
        if (!cookie.user_token) {
            return false
        }

        return true
    }

    // value
    const value = {
        loginUser,
        logoutUser,
        isUserLogin,
        cookie
    }

    return (
        <AuthContext.Provider value={ value }>
            {props.children}
        </AuthContext.Provider>
    )
}