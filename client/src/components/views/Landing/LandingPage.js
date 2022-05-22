//LandingPage
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Row, Col } from "antd";
const { Meta } = Card;

function LandingPage() {
  const [Products, setProducts] = useState([]);

  useEffect(() => {
    axios.post("/api/product/products").then((response) => {
      if (response.data.success) {
        // console.log(response.data);
        setProducts(response.data.productInfo);
      } else {
        alert("상품을 가져오는데 실패했습니다.");
      }
    });
  });

  const renderCard = Products.map((product, index) => {
    // console.log("product", product);

    return (
      <div style={{ display: "Grid", placeItems: "center" }}>
        <Col lg={6} md={8} xs={24} key={index}>
          <Card
            style={{
              width: "250px",
              height: "15%",
            }}
            cover={
              <img
                src={`http://localhost:5000/${product.images[0]}`}
                style={{ width: "250px", height: "120px" }}
              />
            }
          >
            <Meta
              title={product.title}
              description={`$${product.price}`}
            ></Meta>
          </Card>
        </Col>
      </div>
    );
  });

  return (
    <div style={{ width: "100%", margin: "0" }}>
      <br />
      <br />
      <br />
      <br />
      <h2 style={{ textAlign: "center" }}>Let's Travel Anywhere</h2>
      {/* filter */}

      {/* section */}

      {/* card */}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <Row gutter={[20, 20]}>{renderCard}</Row>
      </div>

      <br />
      {/* <div>
        <button>더보기</button>
      </div> */}
    </div>
  );
}

export default LandingPage;
