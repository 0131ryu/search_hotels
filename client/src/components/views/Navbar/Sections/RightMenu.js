import React from "react";
import { Menu } from "antd";
import axios from "axios";
import { USER_SERVER } from "../../../../Config";
// import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const items = [
  { label: <a href="/login">Signin</a>, key: "mail" },
  { label: <a href="/register">Signup</a>, key: "app" },
  //   {
  //     label: "Nav three",
  //     key: "subMenu",
  //     children: [
  //       {
  //         type: "group",
  //         label: "item2",
  //         children: [
  //           { label: "op1", key: "set1" },
  //           { label: "op2", key: "set2" },
  //         ],
  //       },
  //       {
  //         type: "group",
  //         label: "item2",
  //         children: [
  //           { label: "op3", key: "set3" },
  //           { label: "op4", key: "set4" },
  //         ],
  //       },
  //     ],
  //   },
];

const logInItems = [
  {
    label: <a href="/logout">logout</a>,
    key: "logout",
  },
  { label: <a href="/product/upload">upload</a>, key: "app" },
];

function RightMenu(props) {
  const [current, setCurrent] = React.useState("mail");

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

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
      //   <Menu mode={props.mode}>
      //     <Menu.Item>
      //       <a onClick={logoutHandler}>Logout</a>
      //     </Menu.Item>
      //     <Menu.Item>
      //       <a href="/product/upload">Upload</a>
      //     </Menu.Item>
      //   </Menu>
      <Menu mode="horizontal" items={logInItems} />
    );
  }
}

export default RightMenu;
// export default withRouter(RightMenu);
