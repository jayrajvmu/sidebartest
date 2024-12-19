import React, { useState, useEffect  } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import default styles
import "./Test.css"; // Custom styles

const Test = ({ formData, setFormData, errors, setErrors }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [activeStartDate, setActiveStartDate] = useState(new Date()); // Controls the displayed month



  const bookingData = [
    {
      date: "2024-11-22",
      slot: ["10am"],
    },
    {
      date: "2024-11-23",
      slot: ["10am", "2pm"],
    },
    {
      date: "2024-12-01",
      slot: ["10am"],
    },
  ];

  const eventData = {
    name:"Site Masking",
    buffer:"2hr",
    duration:"3hr",
    availablity:{
      monday:['10am', '2am'],
      tuesday:['10am', '2am'],
      wednesday:['10am', '2am'],
      thursday:['10am', '2am'],
      friday:['10am', '2am'],
      saturday:['10am', '2am'],
      sunday:['10am', '2am']
    }
  }

  const availableDatesObj = [
    {
      date: "2024-11-22",
      slot: ["12pm"],
      buffer:'2hr'
    },
    {
      date: "2024-11-23",
      slot: ["09am", "2pm"],
      buffer:'2hr'
    },
    {
      date: "2024-12-01",
      slot: ["10am"],
      buffer:'2hr'
    },

    {
      date: "2024-12-02",
      slot: ["10am", "2pm"],
      buffer:'2hr'
    },
    {
      date: "2024-12-07",
      slot: ["10am", "2pm"],
      buffer:'2hr'
    },
    {
      date: "2024-12-11",
      slot: ["10am", "2pm"],
      buffer:'2hr'
    },
    {
      date: "2024-12-15",
      slot: ["10am", "2pm"],
      buffer:'2hr'
    },
    {
      date: "2025-01-01",
      slot: ["10am", "2pm"],
      buffer:'2hr'
    },
    {
      date: "2025-01-04",
      slot: ["10am", "2pm"],
      buffer:'2hr'
    },
    {
      date: "2025-01-23",
      slot: ["10am", "2pm"],
      buffer:'2hr'
    },
  ];
  
  // const availableDates = availableDatesObj.map((item) => item.date);

  const calculateBufferEndTime = (slotTime, buffer) => {
    const [hour, modifier] = slotTime.split(/(am|pm)/i);
    let slotHour = parseInt(hour);
    if (modifier.toLowerCase() === "pm" && slotHour !== 12) {
        slotHour += 12;
    }
    if (modifier.toLowerCase() === "am" && slotHour === 12) {
        slotHour = 0;
    }

    const today = new Date();
    const slotDateTime = new Date();
    slotDateTime.setHours(slotHour, 0, 0, 0); // Set hours, minutes, seconds, ms

    // Calculate buffer end time
    slotDateTime.setHours(slotDateTime.getHours() - parseInt(buffer));
    return slotDateTime;
};

const currentTime = new Date();
const todayDateString = currentTime.toISOString().split("T")[0];

const filteredDatesObj = availableDatesObj
    .map((item) => {
        let validSlots;

        if (item.date === todayDateString) {
            // Apply buffer time logic for today
            validSlots = item.slot.filter((slot) => {
                const bufferEndTime = calculateBufferEndTime(slot, item.buffer);
                return currentTime < bufferEndTime; // Ensure current time is before the buffer end time
            });
        } else {
            // For future dates, all slots are valid
            validSlots = item.slot;
        }
        return { ...item, slot: validSlots }; // Return updated object with valid slots
    })
    .filter((item) => item.slot.length > 0); // Remove dates without any valid slots
const availableDates = filteredDatesObj.map((item) => item.date);


  // Check if the given date is in the past
  const isPastDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to midnight local time
    return date < today;
  };

  // Check if the date is available for booking
  const isAvailableDate = (date) => {
    const localDate = new Date(date);
    localDate.setHours(0, 0, 0, 0); // Normalize time to midnight
    const dateString = localDate.toLocaleDateString(); // Format in YYYY-MM-DD

    const availableDateStrings = availableDates.map((d) =>
      new Date(d).toLocaleDateString()
    );
    return availableDateStrings.includes(dateString);
  };

  // Check if the date is today
  const isToday = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to midnight local time
    return date.getTime() === today.getTime();
  };

  // Calculate 60 calendar days from today
  const getMaxDate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to midnight local time
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 60); // Add 60 calendar days
    return maxDate;
  };

  const maxDate = getMaxDate();

  // Check if the date is within the allowed future limit
  const isFutureWithinLimit = (date) => {
    return date <= maxDate;
  };

  // Check if the date is available for booking
  const isAvailableForBooking = (date) => {
    return (
      !isPastDate(date) && isFutureWithinLimit(date) && isAvailableDate(date)
    );
  };

  // Function to determine the tile's class
  const tileClassName = ({ date }) => {
    let className = "";

    // Add "today-date" if it's today
    if (isToday(date)) {
      className += " today-date ";
    }

    // Add "available-date" if it's available for booking
    if (isAvailableForBooking(date)) {
      className += " available-date ";
    }

    // Add "past-date" if it's in the past
    if (isPastDate(date)) {
      className += " past-date ";
    }

    // Add "weekend-date" if it's Saturday or Sunday
    if (date.getDay() === 6 || date.getDay() === 0) {
      className += " weekend-date ";
    }

      // Add "selected-date" class for previously selected dates
  const selectedDate = formData.selectedDate;
  if (selectedDate) {
    const formattedDate = new Date(selectedDate);
    formattedDate.setHours(0, 0, 0, 0); // Normalize time to midnight
    if (date.getTime() === formattedDate.getTime()) {
      className += " selected-date "; // Add a special class for the selected date
    }
  }


    return className.trim(); // Return combined class names
  };
  const handleDateChange = (date) => {
    formData.slot=""; // removeing slot when user change date after selct slot
    const formattedDate = date.toLocaleDateString("en-CA"); // Format date as YYYY-MM-DD
    setSelectedDate(formattedDate);
    setFormData({ ...formData, selectedDate: formattedDate });

    // Remove the error if it exists
    if (errors.selectedDate) {
      setErrors((prevErrors) => {
        const { selectedDate, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  const handleSlotSelection = (slot) => {
    setFormData({
      ...formData,
      slot: slot, // Update the slot in formData
    });
  
    // Optional: Clear error for slot selection if it exists
    if (errors.slot) {
      setErrors((prevErrors) => {
        const { slot: _, ...rest } = prevErrors;
        return rest;
      });
    }
  };


  const formatDatetoday = (dateString) => {
    const date = new Date(dateString); // Convert string to Date object
    const options = { weekday: "long", month: "long", day: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  useEffect(() => {
    if (formData.selectedDate) {
      const selected = new Date(formData.selectedDate);
      setActiveStartDate(new Date(selected.getFullYear(), selected.getMonth(), 1)); // Set to the first day of the selected month
    }
  }, [formData.selectedDate]);

  const handleActiveStartDateChange = ({ activeStartDate }) => {
    setActiveStartDate(activeStartDate); // Update activeStartDate when navigating months
  };
  return (
    <div className="calendar-container">
      <Calendar
        onChange={handleDateChange}
        value={selectedDate ? new Date(selectedDate) : null }
        tileDisabled={({ date }) =>
          isPastDate(date) ||
          !isAvailableDate(date) ||
          !isFutureWithinLimit(date)
        } // Disable past, unavailable, and out-of-range dates
        tileClassName={tileClassName}
        minDate={new Date()} // Disable past dates by setting minDate to today
        maxDate={maxDate} // Limit future dates to 60 calendar days
        view="month" // Show the month view
        next2Label={null} // Disable "next" month navigation
        prev2Label={null} // Disable "previous" month navigation
        activeStartDate={activeStartDate} 
        onActiveStartDateChange={handleActiveStartDateChange}
      />

      <div>
      {formData.selectedDate && (
  <div className="timeslot-wrapper">
    <p>{formatDatetoday(formData.selectedDate)}</p>

    {console.log(formData.selectedDate)
    }



<div className="time-slot-container">
{filteredDatesObj
    .filter((item) => item.date === formData.selectedDate) // Find the object for the selected date
    .flatMap((item) => item.slot) // Extract the slots for the selected date
    .map((slot, index) => ( // Render a button for each slot
        <button
            key={index} // Unique key for each button
            className={`time-slot ${formData.slot === slot ? "selected" : ""}`}
            onClick={() => handleSlotSelection(slot)}
        >
            {slot}
        </button>
    ))}
</div>


    
    {errors.slot && (
          <p className="error-message">{errors.slot}</p>
        )}
  </div>
)}
        {errors.selectedDate && (
          <p className="error-message">{errors.selectedDate}</p>
        )}
       
      </div>
    </div>
  );
};

export default Test;
