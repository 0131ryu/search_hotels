import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";

function DataImages(props) {
  //detailData 통해 데이터 전달

  const [Images, setImages] = useState([]);

  useEffect(() => {
    //이미지가 존재하고 이미지의 길이가 0보다 크면
    if (props.detailData.images && props.detailData.images.length > 0) {
      let images = [];
      props.detailData.images.map((item) => {
        images.push({
          original: `http://localhost:5000/${item}`,
          thumbnail: `http://localhost:5000/${item}`,
        });
      });
      setImages(images);
    }
  }, [props.detailData]);

  return (
    <div>
      <ImageGallery items={Images} />
    </div>
  );
}

export default DataImages;
