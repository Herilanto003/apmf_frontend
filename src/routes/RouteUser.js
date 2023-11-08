import React from 'react';
import { useUser } from '../context/userContext/UserContext';
import ModalActive from '../components/ModalActive';

const RouteUser = (props) => {
    const {userLogin} = useUser();
    const [openActive, setOpenActive] = React.useState(false)

    console.log('userddd', userLogin);

    React.useEffect(() => {
        console.log('status', userLogin.status_compte);
        if (!userLogin.status_compte){
            setOpenActive(true)
        } else {
            setOpenActive(false)
        }
    }, [userLogin])
  

    return (
        <React.Fragment>
            <ModalActive 
                open={openActive}
                user={userLogin}
            />
            {props.children}
        </React.Fragment>
    );
}

export default RouteUser;
