import React from "react";
import LeftMenu from "./Sections/LeftMenu";
import RightMenu from "./Sections/RightMenu";
import { Row, Col } from "antd";
// import Icon from "@ant-design/icons";
import "./Nabvar.css";

function NavBar() {
  return (
    <Row className="menu__Row">
      <Col span={3} className="menu__logo">
        <a href="/">Logo</a>
      </Col>
      <Col span={11} className="menu_left">
        <LeftMenu className="menu_left-a" />
      </Col>
      <Col span={3}></Col>
      <Col span={7} className="menu_right">
        <RightMenu />
      </Col>
    </Row>
  );
}

export default NavBar;
