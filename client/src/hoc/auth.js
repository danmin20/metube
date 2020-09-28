import React, { useEffect } from "react";
import { auth } from "../_actions/user_actions";
import { useSelector, useDispatch } from "react-redux";

export default function (SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    let user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then((response) => {
        // 로그인이 안 되어있으면
        if (!response.payload.isAuth) {
          if (option) {
            props.history.push("/login");
          }
          // 로그인이 되어 있으면
        } else {
          props.history.push("/");
        }
      });
    }, []);

    return <SpecificComponent {...props} user={user} />;
  }
  return AuthenticationCheck;
}
