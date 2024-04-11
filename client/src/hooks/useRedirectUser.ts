import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "./useTypedSelector";
import { useEffect } from "react";
import { isLoggedIn } from "../redux/auth/authServices";
import { setIsLogginIn } from "../redux/auth/authSlice";

const useRedirectUser = (path: string = "/") => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const redirectUser = async () => {
      // get login status
      const loginStatus = await isLoggedIn();
      dispatch(setIsLogginIn(loginStatus));
      if (!loginStatus) {
        navigate(path);
        return;
      }
    };
    redirectUser();
  }, [dispatch, path, navigate]);
};

export default useRedirectUser;
