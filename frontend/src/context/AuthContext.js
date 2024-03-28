import { createContext, useReducer } from 'react';

export const AuthContext = createContext();

// authReducer for login cases and logout cases
export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload}
    }
}

export const AuthContextProvider = ({ childern }) => { //this children means whatever component this function wraps
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })
}