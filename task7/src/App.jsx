import { useState } from "react";
import "./App.css";
import FunctionComponent from "./components/FunctionComponent";
import ClassComponent from "./components/ClassComponent";
import EventExample from "./components/EventExample";
import FormExample from "./components/FormExample";

function App() {
  const [appClicks, setAppClicks] = useState(0)
  return (
    <div>
      <h1>React Components Demo</h1>
      <button onClick={() => setAppClicks(appClicks + 1)}>
        App Clicks: {appClicks}
      </button>
      <hr />
      <FunctionComponent name="Rahul" course="Computer Science" year="3" college="ABC Engineering" />
      <ClassComponent teacher="Dr Sharma" subject="React Development" experience="10" />
      <EventExample />
      <FormExample />
    </div>
  )
}
export default App
