import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarComponent = ({
  selectedDate,
  excludedDates,
  maxDate,
  activeStartDate,
  setActiveStartDate,
  handleDateChange,
  isToday,
  formData,
}) => {
  const isPastDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isExcludedDate = (date) => {
    const dateString = date.toLocaleDateString("en-CA");
    return excludedDates.includes(dateString);
  };

  const isFutureWithinLimit = (date) => {
    return maxDate ? date <= maxDate : true;
  };

  const tileClassName = ({ date }) => {
    let className = "";

    if (isToday(date)) className += " today-date ";
    if (!isPastDate(date) && isFutureWithinLimit(date) && !isExcludedDate(date)) className += " available-date ";
    if (isPastDate(date)) className += " past-date ";
    if (date.getDay() === 6 || date.getDay() === 0) className += " weekend-date ";

    const formattedSelectedDate = new Date(formData.selectedDate);
    if (date.toLocaleDateString("en-CA") === formattedSelectedDate.toLocaleDateString("en-CA")) {
      className += " selected-date ";
    }

    return className.trim();
  };

  return (
    <Calendar
      onChange={handleDateChange}
      value={selectedDate ? new Date(selectedDate) : null}
      tileDisabled={({ date }) => isPastDate(date) || isExcludedDate(date) || !isFutureWithinLimit(date)}
      tileClassName={tileClassName}
      minDate={new Date()}
      maxDate={maxDate}
      view="month"
      next2Label={null}
      prev2Label={null}
      activeStartDate={activeStartDate}
      onActiveStartDateChange={({ activeStartDate }) => setActiveStartDate(activeStartDate)}
    />
  );
};

export default CalendarComponent;
