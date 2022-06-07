import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../_actions/user_action";
import { useNavigate } from "react-router-dom";

export default function (SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    let user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      dispatch(auth()).then((response) => {
        console.log(response);

        //로그인하지 않은 상태
        if (!response.payload.isAuth) {
          if (option) {
            navigate("/login");
          }
        }
        // } else {
        else if (response.payload.isAuth) {
          //로그인 한 경우
          if (adminRoute && !response.payload.isAdmin) {
            navigate("/");
          } else {
            if (option === false) {
              navigate("/");
            }
          }
        }
      });
    }, [dispatch, props.navigate]);
    return <SpecificComponent {...props} user={user} />;
  }

  return <AuthenticationCheck />;
}
