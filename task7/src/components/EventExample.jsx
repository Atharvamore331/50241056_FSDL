import { useState } from "react";

function EventExample(){

  const [count,setCount] = useState(0)
  const [message,setMessage] = useState("")

  const increase = ()=>{
    setCount(count+1)
  }

  const decrease = ()=>{
    setCount(count-1)
  }

  const showMessage = ()=>{
    setMessage("Button Clicked!")
  }

  return(

    <div>

      <h2>Event Example</h2>

      <p>Counter: {count}</p>

      <button onClick={increase}>Increase</button>

      <button onClick={decrease}>Decrease</button>

      <button onClick={showMessage}>Show Message</button>

      <p>{message}</p>

      <hr/>

    </div>

  )
}

export default EventExample
