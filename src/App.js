import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Final from "./Components/Final/Final";
import Slider from "./Components/Slider/Slider";
import './App.css'
import Incons from './Components/Icons/Incons';
import Popular from './Components/Popular/Popular';
import Form from './Components/Form/Form';
import Wrap from './Components/Wrap/Wrap';
// import GeneratePDF from './Components/PDF/GeneratePDF';
import DataTable from './Components/DataTable/DataTable';

import Check from './Components/Check/Check';

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

  const headers = ["SI.No", "Materials", "Quantity", "Unit", "Remarks"];
  const data = [
    { si_no: 1, materials: "Material A", quantity: 10, unit: "Kg", remarks: "Good" },
    { si_no: 2, materials: "Material B", quantity: 20, unit: "L", remarks: "Average" },
    { si_no: 3, materials: "Material C", quantity: 15, unit: "Sets", remarks: "Excellent" },
  ];

  
  return (
    <div>
      <Router>
      {/* <GeneratePDF headerImage={headerImage} footerImage={footerImage} data={deliveryData} headingTextContent={"DELIVERY CHALLAN"} /> */}

      <DataTable headers={headers} data={data} />

        <Routes>
          <Route path="/" element={<>
            
          </>} />

          <Route path="/check" element={<>

          <Check/>
            
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
