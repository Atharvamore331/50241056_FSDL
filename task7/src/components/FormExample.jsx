import { useState } from "react";

function FormExample(){

  const [form,setForm] = useState({
    name:"",
    email:"",
    course:"",
    city:""
  })

  const handleChange = (e)=>{

    setForm({
      ...form,
      [e.target.name]:e.target.value
    })

  }

  const handleSubmit = (e)=>{

    e.preventDefault()

    alert(
      "Name: "+form.name+
      "\nEmail: "+form.email+
      "\nCourse: "+form.course+
      "\nCity: "+form.city
    )

  }

  return(

    <div>

      <h2>Form Example</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Enter name"
          onChange={handleChange}
        />

        <br/><br/>

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          onChange={handleChange}
        />

        <br/><br/>

        <input
          type="text"
          name="course"
          placeholder="Enter course"
          onChange={handleChange}
        />

        <br/><br/>

        <input
          type="text"
          name="city"
          placeholder="Enter city"
          onChange={handleChange}
        />

        <br/><br/>

        <button type="submit">
          Submit Form
        </button>

      </form>

      <hr/>

    </div>

  )
}

export default FormExample
