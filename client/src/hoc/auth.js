import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../_actions/user_action";
import { useNavigate } from "react-router-dom";

export default function (SpecificComponent, option, adminRoute = null) {
  //null : 아무나 출입 가능
  //option이 true : 로그인 한 사람만 출입 가능
  //option이 false : 로그인한 유저는 출입 불가능

  function AuthentificationCheck(props) {
    const navigate = useNavigate();

    let user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then(async (response) => {
        console.log(response);
        //로그인 하지 않은 상태
        if (await !response.payload.isAuth) {
          if (option === true) {
            //로그인으로 이동 시
            navigate("/login"); //로그인페이지로 가게 함
          }
        } else {
          //response.payload.isAuth = true
          //로그인한 상태(로그인페이지, 회원가입 페이지 이동하지 않아야 함)
          if (adminRoute && !response.payload.isAdmin) {
            //option이 true일 때
            navigate("/");
          } else {
            //option이 false일 때
            //false상태
            if (option === false) {
              navigate("/");
            }
          }
        }
      });
    }, [dispatch, props.history]);

    //props를 이용해 모든 정보를 넣음
    return <SpecificComponent {...props} user={user} />;
  }

  return <AuthentificationCheck />;
}
