import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "antd";
import ImageSlider from "./Sections/ImageSlider";

import { seasons } from "./Sections/Datas";
import DataCheckbox from "./Sections/DataCheckbox";

const { Meta } = Card;

function ShowAllData() {
  const [Datas, setDatas] = useState([]);
  //화면에 보여주는 이미지 수 제어
  const [Start, setStart] = useState(0);
  const [End, setEnd] = useState(6);

  //더보기 버튼 안 보이게 하기
  const [LimitImage, setLimitImage] = useState(0);

  //필터 역할
  const [Filters, setFilters] = useState({ seasons: [] });

  useEffect(() => {
    let body = {
      start: Start,
      end: End,
    };

    commonAxios(body);
  }, []);

  //더 보기에 두 번 들어가기 때문에 따로 분리
  const commonAxios = (body) => {
    //post에 info값 넣을 것
    axios.post("/api/data/list", body).then((response) => {
      if (response.data.success) {
        // console.log(response.data);

        if (body.showMore) {
          setDatas([...Datas, ...response.data.dataInfo]);
        } else {
          setDatas(response.data.dataInfo);
        }
        setLimitImage(response.data.limitImage);
      } else {
        alert("상품을 가져오는데 실패했습니다.");
      }
    });
  };

  const showMoreData = () => {
    let start = Start + End;

    let body = {
      start: start,
      end: End,
      showMore: true,
    };

    //더 보기 버튼을 눌렀을 때 이전 정보도 같이 보여줘야 함
    commonAxios(body);
    setStart(start);
  };

  const renderCard = Datas.map((data, index) => {
    return (
      <div style={{ display: "Grid", placeItems: "center" }}>
        <Col lg={4} md={6} xs={16} key={index}>
          <Card
            style={{
              width: "350px",
              height: "20%",
              position: "relative",
              right: "50%",
            }}
            //ImageSlider에 images로 정보 전달
            cover={<ImageSlider images={data.images} />}
          >
            <Meta
              title={data.title}
              description={`$${data.description}`}
            ></Meta>
          </Card>
        </Col>
      </div>
    );
  });

  const boxFilters = (filters, category) => {
    const newFilters = { ...Filters };

    newFilters[category] = filters;
    // console.log("filters : ", filters);
    showFilters(newFilters);
    setFilters(newFilters);
  };

  //더보기 버튼과 방식 똑같음
  const showFilters = (filters) => {
    let body = {
      start: 0,
      end: End,
      filters: filters,
    };

    commonAxios(body);
    setStart(0);
  };

  return (
    <div style={{ width: "100%", margin: "0" }}>
      <br />
      <br />
      <br />
      <br />
      <h2 style={{ textAlign: "center" }}>DB에 저장한 거 확인하기</h2>

      {/* checkBox */}
      <Col lg={10} xs={20} style={{ position: "relative", left: "8.5%" }}>
        <DataCheckbox
          list={seasons}
          boxFilters={(filters) => boxFilters(filters, "seasons")}
        />
      </Col>

      {/* card */}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <Row gutter={[20, 20]}>{renderCard}</Row>
      </div>

      {LimitImage >= End && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button style={{}} onClick={showMoreData}>
            더 보기
          </button>
        </div>
      )}
    </div>
  );
}

export default ShowAllData;
