import React, { useState, useEffect, useRef} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getTheExercise, editExercise, getMembers } from '../services/fitness-api'

// import DatePicker from 'react-date-picker'
// import "react-date-picker/dist/DatePicker.css"
// import 'bootstrap/dist/css/bootstrap.min.css'


export default function EditExercise() {
  const {id} = useParams()
  const nav = useNavigate()  
  const [exercise, setExercise] = useState({})
  const [members, setMembers] = useState([])

  const [date, setDate] = useState(new Date())
  //const [selName, setSelName] = useState()

   const inputNameRef = useRef(null)  // ref is used to get a reference to a DOM element

  // Add the list of exercises to the state
  useEffect(() => {
    getTheExercise(id)
    .then(res => res.json())
    .then(res => setExercise(res))
  },[])


  //setSelName(exercise.userName)
  var selectedName = exercise.userName

  //const options = { year: 'numeric', month: 'short', day: 'numeric' };
     var localeDate = new Date(exercise.date).toLocaleDateString('fr-CA')
     console.log("type of locale date: ", typeof localeDate)
    console.log("locale date: ", localeDate)

    // var outdate  = localedate.replace(/(..).(..).(....)/, "$3-$1-$2"); 
    // console.log("outdate : ", outdate)

  //   var selectedDate = new Date(exercise.date)
  //  console.log("selected date : ", selectedDate)

 // var selectedDate = new Date(exercise.date).toISOString().split('T')[0]
 
    // Add the list of members to the state
    useEffect(() => {
      getMembers()
      .then(res => res.json())
      .then(res => setMembers(res))
  },[])

   console.log("exercise dot date: ", exercise.date)

  var todayDate = new Date().toISOString().slice(0, 10)
  console.log("type of today date: ", typeof todayDate)
  console.log("today date: ", todayDate)

  const editTheExercise = e => {
    console.log("in editTheExercise")
     e.preventDefault()
    console.log("input ref current value 2: ", inputNameRef.current.value) 
    console.log("e target value: ", e.target.value) 
    //console.log("e target uerName value: ", e.target.userName.value) 


    console.log("selected user name 2: ", selectedName)
    const editedExercise = {userName: selectedName,
                            description: e.target.description.value,
                            duration: e.target.duration.value,
                            date: e.target.date.value}
    editExercise(editedExercise,id)
    nav('/')
  }

  const onChangeUsername = e => {
    //exercise.userName =  e.target.value  
    //setSelName(e.target.value)
    selectedName = e.target.value

    const $select = document.querySelector('#mySelect')

    document.getElementById("mySelect").value = selectedName;
    $select.value = e.target.value

    console.log("$select.value: ", $select.value)
    console.log("selected user name: ", selectedName)
    console.log("input ref current value: ", inputNameRef.current.value) 
  }

  // const onChangeDate = e => {
  //   setDate(e.target.value)
  // }

  const mystyle = {
    color: "white",
    backgroundColor: "DodgerBlue",
    padding: "10px",
    fontFamily: "Arial",
    marginLeft: "0px",
    marginRight: "600px"
  };

  return (
    <div className="form-margin" style={mystyle}>
      <h3>Edit Exercise Log</h3><br/>
      <form onSubmit={editTheExercise}>

      <label>Member name: </label><br/>
       <div className="form-group">
            <select ref={inputNameRef}
                    id="mySelect"
                    required
                    style={{width:"300px"}}
                     appearance="listbox"             
                    className="form-control"
                    value={selectedName}
                    onChange={onChangeUsername}>

                    {/* Populate the dropdown list*/}
                    { 
                      members.map(function(member) {
                      return <option key={member.userName} 
                                      value={member.userName}> 
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
          defaultValue={localeDate} 
          max={todayDate} 
          style={{ width: "300px" }}
          required/>
        </div><br/><br/>

        {/* <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={todayDate}
              onChange={onChangeDate}
            />
          </div>
        </div> */}

        {/* <input type='date' name='date' min='2022-01-01' max = {todayDate} required/><br/><br/> */}

        <div className="form-group">
          <input type='submit' 
          value="Edit Exercise Log" 
          className="btn btn-primary"/>
        </div>

      </form>
    </div>  
  )
}
