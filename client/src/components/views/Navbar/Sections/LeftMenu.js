import React from "react";
import { Menu, Badge } from "antd";
import { useSelector } from "react-redux";
import { createFromIconfontCN } from "@ant-design/icons";

const IconFont = createFromIconfontCN({
  scriptUrl: [
    "//at.alicdn.com/t/font_1788044_0dwu4guekcwr.js", // icon-javascript, icon-java, icon-shoppingcart (overrided)
    "//at.alicdn.com/t/font_1788592_a5xf2bdic3u.js", // icon-shoppingcart, icon-python
  ],
});

const items = [{ label: <a href="/">Home</a>, key: "home" }];

const loginItems = [
  { label: <a href="/">Home</a>, key: "home" },
  { label: <a href="/history">history</a>, key: "history" },
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
];

function LeftMenu(props) {
  const user = useSelector((state) => state.user);

  // return <Menu mode="horizontal" items={items} />;
  if (user.userData && !user.userData.isAuth) {
    return <Menu mode="horizontal" items={items} />;
  } else {
    return <Menu mode="horizontal" items={loginItems} />;
  }
}

export default LeftMenu;
