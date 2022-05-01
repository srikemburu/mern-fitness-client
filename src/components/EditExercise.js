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
  const [selectedName, setSelectedName] = useState(null)

   const inputNameRef = useRef(null)  // ref is used to get a reference to a DOM element

  // Add the list of exercises to the state
  useEffect(() => {
    getTheExercise(id)
    .then(res => res.json())
    .then(res => setExercise(res))
  },[])

  ////setSelectedName(exercise.userName)  CAUSING TOO MANY RE-RENDERS
  // var selectedName = exercise.userName

    var prevDate = exercise.date && exercise.date.substring(0,10)
 
    // Add the list of members to the state
    useEffect(() => {
      getMembers()
      .then(res => res.json())
      .then(res => setMembers(res))
  },[])

  var todayDate = new Date().toISOString().slice(0, 10)
 
  const editTheExercise = e => {
    console.log("in editTheExercise")
    const filledName = selectedName? selectedName : "Sri";
     e.preventDefault()
    console.log("input ref current value 2: ", inputNameRef.current.value) 
    console.log("e target value: ", e.target.value) 
    //console.log("e target uerName value: ", e.target.userName.value) 


    console.log("filledName: ", filledName)
    console.log("selected user name 2: ", selectedName)
    console.log("e.target.date: ", e.target.date.value )
    const editedExercise = {userName: filledName,
                            description: e.target.description.value,
                            duration: e.target.duration.value,
                            date: e.target.date.value}
    editExercise(editedExercise,id)
   // nav('/')
  }

  const OnChangeUsername = e => {
   // setSelectedName(e.target.value)

  //  const { name, value } = e.target;
  //       console.log(`handleChange event: ${e.target.value}`);

    console.log("onchangeUserName e.target.value: ", e.target.value)
        // setSelectedName(e.target.value) 
                  

    // useEffect(() => {
    //   setSelectedName(inputNameRef.current.value) 
    // },[])

    //exercise.userName =  e.target.value 
    // selectedName = e.target.value
    console.log("onchangeUserName selectedName: ", selectedName)
    console.log("onchangeUserName input ref current value: ", inputNameRef.current.value) 
  }

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
                    //required
                    style={{width:"300px"}}          
                    // className="form-control" // hiding arrows on dropdown
                    value={exercise.userName}
                  // onChange={OnChangeUsername}

                    onChange={() => setSelectedName(inputNameRef.current.value)}


                   // eslint-disable-next-line react/jsx-no-duplicate-props
                  //  onChange={useEffect(() => {setSelectedName(inputNameRef.current.value) }, [] ) }
            >

                    {/* Populate the dropdown list*/}
                    { 
                      members.map(function(member, index) {
                      // if (index === 0) { setSelectedName(member.userName)}
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
          defaultValue={prevDate} 
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

        <div className="form-group">
          <input type='submit' 
          value="Edit Exercise Log" 
          className="btn btn-primary"/>
        </div>

      </form>
    </div>  
  )
}
