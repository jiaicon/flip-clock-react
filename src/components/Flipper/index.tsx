import { useEffect, useState, useMemo } from 'react';
import classnames from 'classnames';
import './styles.less';

interface Filpper {
  frontText: number | string;
  backText: number | string;
  duration?: number;
  flipType?: 'down' | 'up';
}

const Index = (props: Filpper) => {
  const { frontText = 0, backText = 1, duration = 600, flipType = 'down' } = props;
  const [isFlipping, setIsFlipping] = useState(false);
  const [frontTextFromData, setFrontTestFromData] = useState<number | string>(frontText);
  const [backTextFromData, setBackTextFromData] = useState<number | string>(backText);

  const _textClass = (number: number | string) => {
    return 'number' + number
  }

  const _flip = (front: number | string, back: number | string) => {
    // 如果处于翻转中，则不执行
    if (isFlipping) {
      return false
    }
    setFrontTestFromData(front);
    setBackTextFromData(back);
    setIsFlipping(true);
    setTimeout(() => {
      setFrontTestFromData(back);
      setIsFlipping(false);
    }, duration)
  }

  useEffect(() => {
    _flip(frontText, backText)
  }, [frontText, backText])

  const containerClass = classnames(flipType, {
    'react-flipper': true,
    'go': isFlipping && frontTextFromData !== backTextFromData
  })
  const frontClass = classnames('digital front', _textClass(frontTextFromData));
  const backClass = classnames('digital back', _textClass(backTextFromData));
  return (
    <div className={containerClass}>
      <div className={frontClass} data-content={frontTextFromData}>{frontTextFromData}</div>
      <div className={backClass} data-content={backTextFromData}>{backTextFromData}</div>
    </div>
  )
}

export default Index;
