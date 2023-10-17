import React from 'react';
export const GlobalContext = React.createContext({});
export const useGlobalContext = () => {
    const globalContext = React.useContext(GlobalContext);
    if (globalContext === undefined) {
        throw new Error(
            'Global context error'
        );
    }
    return globalContext;
};
export const GlobalProvider= ({ children }) => {
    const [userCount, setUserCount] = React.useState(0);
    const [productCount, setProductCount] = React.useState(0);

    return (
        <GlobalContext.Provider
            value={{
                userCount,
                setUserCount,
                setProductCount,
                productCount
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
