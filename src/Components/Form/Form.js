import React, { useState } from "react";
import Test from "../Test/Test";
import Eventtype from "../Eventtype/Eventtype";
import "./Form.css"; // Assuming the CSS file is linked here
import Nav from "../Nav/Nav";

function Form() {
  const [page, setPage] = useState(0);
  const FormTitles = ["Show Room", "Slot", "Other"];
  const [formData, setFormData] = useState({
    eventtype:"",
    showroom: "",
    selectedDate: "",
    slot: "",

  });
  const [errors, setErrors] = useState({});

  const validateStep = () => {
    const newErrors = {};
    if (page === 0) {
      if (!formData.showroom) newErrors.showroom = "showroom is required";
      if (!formData.eventtype) newErrors.eventtype = "Eventtype is required";

    } else if (page === 1) {
      if (!formData.selectedDate) newErrors.selectedDate = "Date is required";
      if (formData.selectedDate && !formData.slot) newErrors.slot = "Slot is required";



    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const PageDisplay = () => {
    if (page === 0) {
      return <Eventtype formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />;
    } else if (page === 1) {
      return <Test formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />;
    } else {
      return <Eventtype formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />;
    }
  };

  return (
    <><Nav />
      <div className="form">
        <div className="form-container">
          {/* Progress Step */}
          <div className="progressbar">
            {FormTitles.map((title, index) => {
              // Log the current title and index

              return (
                <div key={index} className="step-container">
                  <div
                    className={`step ${page > index ? "completed" : ""} ${page === index ? "active" : ""}`}
                  >
                    <span>{page > index ? "✔" : index + 1}</span> {/* Show checkmark for completed steps */}
                    <p>{title}</p>
                  </div>
                </div>
              );
            })}
          </div>



          {/* Form Title */}
          <div className="header">
            <h1>{FormTitles[page]}</h1>
          </div>

          {/* Form Body */}
          <div className="body">{PageDisplay()}</div>


          {/* Navigation Buttons */}
          <div className="footer">
            <button disabled={page === 0} onClick={() => setPage((currPage) => currPage - 1)}>
              Back
            </button>
            <button
              onClick={() => {
                if (page === FormTitles.length - 1) {
                  if (validateStep()) {
                    alert("FORM SUBMITTED");
                    console.log(formData);
                  }
                } else {
                  if (validateStep()) {
                    setPage((currPage) => currPage + 1);
                  }
                }
              }}
            >
              {page === FormTitles.length - 1 ? "Book a Slot" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Form;
