import {useAuth} from '../context/AuthContext/AuthContext';

export default function Global(){
    const { cookie } = useAuth();

    const HEADER_CONFIG_WITH_TOKEN = {
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${cookie.user_token}`
        }
    }

    return HEADER_CONFIG_WITH_TOKEN
}

// exportation de header config sans token
export const HEADER_CONFIG_WITHOUT_TOKEN = {
    headers: {
        "accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
    }
}