import React from "react";
import { Descriptions } from "antd";

function DataInfo(props) {
  return (
    <div>
      <Descriptions title="상품 Product Info" bordered>
        <Descriptions.Item label="Price">
          {props.datailData.title}
        </Descriptions.Item>
        <Descriptions.Item label="price">
          {props.datailData.price}
        </Descriptions.Item>
        <Descriptions.Item label="Seasons">
          {props.datailData.seasons}
        </Descriptions.Item>
        <Descriptions.Item label="Description">
          {props.datailData.description}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
}

export default DataInfo;
