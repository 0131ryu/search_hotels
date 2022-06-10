import React from "react";
import { Button } from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import "./AdminBox.css";

function AdminBox() {
  return (
    <div className="adminBox-main">
      <h3>Admin</h3>
      <a href="/product/upload">
        <Button type="primary" icon={<UploadOutlined />} shape="round">
          Upload
        </Button>
      </a>
      <br />
      <br />
      <a href="/allUsers">
        <Button type="primary" icon={<UserOutlined />} shape="round">
          AllUsers
        </Button>
      </a>
    </div>
  );
}

export default AdminBox;
