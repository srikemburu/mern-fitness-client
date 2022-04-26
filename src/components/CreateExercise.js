import React, { useState, useEffect } from 'react'
import {useNavigate} from "react-router-dom"
import { createExercise, getMembers } from '../services/fitness-api'

// import DatePicker from 'react-date-picker'
// import "react-date-picker/dist/DatePicker.css"
// import "react-calendar/dist/Calendar.css"

// import "react-date-picker/dist/react-date-picker.css"
// import 'bootstrap/dist/css/bootstrap.min.css';



function CreateExercise() {
  const nav = useNavigate()
//  const [selectedDate, setSelectedDate] = useState(new Date())

  const [members, setMembers] = useState([])

  useEffect(() => {
    getMembers()
    .then(res => res.json())
    .then(res => setMembers(res))
},[])

  console.log("members: ", members)

  const names = members.map(member => member.userName)

  // const [member, setMember] = useState({'member': 'test user'})
  // setMember('test user')

  //const date = new Date()
  var todayDate = new Date().toISOString().slice(0, 10)

  // const handleSelectedDate = (date) => {
  //   setSelectedDate(date)
  // }

  const newExercise = e => {
    e.preventDefault()
    
    const exercise = {userName: document.querySelector('#uName').value,
    description: document.querySelector('#desc').value,
    duration: document.querySelector('#dur').value,
    date: document.querySelector('#date').value}

    // const exercise = {userName: e.target.value,
    // description: document.querySelector('#desc').value,
    // duration: document.querySelector('#dur').value,
    // date: document.querySelector('#date').value}


    // date: selectedDate}
    // console.log("New Exercise: ", exercise)

    createExercise(exercise)

    nav('/add')
  }

  const onChangeUsername = e => {
    
      const userName =  e.target.value
    
  }

  return (
   
    <div>
      <h3>Create New Fitness Log</h3>  
      <form onSubmit={newExercise}>

      {/* <select 
              required
              className="form-control"
              value={names}
              onChange={onChangeUsername}>
                          
          </select>  */}

          {/* {
              members.users.map(function(user) {
                return <option 
                  key={user}
                  value={user}>{user}
                  </option>;
          } */}



        <input type='text' name='userName' id='uName' placeholder='Member Name' required/><br/>
        <input type='text' name='description' id='desc' placeholder='Description' required/><br/>
        <input type='number' name='duration' id='dur' min = "10" placeholder='Duration in minutes' required/><br/>
        <input type='date' name='date' id='date' placeholder='Date'  min = '2022-04-01' max = {todayDate}  required/><br/><br/>

        {/* <DatePicker
            selected={selectedDate}
            maxDate={new Date()}
            onChange={handleSelectedDate}
          /> <br/><br/> */}

          <input type='submit' value="Create Fitness Log" max = {new Date()} className="btn btn-primary"/>

      </form>
    </div>
  )
}

export default CreateExercise