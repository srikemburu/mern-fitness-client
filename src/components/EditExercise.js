import React, { useState, useEffect, useRef} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getTheExercise, editExercise, getMembers } from '../services/fitness-api'

export default function EditExercise() {
  const {id} = useParams()
  const nav = useNavigate()  
  const [exercise, setExercise] = useState({})
  const [members, setMembers] = useState([])

  const [selectedName, setSelectedName] = useState()

   const inputNameRef = useRef(null)  // ref is used to get a reference to a DOM element

  // Add the list of exercises to the state. Set selectedName to userName.
  useEffect(() => {
    getTheExercise(id)
    .then(res => res.json())
    .then(res => setExercise(res))
    setSelectedName(exercise.userName) 
  },[exercise.userName])             // Only re-run the effect if userName changes

  var prevDate = exercise.date && exercise.date.substring(0,10)  // Get date in YYYY-MM-DD format
 
    // Add the list of members to the state
    useEffect(() => {
      getMembers()
      .then(res => res.json())
      .then(res => setMembers(res))
  },[])   // An empty array ([]) as a second argument tells React that your effect doesn’t depend on any values from props or state, so it never needs to re-run.

  var todayDate = new Date().toISOString().slice(0, 10)   // Set today date as max date on SELECT
 
  // Update record in Mongo DB
  const editTheExercise = e => {
     e.preventDefault()
    const editedExercise = {userName: selectedName,
                            description: e.target.description.value,
                            duration: e.target.duration.value,
                            date: e.target.date.value}
    editExercise(editedExercise,id)
    nav('/')
  }

  const mystyle = {
    color: "white",
    backgroundColor: "DodgerBlue",
    padding: "10px",
    fontFamily: "Arial",
    marginLeft: "0px",
    marginRight: "800px"
  };

  return (
    <div className="form-margin" style={mystyle}>
      <h3>Edit Exercise Log</h3><br/>
      <form onSubmit={editTheExercise}>
       
       <div className="form-group">
            <label>Member name: </label><br/>
            <select ref={inputNameRef}
                    required
                    style={{width:"200px", height:"30px"}}          
                    // pass state NOT function setState as a value prop
                    value={selectedName}                 
                    onChange={() => setSelectedName(inputNameRef.current.value)}
            >
                    {/* Populate the dropdown list*/}
                    { 
                      members.map(function(member) {
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
          <label>Description: </label><br/>
          <input type='text' 
          name='description' 
          defaultValue={exercise.description} 
          required/>
        </div><br/> 

        <div className="form-group">
          <label>Duration(in minutes): </label><br/>
          <input type='number' 
          name='duration' 
          defaultValue={exercise.duration} 
          required/>
        </div><br/>

        <div className="form-group">
          <label>Date: </label><br/>
          <input type='date' 
          name='date' 
          defaultValue={prevDate} 
          max={todayDate} 
          style={{ width: "200px" }}
          required/>
        </div><br/><br/>

        <div className="form-group">
          <input type='submit' 
          value="Edit Exercise Log" 
          className="btn btn-primary"/>
        </div>

      </form>
    </div>  
  )
}
