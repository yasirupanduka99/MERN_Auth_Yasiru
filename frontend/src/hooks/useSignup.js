import { useState } from "react";
import axios from "axios";
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const signup = async (email, password) => {
        setIsLoading(true);
        setError(null);

        await axios.post('/user/signup', {email, password})
        .then((res) => {
            console.log(res.data.message)

            //save the user to local storage
            localStorage.setItem('user', JSON.stringify(res.data))

            //update the auth context
            dispatch({type: 'LOGIN', payload: res.data})

            setIsLoading(false);
        })
        .catch((err) => {
            setIsLoading(false);
            if(err.response){
                setError(err.response.data.errorMessage);
            } else {
                // If no response received
                setError("☠️ Error occurred while processing your post request." + err.message); // Set a generic error message
            }
        })
    }

    return { signup, isLoading, error }
}