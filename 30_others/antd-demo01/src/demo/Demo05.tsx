import React from 'react';
import {Upload} from 'antd';

function PasteUpload() {

  const [fileList, setFileList] = React.useState<any[]>([]);
  const handlePaste = (event: any) => {
    debugger
    const items = (event.clipboardData || event.originalEvent.clipboardData).items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) { // 只处理图片类型
        const file = items[i].getAsFile();

        const uploadFile: any = {
          uid: Date.now(),
          name: file.name,
          status: 'done',
          type: file.type,
          size: file.size,
          originFileObj: file,
        };
        const newFileList = [...fileList, uploadFile];
        setFileList(newFileList);

      }
    }
  }

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
      >

      </Upload>
      <input size={10} onPaste={handlePaste}/>
    </>
  );
}

export default PasteUpload;
