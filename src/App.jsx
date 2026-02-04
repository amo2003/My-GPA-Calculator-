import { Routes, Route } from "react-router-dom";

import Calculator from "./Pages/Calculator";
import GPA from "./Pages/GPA";



function App() {

  return (
    <Routes>
      <Route path="/" element={<Calculator/>}/>
      <Route path="/gpa" element={<GPA/>}/>

      
     
      
    </Routes> 
  );
}

export default App;
