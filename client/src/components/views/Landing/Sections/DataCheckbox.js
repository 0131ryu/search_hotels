import React, { useState } from "react";
import { Collapse, Checkbox } from "antd";

const { Panel } = Collapse;

function DataCheckbox(props) {
  //여러 개를 체크
  const [Checked, setChecked] = useState([]);

  const handleToggle = (value) => {
    //누른 것의 index를 구하고(indexOf는 없는 값 찾으며 -1)
    const currentIndex = Checked.indexOf(value);
    //전체 check된 state에서 현재 누른 checkbox가 이미 있다면
    const newChecked = [...Checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      //빼주고 state를 넣어준다
      //값이 지워짐
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    props.handleFilters(newChecked);
  };

  const renderCheckboxLists = () =>
    props.list &&
    props.list.map((value, index) => (
      <React.Fragment key={index}>
        <Checkbox
          onChange={() => handleToggle(value._id)}
          type="checkbox"
          checked={Checked.indexOf(value._id) === -1 ? false : true}
        />
        <span>{value.name}</span>
      </React.Fragment>
    ));

  return (
    <div>
      <Collapse style={{ height: "100%", width: "500px", marginLeft: "14.8%" }}>
        <Panel header="Continents" key="1">
          {renderCheckboxLists()}
        </Panel>
      </Collapse>
    </div>
  );
}

export default DataCheckbox;
