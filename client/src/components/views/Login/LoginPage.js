import React, { useState } from "react";
// import Axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";
import { useNavigate } from "react-router-dom";

function LoginPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log("Email", Email);
    console.log("Password", Password);

    let body = {
      email: Email,
      password: Password,
    };

    //로그인이 성공하는 경우 첫 페이지로 이동
    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        navigate("/");
      } else if (!response.payload.loginSuccess) {
        alert("이메일 또는 비밀번호를 확인해주세요.");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <button style={{ marginTop: "10px" }}>Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
