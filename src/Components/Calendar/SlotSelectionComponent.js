import React from "react";

const SlotSelectionComponent = ({
  formData,
  setFormData,
  errors,
  setErrors,
  selectedDate,
  bookingData,
  eventData,
  teamData,
}) => {
  const weekday = new Date(selectedDate).toLocaleString("en-us", { weekday: "long" }).toLowerCase();
  const availableSlots = eventData.availability[weekday] || [];
  const bookedSlot = bookingData.find((entry) => entry.date === selectedDate);
  const slotsForDate = bookedSlot ? bookedSlot.slots : {};

  const availableSlotsByTeam = teamData.reduce((result, team) => {
    const bookedSlotsForTeam = slotsForDate[team.name] || [];
    availableSlots.forEach((slot) => {
      if (!bookedSlotsForTeam.includes(slot)) {
        result.push({ id: team.id, slot });
      }
    });
    return result;
  }, []);


  console.log(availableSlotsByTeam);
  
  const uniqueSlots = availableSlotsByTeam.reduce((result, { id, slot }) => {
    if (!result.some((item) => item.slot === slot)) {
      result.push({ id, slot });
    }
    return result;
  }, []);

  const handleSlotSelection = (slot, teamId) => {
    setFormData({
      ...formData,
      slot,
      teamId,
    });

    if (errors.slot) {
      setErrors((prevErrors) => {
        const { slot, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  return (
    <div className="timeslot-wrapper">
      <p>{new Date(selectedDate).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</p>
      <div className="time-slot-container">
        {uniqueSlots.map(({ id, slot }, index) => (
          <button
            key={`${index}-${id}`}
            id={id}
            className={`time-slot ${formData.teamId === id && formData.slot === slot ? "selected" : ""}`}
            onClick={() => handleSlotSelection(slot, id)}
          >
            {slot}
          </button>
        ))}
      </div>
      {errors.slot && <p className="error-message">{errors.slot}</p>}
    </div>
  );
};

export default SlotSelectionComponent;
