import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Final from "./Components/Final/Final";
import Slider from "./Components/Slider/Slider";
import './App.css'
import Incons from './Components/Icons/Incons';
import Popular from './Components/Popular/Popular';
import Form from './Components/Form/Form';


function App() {


  
  return (
    <div>
      <Router>

        <Routes>
          <Route path="/" element={<>

          <Form/>
          


   
          </>} />
        </Routes>
        
      </Router>
    </div>
  );
}
          {/* <Final/>
          <Slider/>  
          <Incons/>     
          <Popular/>      */}
export default App;
