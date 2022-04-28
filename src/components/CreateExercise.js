import React, { useState, useEffect, useRef } from 'react'
import {useNavigate} from "react-router-dom"
import { createExercise, getMembers } from '../services/fitness-api'
import '../index.css'
// import '../App.css'

function CreateExercise() {
  const nav = useNavigate()
  const [members, setMembers] = useState([])
  const inputRef = useRef()  // ref is used to get a reference to a DOM element
  const inputDateRef = useRef()

  // Add the list of members to the state
  useEffect(() => {
    getMembers()
    .then(res => res.json())
    .then(res => setMembers(res))
},[])

  //const names = members.map(member => member.userName)
  // console.log("member names: ", names)
  // var uName = names[0]

  const todayDate = new Date().toISOString().slice(0, 10)
  var selectedDate = new Date().toISOString().slice(0, 10)
  
  const newExercise = e => {
    e.preventDefault()   // prevents the default HTML form submit behavior from taking place.  
    const exercise = {userName: inputRef.current.value,
    description: document.querySelector('#desc').value,
    duration: document.querySelector('#dur').value,
    // date: document.querySelector('#date').value}
    date: selectedDate
  }

    createExercise(exercise)
    console.log("new exercise: ", exercise)
    //nav('/')
  }
  const onChangeDate = e => {
    selectedDate =  e.target.value  
    console.log("onchange date: ", selectedDate)
    //console.log("inputDateRef.current.value"  , inputDateRef.current.value)
  }

  const mystyle = {
    color: "white",
    backgroundColor: "#5B5EA6",
    padding: "10px",
    fontFamily: "Arial",
    marginLeft: "50px",
    marginRight: "600px"
  };

  return ( 
    <div className="form-margin" style={mystyle}>
      <h3>Create New Fitness Log</h3>  <br/>
      <form onSubmit={newExercise}>

        {/* ref is used to get a reference to a DOM element */}
        <div className="form-group">
          <select ref={inputRef} 
                  required
                  style={{width:"200px"}}
                  appearance="menulist"
                  className="form-control">

                  {/* Populate the dropdown list*/}
                  { members.map(function(member) {
                      return <option key={member.userName} value={member.userName}> {member.userName} </option>;
                    })
                  } 
          </select> 
        </div>

        <div className="form-group">
          <input type='text' 
          name='description' 
          id='desc' 
          placeholder='Description' 
          required/><br/>
        </div>

        <div className="form-group">
          <input type='number' 
          name='duration' 
          id='dur' 
          min = "10" 
          placeholder='Duration in minutes' 
          required/><br/>
        </div>

        <div className="form-group">
          <input type='date' 
          name='date' 
          id='date' 
          value={selectedDate}
          onChange={onChangeDate}
          max={todayDate} 
          required/> <br/><br/>
        </div>

        <div className="form-group">
          <input type='submit' 
          value="Create Fitness Log" 
          className="btn btn-primary"/>
        </div>

      </form>
    </div>
  )
}

export default CreateExercise