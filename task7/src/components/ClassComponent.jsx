import React,{Component} from "react"

class ClassComponent extends Component{

  constructor(props){
    super(props)

    this.state={
      salary:50000,
      rating:4
    }
  }

  increaseSalary = ()=>{
    this.setState({
      salary:this.state.salary+5000
    })
  }

  increaseRating = ()=>{
    this.setState({
      rating:this.state.rating+1
    })
  }

  render(){

    return(

      <div>

        <h2>Class Component</h2>

        <p>Teacher: {this.props.teacher}</p>
        <p>Subject: {this.props.subject}</p>
        <p>Experience: {this.props.experience} years</p>

        <p>Salary: {this.state.salary}</p>
        <p>Rating: {this.state.rating}</p>

        <button onClick={this.increaseSalary}>
          Increase Salary
        </button>

        <button onClick={this.increaseRating}>
          Increase Rating
        </button>

        <hr/>

      </div>

    )
  }

}

export default ClassComponent
