import React from 'react';
import {Tabs} from "antd";
import './Demo04.css'
const Demo04: React.FC = () => {

  const items = [];
  for (let i = 0; i < 2; i++) {
    const id = String(i + 1);
    items.push({
      label: `Tab ${id}`,
      key: id,
      children: `Content of Tab Pane ${id}`
    })
  }

  return (
    <Tabs
      defaultActiveKey="1"
      centered
      items={items}
      className="custom-tabs"
    />
  )
};


export default Demo04;