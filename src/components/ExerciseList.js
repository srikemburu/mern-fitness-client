// import React from "react"
import {deleteExercise, getExercises} from '../services/fitness-api'
import {useNavigate, Link} from 'react-router-dom'
import {useState, useEffect} from 'react'

export default function ExerciseList() {
    const nav = useNavigate()
    const[exercises, setExercises] = useState([])
    
    useEffect(() => {
        getExercises()
        .then(res => res.json())
        .then(res => setExercises(res))
    },[])

    //Each exercise item is output with the Exercise component
    // It outputs a table row with the values of the properties of the exercise item passed into the component.
    
    const Exercise = props => {
     return(
        <tr>
            <td>{props.currentexercise.userName}</td>
            <td>{props.currentexercise.description}</td>
            <td>{props.currentexercise.duration}</td>
            <td>{props.currentexercise.date.substring(0,10)}</td> 
            <td>
              <Link to={"/edit/" + props.currentexercise._id}>edit</Link> | <a href="/" onClick={() => {
                props.deleteTheExercise(props.currentexercise._id)
              }}>delete</a>
            </td>
        </tr>
     )}

    const deleteTheExercise = (id) => {
      console.log("in deleteTheExercise:", id)
        deleteExercise(id)

      //   setExercises({
      //     exercises: exercises.filter(el => el._id !== id)
      //   })
      //   // console.log(" filter exercises", exercises)
      //  nav('/')
    }

    // exerList method returns the rows of the table
    const exerList = () => {
      // console.log(" in exerList function")
      // console.log("exrecises: ", exercises)
        return exercises.map((currentexercise) => {
          // console.log("currentExercise: ", currentexercise)
            return <Exercise currentexercise={currentexercise} deleteTheExercise={deleteTheExercise} key={currentexercise._id}/>;
          })
    }

    return (
        <div>
          <h3>Logged Exercises</h3>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Username</th>
                <th>Description</th>
                <th>Duration</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              { exerList() }
            </tbody>
          </table>
        </div>
      )
}

