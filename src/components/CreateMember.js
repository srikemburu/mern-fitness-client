import React from 'react'
import { useNavigate } from "react-router-dom"
import { createMember } from '../services/fitness-api'

function CreateMember() {
  const nav = useNavigate()

  const newMember = e => {
    e.preventDefault()  //prevents the default HTML form submit behavior from taking place.
    const member = {userName: document.querySelector('#uName').value}
    createMember(member)
    nav ('/')
  }

  const mystyle = {
    color: "white",
    backgroundColor: "#DFCFBE",
    padding: "10px",
    fontFamily: "Arial",
    marginLeft: "50px",
    marginRight: "600px"
  };

  return (  
    <div style={mystyle}>
      <h3>Create New Member</h3><br/>
        <form onSubmit={newMember}>
            <div className="form-group">
              <input type='text' name='userName' id='uName'placeholder='Member Name' required/><br/><br/>
            </div>
            <div className="form-group">
                <input type="submit" value="Create Member" className="btn btn-primary" />
            </div>
         </form>
    </div>
    
  )
}

export default CreateMember         