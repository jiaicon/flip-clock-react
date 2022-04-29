import { useState } from 'react';
import Flipper from './components/Flipper';
import FlipClockReact from './lib';
import type { FlipType } from './lib';
import styles from './test.module.less';

export default function () {
  const [dada, setData] = useState<FlipType>({
    type: 'flip',
    frontText: 0,
    backText: 0
  })
  const onChange = () => {
    setData({
      type: 'flip',
      frontText: dada.backText,
      backText: Number(dada.backText) + 1
    })
  }
  return (
    <>
      <FlipClockReact
        format={'D-H:M:S'}
        colon={(s) => <span style={{color: 'red'}}>{s}</span>}
        timeline={new Date('2022-04-29 17:30')}
      />
      <br />
      <div className={styles['flip-clock-react']}>
        <Flipper
          frontText={14}
          backText={14}
        />
        :
        <Flipper
          frontText={11}
          backText={11}
        />
        :
        <Flipper
          frontText={dada.frontText}
          backText={dada.backText}
        />
      </div>
      <br />
      <div style={{ position: 'relative', zIndex: 10 }}>
        <button onClick={onChange}>切换</button>
      </div>
    </>
  )
}
