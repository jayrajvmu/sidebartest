import React, { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css'; // Import default styles

const Test = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  // Example of excluded dates
  const excludedDates = [
    "2024-11-25", // Specific date to disable
  ];

  const isPastDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to midnight
    return date < today;
  };

  const isExcludedDate = (date) => {
    const dateString = date.toISOString().split("T")[0];
    return excludedDates.includes(dateString);
  };

  const isToday = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to midnight
    return date.getTime() === today.getTime();
  };

  // Calculate 60 calendar days from today
  const getMaxDate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to midnight
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 60); // Add 60 calendar days
    return maxDate;
  };

  const maxDate = getMaxDate();

  const isFutureWithinLimit = (date) => {
    return date <= maxDate;
  };

  const isAvailableDate = (date) => {
    return !isPastDate(date) && isFutureWithinLimit(date) && !isExcludedDate(date);
  };

  return (
    <div>
      <h1>Slot Booking</h1>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileDisabled={({ date }) =>
          isPastDate(date) || isExcludedDate(date) || !isFutureWithinLimit(date)
        } // Disable past, excluded, and out-of-range dates
        tileClassName={({ date }) =>
          isToday(date)
            ? "today-date"
            : isAvailableDate(date)
            ? "available-date"
            : isExcludedDate(date)
            ? "excluded-date"
            : isPastDate(date)
            ? "past-date"
            : null
        }
        minDate={new Date()} // Disable past dates by setting minDate to today
        maxDate={maxDate} // Limit future dates to 60 calendar days
        view="day" // Show only the date view, hide month/year view
        next2Label={null} // Disable "next" month navigation
        prev2Label={null} // Disable "previous" month navigation
      />
      <style>
        {`
          .available-date {
            background-color: #90ee90; /* Light green */
            border-radius: 50%;
            color: black;
          }
          .excluded-date {
            background-color: #ffcccb; /* Light red */
            border-radius: 50%;
            color: black;
            pointer-events: none; /* Make it unclickable */
            opacity: 0.6;
          }
          .past-date {
            background-color: #d3d3d3; /* Light gray */
            border-radius: 50%;
            color: black;
            pointer-events: none; /* Make it unclickable */
            opacity: 0.6;
          }
          .today-date {
            background-color: #add8e6; /* Light blue */
            border: 2px solid #0000ff; /* Blue border */
            border-radius: 50%;
            color: black;
            font-weight: bold;
          }
        `}
      </style>
      <div>
        {selectedDate && (
          <p>
            You selected: <strong>{selectedDate.toDateString()}</strong>
          </p>
        )}
      </div>

      {availableSlotsByTeam &&
  (() => {
    // Step 1: Collect all unique slots from all teams
    const allUniqueSlots = [
      ...new Set(
        Object.values(availableSlotsByTeam)
          .flatMap((team) => team.slots)
      )
    ];

    console.log(allUniqueSlots);
    

    // Step 2: Track which slots have already been rendered
    const renderedSlots = new Set();

    // Step 3: Render the slots
    return Object.keys(availableSlotsByTeam).map((teamKey) => {
      const teamInfo = availableSlotsByTeam[teamKey];
      const teamSlots = teamInfo.slots;

      return (
        <>
          {allUniqueSlots.map((slot, index) => {
            // Only render slots that the team has and haven't been rendered yet
            if (teamSlots.includes(slot) && !renderedSlots.has(slot)) {
              renderedSlots.add(slot);  // Mark this slot as rendered
              return (
                <button
                key={teamInfo.id+slot+index}
                id={teamInfo.id}
                  className={`time-slot ${
                    formData.teamId === teamInfo.id && formData.slot === slot
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => handleSlotSelection(slot, teamInfo.id)}
                >
                  {slot}
                </button>
              );
            }
            return null;
          })}
        </>
      );
    });
  })()}

    </div>
  );
};

export default Test;