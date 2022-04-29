import ReactDOM from "react-dom/client";
import FlipClockReact from "./lib";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(<FlipClockReact format={'d天h时m分s秒'} timeline={new Date('2022-04-29 17:30')} />);
