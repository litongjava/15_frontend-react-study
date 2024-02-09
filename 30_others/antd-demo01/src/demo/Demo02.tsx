import React, {useEffect, useState} from 'react';
import {Button, Progress} from 'antd';

const Demo02: React.FC = () => {
  const [percent, setPercent] = useState(0); // 进度条的百分比
  const [timer, setTimer] = useState<any | null>(null); // 定时器

  useEffect(() => {
    // 当组件卸载时，清除定时器
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timer]);

  const startProgress = () => {
    if (timer) clearTimeout(timer); // 清除已有的定时器
    setPercent(0);
    const newTimer = setInterval(() => {
      setPercent((prevPercent) => {
        if (prevPercent >= 99) {
          clearInterval(newTimer); // 当进度达到99%时停止定时器
          return prevPercent;
        }
        return prevPercent + 1;
      });
    }, 1000);
    setTimer(newTimer);
  };

  const closeProgress = () => {
    if (timer) {
      clearTimeout(timer); // 停止定时器
      setTimer(null);
    }
    setPercent(100); // 将进度设置为100%
  };

  return (
    <>
      <Button onClick={startProgress} type="primary">开始</Button>
      <Button onClick={closeProgress} style={{ marginLeft: '10px' }}>关闭</Button>
      <div style={{position:'relative'}}>
        <Progress percent={percent} strokeWidth={20} trailColor="white" status={percent < 100 ? 'active' : 'normal'} format={() => ''} />
        <span style={{ position: 'absolute', right: '-25px', top: '-25px' }}><b>{percent}%</b></span>
      </div>
    </>
  );
};

export default Demo02;
