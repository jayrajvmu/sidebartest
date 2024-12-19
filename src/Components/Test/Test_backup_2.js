import React, { useState, useEffect } from "react";
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
    name: "Site Masking",
    buffer: "2hr",
    duration: "3hr",
    availability: {
      monday: ["10am", "2am"],
      tuesday: ["10am", "2am"],
      wednesday: [],
      thursday: ["10am", "2am"],
      friday: ["10am", "2am"],
      saturday: ["10am", "2am"],
      sunday: ["10am", "2am"],
    },
  };

  // Function to generate excluded dates dynamically for future dates
  const generateExcludedDates = (bookingData, eventData) => {
    const excludedDates = [];
    const today = new Date();

  // 1. Check bookingData for fully booked dates
  bookingData.forEach((entry) => {
    // Convert the date to the day of the week (e.g., "friday")
    const weekday = new Date(entry.date).toLocaleString('en-us', { weekday: 'long' }).toLowerCase();

    
    
    // Ensure the day exists in the availability object
    const availableSlots = eventData.availability[weekday];
    



    if (availableSlots && entry.slot && entry.slot.length === availableSlots.length) {
      excludedDates.push(entry.date);  // Add fully booked date
    }
  });
    // 2. Check eventData for days with no slots
    const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    
    daysOfWeek.forEach((day) => {
      if (eventData.availability[day].length === 0) {
        let nextDate = new Date(today); // Start from today
        while (nextDate.getDay() !== daysOfWeek.indexOf(day)) {
          nextDate.setDate(nextDate.getDate() + 1); // Increment day by 1 until it matches the target day
        }

        // Loop to add all future dates of that day to the excluded dates
        while (nextDate <= new Date("2025-12-31")) { // Change this end date as per your range
          const formattedDate = nextDate.toLocaleDateString("en-CA"); // Ensure consistent formatting
          excludedDates.push(formattedDate);
          nextDate.setDate(nextDate.getDate() + 7); // Move to the next occurrence of that day (e.g., next Monday)
        }
      }
    });

    return excludedDates;
  };

  const excludedDates = generateExcludedDates(bookingData, eventData);

  // Check if the date is in the past
  const isPastDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to midnight
    date.setHours(0, 0, 0, 0); // Normalize to midnight
    return date < today;
  };

  // Check if the date is excluded (fully booked or unavailable)
  const isExcludedDate = (date) => {
    const dateString = date.toLocaleDateString("en-CA");
    return excludedDates.includes(dateString);
  };

  // Check if the date is today
  const isToday = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to midnight
    date.setHours(0, 0, 0, 0); // Normalize to midnight
    return date.getTime() === today.getTime(); // Compare with time set to midnight to ignore time difference
  };

  // Calculate 60 calendar days from today
  const getMaxDate = (daysLimit = null) => {
    if (daysLimit === null) {
      return null; // No date limit, return null
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to midnight
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + daysLimit); // Add the specified number of days (or 60 by default)
    return maxDate;
  };

  const maxDate = getMaxDate();

  // Check if the date is within the allowed future limit
  const isFutureWithinLimit = (date) => {
    if (maxDate === null) {
      return true; // No future date limit, so allow any date
    }
    return date <= maxDate; // Normal comparison if maxDate is set
  };

  // Check if the date is available for booking
  const isAvailableDate = (date) => {
    return (
      !isPastDate(date) && isFutureWithinLimit(date) && !isExcludedDate(date)
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
    if (isAvailableDate(date)) {
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
      if (date.toLocaleDateString("en-CA") === formattedDate.toLocaleDateString("en-CA")) {
        className += " selected-date "; // Add a special class for the selected date
      }
    }

    return className.trim(); // Return combined class names
  };

  // Handle date change from the calendar
  const handleDateChange = (date) => {
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

  // Format selected date
  const formatDatetoday = (dateString) => {
    const date = new Date(dateString); // Convert string to Date object
    const options = { weekday: "long", month: "long", day: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  // Set the active month when the selected date changes
  useEffect(() => {
    if (formData.selectedDate) {
      const selected = new Date(formData.selectedDate);
      setActiveStartDate(
        new Date(selected.getFullYear(), selected.getMonth(), 1)
      ); // Set to the first day of the selected month
    }
  }, [formData.selectedDate]);

  // Handle month change
  const handleActiveStartDateChange = ({ activeStartDate }) => {
    setActiveStartDate(activeStartDate); // Update activeStartDate when navigating months
  };

  return (
    <div className="calendar-container">
      <Calendar
        onChange={handleDateChange}
        value={selectedDate ? new Date(selectedDate) : null}
        tileDisabled={({ date }) =>
          isPastDate(date) || isExcludedDate(date) || !isFutureWithinLimit(date)
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

            {/* Render available slots here */}

            {errors.slot && <p className="error-message">{errors.slot}</p>}
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
