import React, { useEffect, useState } from "react";
import { Descriptions, Button } from "antd";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../_actions/user_action";

function ProductInfo(props) {
  const [Product, setProduct] = useState({});

  useEffect(() => {
    setProduct(props.detail);
  }, [props.detail]);

  const dispatch = useDispatch();
  const clickHandler = () => {
    //상품에 대한 id, 갯수, 날짜 정보(언제 넣었는지) 정보
    dispatch(addToCart(props.detail._id));
  };

  return (
    <div>
      <Descriptions title="상품 Product Info" bordered>
        <Descriptions.Item label="Price">{Product.title}</Descriptions.Item>
        <Descriptions.Item label="Sold"> {Product.sold}</Descriptions.Item>
        <Descriptions.Item label="View">{Product.views}</Descriptions.Item>
        <Descriptions.Item label="Description">
          {Product.description}
        </Descriptions.Item>
      </Descriptions>
      <br />
      <br />
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button size="large" shape="round" type="danger" onClick={clickHandler}>
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

export default ProductInfo;
