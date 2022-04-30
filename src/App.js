
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import './index.css';

import Navbar from './components/Navbar';
import CreateExercise from './components/CreateExercise';
import CreateMember from './components/CreateMember';
import EditExercise from './components/EditExercise';
import ExerciseList from './components/ExerciseList';

function App() {
  return (
    <div className="container">
    <Router>
      <Navbar />
      <br/>
      <Routes>
        <Route path="/" element={<ExerciseList/>} />
        <Route path="/create" element={<CreateExercise/>} />
        <Route path="/member" element={<CreateMember/>} />
        <Route path="/edit/:id" element={<EditExercise/>} /> 
      </Routes>
    </Router>
    </div>
  )
}

export default App;
