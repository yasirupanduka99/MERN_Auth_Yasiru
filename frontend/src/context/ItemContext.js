import { createContext, useReducer } from "react";

// 1st step - call createContext() method to create context and asign it ItemContext const
export const ItemContext = createContext();

// 3rd step - implement itemReducer function that need to useReducer() in ItemContextProvider function as first parameter.
export const itemReducer = (state, action) => { //this itemReducer need two parameter to pass. state is always previous state. In here previous state is 'user: null'. through the action we can update the state acording to the perticular conditions.
    switch (action.type) {
        case 'SET_ITEM':
            return {
                ...state, // Spread the previous state
                items: action.payload
            }
        case 'CREATE_ITEM':
            return {
                ...state, // Spread the previous state
                items: [action.payload, ...state.items] //[] means array and ...state.items means dont update previous objects and add new object that action.payload have.
            }
        case 'DELETE_ITEM':
            return {
                ...state, // Spread the previous state
                items: state.items.filter((i) => i._id !== action.payload._id) // That mean filter all items that previous state id not equal to deleted document id. ('action.payload._id' means deleted documment id)
            }
        default:
            return state //This default case means if there no case to maatch upper two case then other all cases return same previous state.
    }
}


const initializer = {
    items: null
}

// 2nd step - create ItemContextProvider that is use ItemContext to wrap child element that we want to use to change the state
export const ItemContextProvider = ({ children }) => { // used this ItemCOntextProvider function in index.js file to wrap <App /> tag
    const [state, dispatch] = useReducer(itemReducer, initializer);

    return (
        // value is important thing because when which component or tag we want to update state in children tag, then that coponent or tags values replace with this value informations.
        <ItemContext.Provider value={{ ...state, dispatch }}>
            { children }
        </ItemContext.Provider>
    )
}