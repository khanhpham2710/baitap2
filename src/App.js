import { useEffect, useState } from 'react';
import './App.css';
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css';
import Students from './Components/Students/Students';
import Students2 from "./Components/Students/Students"


function App() {
  return (
    <div>
        <Students />
    </div>
  )
}

export default App;
