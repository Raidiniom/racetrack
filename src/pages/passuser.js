import React, { createContext, useContext, useState } from "react";

const UserContext = createContext()

export const ProvideContext = ({children}) => {
    const [ passUsername, setPasUsername ] = useState('')

    return (
        <UserContext.Provider value={[passUsername, setPasUsername]}>
            {children}
        </UserContext.Provider>
    )
}

export const UseUser = () => useContext(UserContext)