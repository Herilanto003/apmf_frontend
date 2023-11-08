import React from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useMyRefresh } from '../refreshContext/Refresh';
import { useAuth } from '../AuthContext/AuthContext';

const UserContext = React.createContext();

export const useUser = () => {
    return React.useContext(UserContext);
}

export const UserProvider = (props) => {
    const { logoutUser } = useAuth();
    // refresh
    const { isRefresh } = useMyRefresh();
    const [user, setUser] = React.useState({});

    const [cookie] = useCookies();

    console.log('cookie', cookie);

    React.useEffect(() => {
            axios.get('/user/me', {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${cookie.user_token}`
                }
            })
                    .then(response => {
                        console.log('response',response);
                        setUser(response.data)
                    })
                    .catch(error => {
                        console.log(error);
                        logoutUser()
                    })
    }, [isRefresh])

    console.log('user', user);

    return (
        <UserContext.Provider value={{ userLogin: user }}>
            {props.children}
        </UserContext.Provider>
    )
}