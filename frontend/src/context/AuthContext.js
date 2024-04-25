import { createContext, useEffect, useReducer } from 'react';

export const AuthContext = createContext();

// authReducer for login cases and logout cases
export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload}
        case 'LOGOUT':
            return { user: null }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => { //this children means whatever component this function wraps
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    // if user login or signup then react app should know user logged in even refresh happens. so create useEffect and get user from local storage and set the payload as that user. then even refresh the page react app can hold user.
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))

        if (user) {
            dispatch({ type: 'LOGIN', payload: user })
        }
    }, [])

    console.log('AuthContext state: ', state)

    return (
        <AuthContext.Provider value = {{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}