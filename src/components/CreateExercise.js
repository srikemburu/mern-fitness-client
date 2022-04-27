import React, { useState, useEffect, useRef } from 'react'
import {useNavigate} from "react-router-dom"
import { createExercise, getMembers } from '../services/fitness-api'


function CreateExercise() {
  const nav = useNavigate()

  const [members, setMembers] = useState([])
  const inputRef = useRef()

  // Add the list of members to the state
  useEffect(() => {
    getMembers()
    .then(res => res.json())
    .then(res => setMembers(res))
},[])

  console.log("members: ", members)

  const names = members.map(member => member.userName)
  console.log("member names: ", names)
  var uName = names[0]

  // const [member, setMember] = useState({'member': 'test user'})
  // setMember('test user')

  //const date = new Date()
  var todayDate = new Date().toISOString().slice(0, 10)

  
  const newExercise = e => {
    e.preventDefault()   // prevents the default HTML form submit behavior from taking place.
    
    // const exercise = {userName: document.querySelector('#uName').value,
    // description: document.querySelector('#desc').value,
    // duration: document.querySelector('#dur').value,
    // date: document.querySelector('#date').value}

    const exercise = {userName: inputRef.current.value,
    description: document.querySelector('#desc').value,
    duration: document.querySelector('#dur').value,
    date: document.querySelector('#date').value}

      console.log(" create date type: ", typeof exercise.date)
    // date: selectedDate}
    // console.log("New Exercise: ", exercise)

    createExercise(exercise)

     nav('/')
  }

  const onChangeUsername = e => {
      var userName =  e.target.value  
      // uName = e.target.value
      console.log("select user name: ", userName)
      console.log("input ref current value: ", inputRef.current.value)
  }

  return (
   
    <div>
      <h3>Create New Fitness Log</h3>  
      <form onSubmit={newExercise}>
      <div className="form-group">
      <label>Member name: </label>
        <select ref={inputRef}
                required
                className="form-control">

                 {/* value={uName}
                 onChange={onChangeUsername} */}

                {
                  names.map(function(member) {
                    return <option 
                      key={member}
                      value={member}>{member}
                      </option>;
                  })
              }                    
          </select> 
      </div>
        
        {/* <input type='text' name='userName' id='uName' placeholder='Member Name' required/><br/> */}

        <div className="form-group">
          <input type='text' name='description' id='desc' placeholder='Description' required/><br/>
        </div>

        <div className="form-group">
          <input type='number' name='duration' id='dur' min = "10" placeholder='Duration in minutes' required/><br/>
        </div>

        <div className="form-group">
          <input type='date' name='date' id='date' placeholder='Date'  min = '2022-01-01' max = {todayDate}  required/><br/><br/>
        </div>

        <div className="form-group">
          <input type='submit' value="Create Fitness Log" max = {new Date()} className="btn btn-primary"/>
        </div>

      </form>
    </div>
  )
}

export default CreateExercise