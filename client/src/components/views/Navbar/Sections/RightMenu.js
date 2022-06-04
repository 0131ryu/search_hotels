import React from "react";
import { Menu, Badge } from "antd";
import axios from "axios";
import { USER_SERVER } from "../../../../Config";
// import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createFromIconfontCN } from "@ant-design/icons";

const IconFont = createFromIconfontCN({
  scriptUrl: [
    "//at.alicdn.com/t/font_1788044_0dwu4guekcwr.js", // icon-javascript, icon-java, icon-shoppingcart (overrided)
    "//at.alicdn.com/t/font_1788592_a5xf2bdic3u.js", // icon-shoppingcart, icon-python
  ],
});

function RightMenu(props) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const items = [
    { label: <a href="/login">Signin</a>, key: "mail" },
    { label: <a href="/register">Signup</a>, key: "app" },
  ];

  const logInItems = [
    { label: <a href="/history">history</a>, key: "history" },
    { label: <a href="/product/upload">upload</a>, key: "upload" },

    {
      label: (
        <a href="/user/cart">
          {/* user.userData && user.userData.cart.length */}
          <Badge count={5} style={{ marginTop: "1rem" }}>
            <IconFont
              type="icon-shoppingcart"
              style={{ fontSize: 25, marginTop: "1rem" }}
            />
          </Badge>
        </a>
      ),
      key: "cart",
    },
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
