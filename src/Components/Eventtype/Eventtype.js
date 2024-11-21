import React from "react";
import "./Eventtype.css";

function Eventtype({ formData, setFormData, errors, setErrors }) {
  const handleInputChange = (field, value) => {
    // Update formData
    setFormData({ ...formData, [field]: value });

    // Remove the specific error for the field if it exists
    if (errors[field]) {
      setErrors((prevErrors) => {
        const { [field]: _, ...rest } = prevErrors; // Exclude the specific error
        return rest; // Return the rest of the errors
      });
    }
  };

  return (
    <div className="form-section">

<div className={`form-group ${errors.eventtype ? "error" : ""}`}>
  <label>Event Type</label>
  <select
    value={formData.eventtype}
    onChange={(event) => handleInputChange("eventtype", event.target.value)}
  >
    <option value="">Select your nationality</option>
    <option value="usa">United States</option>
    <option value="india">India</option>
    <option value="uk">United Kingdom</option>
    <option value="canada">Canada</option>
  </select>
  {errors.eventtype && (
    <p className="error-message">{errors.eventtype}</p>
  )}
   </div>


   
   <div className={`form-group ${errors.showroom ? "error" : ""}`}>
  <label>Showroom</label>
  <select
    value={formData.showroom}
    onChange={(event) => handleInputChange("showroom", event.target.value)}
  >
    <option value="">Select your nationality</option>
    <option value="usa">United States</option>
    <option value="india">India</option>
    <option value="uk">United Kingdom</option>
    <option value="canada">Canada</option>
  </select>
  {errors.showroom && (
    <p className="error-message">{errors.showroom}</p>
  )}
   </div>

    </div>
  );
}

export default Eventtype;
