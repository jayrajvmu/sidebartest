import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Final from "./Components/Final/Final";
import Slider from "./Components/Slider/Slider";
import './App.css'
import Incons from './Components/Icons/Incons';
import Popular from './Components/Popular/Popular';
import Form from './Components/Form/Form';
import Wrap from './Components/Wrap/Wrap';
import GeneratePDF from './Components/PDF/GeneratePDF';

import {footeri, headeri} from "./assets/image"


function App() {


 const  deliveryData = {
    date: new Date(),
    site_supervisor:"Test",
    project_manager:"Jega",
    challan_number:"DC1576",
    client_name:"Jayaraj M",


    items:[
      { materials: '0 CRANK HINGES ( NORMAL CLOSE )', quantity: 21, unit: "Sets", remarks:"Something" },
      { materials: '0 CRANK HINGES ( SOFT CLOSE )', quantity: 21, unit: "Sets", remarks:"Something" },
      { materials: '450MM CHANNEL ( SOFT CLOSE )', quantity: 21, unit: "Sets", remarks:"Something" },
      { materials: '0 CRANK HINGES ( NORMAL CLOSE )', quantity: 21, unit: "Sets", remarks:"Something" },
      { materials: 'SL – 16 MECHANISM', quantity: 21, unit: "Sets", remarks:"Something" },
      { materials: 'DRAWER LOCK', quantity: 21, unit: "Sets", remarks:"Something" },
      { materials: 'SL – 16 MECHANISM', quantity: 21, unit: "Sets", remarks:"Something" },



      { materials: '0 CRANK HINGES ( NORMAL CLOSE )', quantity: 21, unit: "Sets", remarks:"Something" },
      { materials: '0 CRANK HINGES ( SOFT CLOSE )', quantity: 21, unit: "Sets", remarks:"Something" },
      { materials: '450MM CHANNEL ( SOFT CLOSE )', quantity: 21, unit: "Sets", remarks:"Something" },
      { materials: '0 CRANK HINGES ( NORMAL CLOSE )', quantity: 21, unit: "Sets", remarks:"Something" },
      { materials: 'SL – 16 MECHANISM', quantity: 21, unit: "Sets", remarks:"Something" },
      { materials: 'DRAWER LOCK', quantity: 21, unit: "Sets", remarks:"Something" },
      { materials: 'SL – 16 MECHANISM', quantity: 21, unit: "Sets", remarks:"Something" },


      { materials: '0 CRANK HINGES ( NORMAL CLOSE )', quantity: 21, unit: "Sets", remarks:"Something" },
      { materials: '0 CRANK HINGES ( SOFT CLOSE )', quantity: 21, unit: "Sets", remarks:"Something" },
      { materials: '450MM CHANNEL ( SOFT CLOSE )', quantity: 21, unit: "Sets", remarks:"Something" },
      { materials: '0 CRANK HINGES ( NORMAL CLOSE )', quantity: 21, unit: "Sets", remarks:"Something" },
      { materials: 'SL – 16 MECHANISM', quantity: 21, unit: "Sets", remarks:"Something" },
      { materials: 'DRAWER LOCK', quantity: 21, unit: "Sets", remarks:"Something" },

    ]
  }




  const headerImage = headeri; // Replace with your actual image URL or base64
  const footerImage = footeri; // Replace with your actual image URL or base64


  
  return (
    <div>
      <Router>
      <GeneratePDF headerImage={headerImage} footerImage={footerImage} data={deliveryData} headingTextContent={"DELIVERY CHALLAN"} />
        <Routes>
          <Route path="/" element={<>
            
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
