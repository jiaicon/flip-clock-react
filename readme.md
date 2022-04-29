# 倒计时

参数介绍

| 参数 | 介绍 | 类型 | 是否必填 | 默认值 |
| ---- | ---- | --- | :----: | :----: |
| format | 事件格式化方式 | string | false | d:h:s:ms |
| timeline | 结束时间或执行的时间 | Date、string、number | true | 无 |
| full | 个位数时是否补0 | boolean | false | true |
| divide(未实现) | 是否分离字符 | boolean | false | false |
| classNames | 类名 | string | false | 无 |
| flipperClassNames | 翻页板类名 | string | false | 无 |
| styles | css样式 | CSSProperties | false | 无 |
| flipperStyles | 翻页板css样式 | CSSProperties | false | 无 |
| colonStyles | 中间冒号样式 | CSSProperties | false | 无 |
| colon | 自定义冒号 | (colon: string) => React.ReactNode | false | 无 |
