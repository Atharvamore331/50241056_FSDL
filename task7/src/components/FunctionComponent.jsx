import { useState } from "react";

function FunctionComponent(props){

  const [likes,setLikes] = useState(0)

  const increaseLikes = ()=>{
    setLikes(likes+1)
  }

  return(

    <div>

      <h2>Function Component</h2>

      <p>Student Name: {props.name}</p>
      <p>Course: {props.course}</p>
      <p>Year: {props.year}</p>
      <p>College: {props.college}</p>

      <p>Likes: {likes}</p>

      <button onClick={increaseLikes}>
        Like Student
      </button>

      <hr/>

    </div>

  )
}

export default FunctionComponent
