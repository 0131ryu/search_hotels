import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Row, Col } from "antd";

import DataImages from "./Sections/DataImages";
import DataInfo from "./Sections/DataInfo";

function ShowDetailData() {
  const { dataId } = useParams();

  //콘솔에서 확인한 정보 넣기
  const [Data, setData] = useState({});

  useEffect(() => {
    axios.get(`/api/data/data_id?id=${dataId}&type=single`).then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setData(response.data.data[0]);
      } else {
        alert("상세 정보 가져오기를 실패했습니다.");
      }
    });
  }, []);

  return (
    <div>
      <div style={{ width: "100%", padding: "3rem 4rem" }}>
        <div stye={{ display: "flex", justifyContent: "center" }}>
          <h1>{Data.title}</h1>
        </div>
        <Row gutter={[16, 16]}>
          <Col lg={12} sm={24}>
            {/* DataImages */}
            <DataImages detailData={Data} />
          </Col>

          <Col lg={12} sm={24}>
            {/* DataInfo */}
            <DataInfo detailData={Data} />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ShowDetailData;
