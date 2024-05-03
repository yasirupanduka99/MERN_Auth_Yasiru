import { useAuthContext } from "./useAuthContext";
import { useItemContext } from "./useItemContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: itemDispatch } = useItemContext();

  const logout = () => {
    //remove user from local storage
    localStorage.removeItem("user");

    //dispatch logout action
    dispatch({ type: "LOGOUT" });
    itemDispatch({ type: SET_ITEM, payload: null }) // using payload to null in SET_ITEM, we can remove item data from global state when pressing logout. then other user logging they not suddenly see(just see and go issue) previous user data. because global state is clear.
  };

  return { logout };
};
