import React, { useState, useEffect, useRef } from 'react'
import {useNavigate} from "react-router-dom"
import { createExercise, getMembers } from '../services/fitness-api'
import '../index.css'

function CreateExercise() {
  const nav = useNavigate()
  const [members, setMembers] = useState([])
  const inputRef = useRef()  // ref is used to get a reference to a DOM element

  // Add the list of members to the state
  useEffect(() => {
    getMembers()
    .then(res => res.json())
    .then(res => setMembers(res))
},[])

  const todayDate = new Date().toISOString().slice(0, 10)  // Used to set Max date
  var selectedDate = new Date().toISOString().slice(0, 10)  // Date selected by user
  
  const newExercise = e => {
      e.preventDefault()   // prevents the default HTML form submit behavior from taking place.  
      const exercise = {userName: inputRef.current.value,
      description: document.querySelector('#desc').value,
      duration: document.querySelector('#dur').value,
      date: selectedDate
    }

  createExercise(exercise)
  nav('/')
  }
  const onChangeDate = e => {
    selectedDate =  e.target.value  
  }

  const mystyle = {
    color: "white",
    backgroundColor: "#5B5EA6",
    padding: "10px",
    fontFamily: "Arial",
    marginLeft: "0px",
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
                  style={{width:"200px", height:"30px"}}
          >
                  {/* Populate the dropdown list*/}
                  { members.map(function(member) {
                      return <option key={member.userName} 
                                    value={member.userName}
                             > 
                                {member.userName} 
                            </option>;
                    })
                  } 
          </select> 
        </div>

        <div className="form-group">
          <input type='text' 
          name='description' 
          id='desc' 
          placeholder='Description' 
          style={{ width: "200px" }}
          required/><br/>
        </div>

        <div className="form-group">
          <input type='number' 
          name='duration' 
          id='dur' 
          min = "10" 
          placeholder='Duration in minutes' 
          style={{ width: "200px" }}
          required/><br/>
        </div>

        <div className="form-group">
          <input type='date' 
          name='date' 
          id='date' 
          onChange={onChangeDate}
          max={todayDate} 
          style={{ width: "200px" }}
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