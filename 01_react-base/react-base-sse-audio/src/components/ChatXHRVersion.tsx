import React, {useState} from 'react';
import {text} from "stream/consumers";

export default function ChatXHRVersion() {
  const [sendLock, setSendLock] = useState(false);
  const [firstLoading, setFirstLoading] = useState(true);
  const [textInput, setTextInput] = useState("Hi");
  const [reply, setReply] = useState("");

  const [timeCount, setTimeCont] = useState("");
  const token = "123456"; //
  const characterChatId = 43;
  const language = "CN";

  const renderText = (text: string) => {
    setReply("")
    setTextInput("")
  }
  //const playBase64ArrayAudio = (array) => console.log("Playing base64 audio array", array);

  let url = "http://127.0.0.1:8080/api/v1/message/send";


  const playBase64Audio = (base64Array: string[]) => {
    let blobParts = [];

    for (let i = 0; i < base64Array.length; i++) {
      // 将 base64 编码的字符串转换为二进制数据
      const byteCharacters = atob(base64Array[i]);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      blobParts.push(byteArray)
    }

    // 创建 Blob 对象并设置正确的音频类型
    const blob = new Blob(blobParts, {type: 'audio/mp3'});

    // 将 Blob 对象转换为可用于 Audio 元素的 URL
    const audioSrc = URL.createObjectURL(blob);
    const audio = new Audio(audioSrc);
    audio.play()
      .catch(error => console.error("Error playing the audio", error));
  };

  const onSend = (base64?: string) => {
    console.log("base64,", base64);
    const start = new Date().getTime()
    // if (sendLock || firstLoading) {
    //   return;
    // }
    if (textInput === "" && !base64) {
      return;
    }

    console.log("start date", new Date().getTime());
    let lock = true;
    const sendTextForXhr = textInput;
    setReply("");
    setSendLock(true);
    setTextInput("");


    const xhr = new XMLHttpRequest();
    xhr.open("Post", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    xhr.onload = () => {
      const end1 = new Date().getTime()
      setTimeCont(timeCount.concat("time1:" + (end1 - start)))

      let base64Array: any[] = [];
      let str = "";
      const eventData = xhr.responseText.split("\n");
      eventData.forEach((event, index) => {
        if (index + 2 < eventData.length) {
          if (JSON.stringify(event).length > 12) {
            const data = JSON.parse(event.substring(5));
            const type = data?.ContentType;
            if (type === "translation") {
              str = data?.Content;
            }
            if (type === "audio" && data.Audio) {
              base64Array.push(data.Audio);
            }
          }
        }
      });
      const end2 = new Date().getTime()
      setTimeCont(timeCount.concat("total time:" + (end2 - start) + "(ms)"))
      renderText(str);
      //playBase64ArrayAudio(base64Array);
      playBase64Audio(base64Array)
      setSendLock(false);
    };

    let value = {
      ChatId: characterChatId,
      TextLang: language === "CN" ? "zh-CN" : language === "TC" ? "zh-TW" : language,
      ContentType: base64 ? "audio" : "text",
      Content: sendTextForXhr,
      Audio: "",
    };
    let jsonString = JSON.stringify(value);
    console.log("jsonString", jsonString);
    xhr.send(jsonString);
  };

  return (
    <div className="App">
      <input value={textInput} onChange={(e) => setTextInput(e.target.value)}/>
      <button onClick={() => onSend()}>Send Request</button>
      <div>{timeCount}</div>
      <div>{reply}</div>
    </div>
  );
}
