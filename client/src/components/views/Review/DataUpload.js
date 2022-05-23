import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FileUpload from "./FileUpload";

const { TextArea } = Input;

const Seasons = [
  { key: 1, value: "봄" },
  { key: 2, value: "여름" },
  { key: 3, value: "가을" },
  { key: 4, value: "겨울" },
];

function DataUpload() {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Images, setImages] = useState([]);
  //기본값 1로 둠
  const [Season, setSeason] = useState(1);
  const [Price, setPrice] = useState(0);

  const navigate = useNavigate();

  const titleChangeHandler = (event) => {
    setTitle(event.currentTarget.value);
  };

  const descriptionChangeHandler = (event) => {
    setDescription(event.currentTarget.value);
  };

  const seasonHandler = (event) => {
    setSeason(event.currentTarget.value);
  };

  const priceChangeHandler = (event) => {
    setPrice(event.currentTarget.value);
  };

  //추가1 : FileUpload의 값 받아오도록 함
  const updateImages = (newImages) => {
    setImages(newImages);
  };

  //추가2
  const submitHandler = (event) => {
    //페이지 자동 리프레시 되는 것 막음
    event.preventDefault();

    //값이 하나라도 비면 오류
    if (!Title || !Description || !Images || !Seasons || !Price) {
      return alert("모든 값을 작성해야 합니다.");
    }

    //값을 다 채우면 서버 request로 보낸다
    const body = {
      //로그인된 사람의 아이디
      title: Title,
      description: Description,
      images: Images,
      seasons: Season,
      price: Price,
    };

    console.log(Title, Description, Images);

    axios.post("/api/data", body).then((response) => {
      if (response.data.success) {
        alert("상품 업로드에 성공했습니다.");
        navigate("/review");
      } else {
        alert("상품 업로드에 실패했습니다.");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <br />
        <br />
        <br />
        <h2>계절 관련 업로드</h2>
        <Form onSubmitCapture={submitHandler}>
          {/* FileUpload에서 refreshFunction으로 제어 */}
          <FileUpload refreshFunction={updateImages} />
          <label>이름</label>
          <Input onChange={titleChangeHandler} value={Title} />
          <br />
          <br />
          <label>가격($)</label>
          <Input onChange={priceChangeHandler} value={Price} />
          <br />
          <br />
          <label>설명</label>
          <TextArea onChange={descriptionChangeHandler} value={Description} />
          <br />
          <br />
          <select onChange={seasonHandler}>
            {Seasons.map((city) => (
              <option key={city.key} value={city.key}>
                {city.value}
              </option>
            ))}
          </select>

          <br />
          <br />
          <div>
            <Button onClick={submitHandler}>확인</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default DataUpload;
