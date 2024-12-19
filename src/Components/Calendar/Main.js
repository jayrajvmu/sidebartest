import React, { useState, useMemo } from "react";
import CalendarComponent from "./CalendarComponent";
import SlotSelectionComponent from "./SlotSelectionComponent";
import { generateExcludedDates, getMaxDate, isToday } from "./utils";
import './Calender.css'

const Main = ({ formData, setFormData, errors, setErrors }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [activeStartDate, setActiveStartDate] = useState(new Date());

  const bookingData = [
    { date: "2024-11-25", slots: { team1: ["7am", "8am"],} },
    { date: "2024-11-26", slots: {} },
    { date: "2024-11-29", slots: { team1: ["11am", "2pm"], team2: ["11am"] } },
  ];

  const eventData = {
    name: "Site Masking",
    buffer: "1hr",
    duration: "3hr",
    maxDayLimit: 60,
    availability: {
      monday: ["9am", "10pm"],
      tuesday: ["9am", "10am"],
      wednesday: ["10am", "2pm"],
      thursday: ["10am", "2pm"],
      friday: ["10am", "8pm"],
      saturday: ["7am", "8am"],
      sunday: [],
    },
  };

  const teamData = [
    { name: "team1", id: 1 },
    { name: "team2", id: 2 },
  ];

  // Generate excluded dates using memoization
  const excludedDates = useMemo(() => {
    return generateExcludedDates(bookingData, eventData, teamData);
  }, [bookingData, eventData, teamData]);

  // Max date for booking
  const maxDate = getMaxDate(eventData.maxDayLimit);

  // Handle date change
  const handleDateChange = (date) => {
    formData.slot = ""; // Reset slot on date change
    formData.teamId = ""; // Reset team on date change
    const formattedDate = date.toLocaleDateString("en-CA");
    setSelectedDate(formattedDate);
    setFormData({ ...formData, selectedDate: formattedDate });

    // Clear errors
    if (errors.selectedDate) {
      setErrors((prevErrors) => {
        const { selectedDate, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  return (
    <div className="calendar-container">
      <CalendarComponent
        selectedDate={selectedDate}
        excludedDates={excludedDates}
        maxDate={maxDate}
        activeStartDate={activeStartDate}
        setActiveStartDate={setActiveStartDate}
        handleDateChange={handleDateChange}
        isToday={isToday}
        formData={formData}
      />

      {formData.selectedDate && (
        <SlotSelectionComponent
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          setErrors={setErrors}
          selectedDate={formData.selectedDate}
          bookingData={bookingData}
          eventData={eventData}
          teamData={teamData}
        />
      )}

      {errors.selectedDate && <p className="error-message">{errors.selectedDate}</p>}
    </div>
  );
};

export default Main;
