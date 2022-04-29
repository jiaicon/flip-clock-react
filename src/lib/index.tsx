import { useState, useEffect, useMemo, useRef } from 'react';
import Flipper from '@/components/Flipper';
import styles from './styles.module.less';

type Type = 'd' | 'h' | 'm' | 's' | 'ms' | 'D' | 'H' | 'M' | 'S' | 'MS';
interface FlipClockReact {
  format?: string; // 默认: 'd:h:s:ms'
  timeline: Date | string | number;
  full?: boolean;
  divide?: boolean;
}
type ST = Record<Type, number>
const st: ST = {
  d: 24 * 60 * 60 * 1000,
  h: 60 * 60 * 1000,
  m: 60 * 1000,
  s: 1000,
  ms: 1,
  D: 24 * 60 * 60 * 1000,
  H: 60 * 60 * 1000,
  M: 60 * 1000,
  S: 1000,
  MS: 1,
}
interface FlipType {
  type: 'flip',
  frontText: string | number,
  backText: string | number,
}
interface TextType {
  type: 'text',
  value: string;
}
const Index = (props: FlipClockReact) => {
  const { format = 'd:h:m:s', timeline, full = true, divide = false } = props;
  const timer = useRef<any>(null);
  const formatTimeline = useRef<number>(0);
  const [dada, setData] = useState<FlipType>({
    type: 'flip',
    frontText: 0,
    backText: 0
  })
  const [intervalTime, setIntervalTime] = useState<number>(1000);
  const [text, setText] = useState<(FlipType | TextType)[]>([]);

  formatTimeline.current = useMemo(() => {
    if (!timeline || timeline !== timeline) {
      console.error('timeline should be typeof string number or Date');
      return 0
    }
    if (timeline instanceof Date) {
      // 与当前时间计算差值，转化为数字类型
      return new Date(timeline).getTime() - new Date().getTime();
    }
    return Number(timeline)
  }, [timeline])
  // 将数字转化为格式化后的类型
  const formatDate = (timeStamp: number, format: string, _text: (FlipType | TextType)[]): (FlipType | TextType)[] => {
    const rule = /([a-zA-Z]+)|([^a-zA-Z]+)/g;
    const arr = format.match(rule) || [];
    let day = 0;
    let hour = 0;
    let minute = 0;
    let second = 0;
    let ms = 0;

    let interval = intervalTime;
    const b = arr?.map((item: Type | string, index) => {
      if (item in st) {
        if (item?.toLowerCase() === 'd') {
          day = Math.floor(timeStamp / st.d);
          interval = st[item as Type];
          return {
            type: 'flip',
            frontText: (_text[index] as FlipType)?.backText || day,
            backText: day
          } as FlipType
        } else if (item?.toLocaleLowerCase() === 'h') {
          hour = Math.floor(timeStamp / st.h - day * 24);
          const hour_text = full && hour / 10 < 1 ? `0${hour}` : hour;
          interval = st[item as Type];
          return {
            type: 'flip',
            frontText: (_text[index] as FlipType)?.backText || hour_text,
            backText: hour_text
          } as FlipType
        } else if (item?.toLocaleLowerCase() === 'm') {
          minute = Math.floor(timeStamp / st.m - (day * 24 * 60 + hour * 60));
          const minute_text = full && minute / 10 < 1 ? `0${minute}` : minute;
          interval = st[item as Type];
          return {
            type: 'flip',
            frontText: (_text[index] as FlipType)?.backText || minute_text,
            backText: minute_text
          } as FlipType
        } else if (item?.toLocaleLowerCase() === 's') {
          console.log(hour)
          second = Math.floor(timeStamp / st.s - (day * 24 * 60 * 60 + hour * 60 * 60 + minute * 60));
          const second_text = full && second / 10 < 1 ? `0${second}` : second;
          interval = st[item as Type];
          return {
            type: 'flip',
            frontText: (_text[index] as FlipType)?.backText || second_text,
            backText: second_text
          } as FlipType
        } else if (item?.toLocaleLowerCase() === 'ms') {
          ms = Math.floor(timeStamp - (day * st.d + hour * st.h + minute * st.m + second * 1000));
          const ms_text = full && ms / 10 < 1 ? `0${ms}` : ms;
          interval = st[item as Type];
          return {
            type: 'flip',
            frontText: (_text[index] as FlipType)?.backText || ms_text,
            backText: ms_text
          } as FlipType
        }
        return {
          type: 'flip',
          frontText: 0,
          backText: 0
        } as FlipType
      } else {
        return {
          type: 'text',
          value: item,
        } as TextType
      }
    })
    setIntervalTime(interval);
    return b;
  }

  const run = () => {
    let t = formatTimeline.current;
    timer.current = setInterval(() => {
      if (t <= 0) {
        clearInterval(timer.current);
        return;
      }
      t = t - 1000;
      setText((_text) => formatDate(t, format, _text))
    }, intervalTime)
  }

  useEffect(() => {
    run();
    return () => {
      clearInterval(timer.current)
    }
  }, [intervalTime])
  const onChange = () => {
    setData({
      type: 'flip',
      frontText: dada.backText,
      backText: Number(dada.backText) + 1
    })
  }
  return (
    <div>
      <div className={styles['flip-clock-react']}>
        {
          text.map((item, index) => {
            if (item.type == 'flip') {
              return (
                <Flipper
                  key={index}
                  frontText={item.frontText}
                  backText={item.backText}
                />
              )
            }
            return <span key={index}>{item.value}</span>
          })
        }
      </div>
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
    </div>
  )
}

export default Index;
