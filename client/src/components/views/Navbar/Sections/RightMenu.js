import React from "react";
// import { Menu, Badge } from "antd";
import { Menu } from "antd";
import axios from "axios";
import { USER_SERVER } from "../../../../Config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { createFromIconfontCN } from "@ant-design/icons";

function RightMenu(props) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const items = [
    { label: <a href="/login">Signin</a>, key: "mail" },
    { label: <a href="/register">Signup</a>, key: "app" },
  ];

  const logInItems = [
    { label: <a href="/product/upload">upload</a>, key: "upload" },
    {
      label: <a href="/">logout</a>,
      key: "logout",
    },
  ];

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        navigate("/login");
      } else {
        alert("Log Out Failed");
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return <Menu mode="horizontal" items={items} />;
  } else {
    return (
      <Menu mode="horizontal" items={logInItems} onClick={logoutHandler} />
    );
  }
}

export default RightMenu;
// export default withRouter(RightMenu);
