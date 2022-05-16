import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";
import { useNavigate } from "react-router-dom";

export default function (SpecificComponent, option, adminRoute = null) {
  //backned의 그 사람의 현재 상태 확인
  //api/user/auth로 정보 보내기

  //null : 아무나 출입 가능
  //option이 true : 로그인 한 사람만 출입 가능
  //option이 false : 로그인한 유저는 출입 불가능

  function AuthentificationCheck(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      dispatch(auth()).then((response) => {
        console.log(response);
        //로그인 하지 않은 상태
        if (!response.payload.isAuth) {
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
            navigate("/");
          }
        }
      });
    }, []);

    return <SpecificComponent />;
  }

  return <AuthentificationCheck />;
}
