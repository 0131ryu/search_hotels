import React from "react";
import { Descriptions, Button } from "antd";

function ProductInfo(props) {
  const ClickHandler = () => {};

  return (
    <div>
      <Descriptions title="상품 Product Info" bordered>
        <Descriptions.Item label="Price">
          {props.detail.title}
        </Descriptions.Item>
        <Descriptions.Item label="Sold"> {props.detail.sold}</Descriptions.Item>
        <Descriptions.Item label="View">{props.detail.views}</Descriptions.Item>
        <Descriptions.Item label="Description">
          {props.detail.description}
        </Descriptions.Item>
      </Descriptions>
      <br />
      <br />
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button size="large" shape="round" type="danger" onClick={ClickHandler}>
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

export default ProductInfo;
