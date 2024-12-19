import React from 'react'
import "./Stepper.css"
export default function Stepper() {
    const steps = [
        { label: "Step 1", content: "Personal Details" },
        { label: "Step 2", content: "Slot Details" },
        { label: "Step 3", content: "Final Step" },
      ];

  return (
    <div className='custom-stepper'>

        {
            steps && steps.map((step, index)=>{
                return(
                    <div key={step.label} className='custom-step'>

                        <div className='custom-step-top-icon'>
                            <span>
                            {index+1}
                            </span>
                            </div>
                        <div className='custom-step-top-text'>{step.content}</div>

                    
                    </div>

                );
                
                

            })
        }


    </div>
  )
}
