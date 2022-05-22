import React from "react";
import { Carousel } from "antd";

function ImageSlider(props) {
  //props를 통해 ShowAllData 정보가 전달
  return (
    <div>
      <Carousel autoplay>
        {props.images &&
          props.images.map((image, index) => (
            <div key={index}>
              <img //ImageSlider에 images로 정보 전달
                style={{ width: "350px", height: "120px" }}
                src={`http://localhost:5000/${image}`}
              />
            </div>
          ))}
      </Carousel>
    </div>
  );
}

export default ImageSlider;
