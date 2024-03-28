import { useContext } from "react";

// import ItemContext function from ItemContext.js file, this ItemContext has that value we set 'state, dispatch'
import { ItemContext } from "../context/ItemContext";

export const useItemContext = () => {
    const context = useContext(ItemContext)

    if (!context) {
        throw Error('useItemContext must be used inside an ItemContextProvider')
    }

    return context
}