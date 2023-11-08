import React from 'react';

const RefreshContext = React.createContext();

export const useMyRefresh = () => {
    return React.useContext(RefreshContext);
}

export const RefreshProvider = (props) => {

    const [isRefresh, setIsRefresh] = React.useState(false);

    const handleRefresh = () => {
        setIsRefresh(!isRefresh)
    }

    return (
        <RefreshContext.Provider value={{ isRefresh, handleRefresh }}>
            { props.children }
        </RefreshContext.Provider>
    )
}