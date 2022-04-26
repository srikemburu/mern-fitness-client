
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import Navbar from './components/Navbar';
import CreateExercise from './components/CreateExercise';
import CreateMember from './components/CreateMember';
import DeleteExercise from './components/DeleteExercise';
import EditExercise from './components/EditExercise';
import ExerciseList from './components/ExerciseList';
import ShowExercise from "./components/ShowExercise";


function App() {
  return (
    <div className="classname">
    <Router>
      <Navbar />
      <br/>
      <Routes>
        <Route path="/" element={<ExerciseList/>} />
       
        <Route path="/create" element={<CreateExercise/>} />
        <Route path="/member" element={<CreateMember/>} />
        <Route path="/:id" element={<ShowExercise/>} />
        <Route path="/delete/:id" element={<DeleteExercise/>} />
        <Route path="/edit/:id" element={<EditExercise/>} />
       
      </Routes>
    </Router>
    </div>
  )
}

export default App;
