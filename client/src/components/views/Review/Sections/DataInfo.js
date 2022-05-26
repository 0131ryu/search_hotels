import React, { useState, useEffect } from "react";
import { Descriptions, Button } from "antd";
import { useDispatch } from "react-redux";
import { HeartTwoTone } from "@ant-design/icons";
import { addToHeart } from "../../../../_actions/user_action";

function DataInfo(props) {
  const [Data, setData] = useState({});

  useEffect(() => {
    setData(props.detailData);
    // console.log(props.datailData);
  }, [props.detailData]);

  const dispatch = useDispatch();

  const clickHandler = () => {
    //상품에 대한 id, 갯수, 날짜 정보(언제 넣었는지) 정보
    dispatch(addToHeart(props.detailData._id));
  };

  return (
    <div>
      <Button
        type="primary"
        shape="circle"
        icon={<HeartTwoTone />}
        style={{
          position: "relative",
          left: "150px",
          top: "27px",
          fontSize: "20px",
        }}
        onClick={clickHandler}
      />

      <Descriptions title="상품 Product Info" bordered>
        <Descriptions.Item label="Price">{Data.title}</Descriptions.Item>
        <Descriptions.Item label="price">{Data.price}</Descriptions.Item>
        <Descriptions.Item label="Seasons">{Data.seasons}</Descriptions.Item>
        <Descriptions.Item label="Description">
          {Data.description}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
}

export default DataInfo;
