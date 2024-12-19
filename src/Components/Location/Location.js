import React from "react";
import "./Location.css";

function Location({ formData, setFormData, errors, setErrors }) {
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

      <div className="form-group">
              <label>Designer Name</label>
              <input
                type="text"
                placeholder="Enter Designer Name"
                value={formData.designername}
                onChange={(event) => handleInputChange("designername", event.target.value)}
              />
            {errors.designername && <p className="error-message">{errors.designername}</p>}
      </div>


      <div className="form-group">
              <label>Client Name</label>
              <input
                type="text"
                placeholder="Enter Client Name"
                value={formData.clientname}
                onChange={(event) => handleInputChange("clientname", event.target.value)}
              />
            {errors.clientname && <p className="error-message">{errors.clientname}</p>}
      </div>


      <div className="form-group">
              <label>Client ID</label>
              <input
                type="text"
                placeholder="Enter Client ID"
                value={formData.clientid}
                onChange={(event) => handleInputChange("clientid", event.target.value)}
              />
            {errors.clientid && <p className="error-message">{errors.clientid}</p>}
      </div>

      <div className="form-group">
              <label>Address of the Property</label>
              <input
                type="text"
                placeholder="Enter Address of the Property"
                value={formData.addressofproperty}
                onChange={(event) => handleInputChange("addressofproperty", event.target.value)}
              />
            {errors.addressofproperty && <p className="error-message">{errors.addressofproperty}</p>}
      </div>


      <div className="form-group">
              <label>Google Location</label>
              <input
                type="url"
                placeholder="Enter Google Location"
                value={formData.googlelocation}
                onChange={(event) => handleInputChange("googlelocation", event.target.value)}
              />
            {errors.googlelocation && <p className="error-message">{errors.googlelocation}</p>}
      </div>





    </div>
  );
}

export default Location;
