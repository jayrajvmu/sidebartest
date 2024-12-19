import React, { useState, useEffect, useMemo } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import default styles
import "./Test.css"; // Custom styles
import { parsePath } from "react-router-dom";

const Test = ({ formData, setFormData, errors, setErrors }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [activeStartDate, setActiveStartDate] = useState(new Date()); // Controls the displayed month
  let maxDayLimit = 60;

  const bookingData = [
    {
      date: "2024-11-25",
      slots: {
        team1: ["7am", "8am", "10pm"],
        team2: ["7am", "8am","10pm"],

      },
    },

    {
      date: "2024-11-26",
      slots: {
        // team1: ["9am", "10am"],
        // team2: ["9am", "10am"],
      },
    },
    {
      date: "2024-11-29",
      slots: {
        team1: ["11am", "2pm"],
        team2: ["11am"],
      },
    },

  
  ];

  const eventData = {
    name: "Site Masking",
    buffer: "1hr",
    duration: "3hr",
    availability: {
      monday: ["9am", "10pm"],
      tuesday: ["9am", "10am"],
      wednesday: ["10am", "2pm"],
      thursday: ["10am", "2pm"],
      friday: ["10am", "8pm"],
      saturday: ["7am", "8am"],
      sunday: ["11am", "2pm"],
    },
  };

  const teamData = [
    { name: "team1", id: 1 },
    { name: "team2", id: 2 },
    { name: "team3", id: 3 },
    { name: "team4", id: 4 },


  ];

  // Function to generate excluded dates dynamically for future dates
  const generateExcludedDates = (
    bookingData,
    eventData,
    teamData,
    daysAhead = maxDayLimit
  ) => {
    const excludedDates = [];
    const today = new Date();
    

    //11111111111111111.buffer check
    const originalDateold = new Date(today);
    const updatedDateold = new Date(
      originalDateold.getTime() + parseInt(eventData.buffer) * 60 * 60 * 1000
    );
    const originalDate = new Date(
      originalDateold.getFullYear(),
      originalDateold.getMonth(),
      originalDateold.getDate()
    );
    const updatedDate = new Date(
      updatedDateold.getFullYear(),
      updatedDateold.getMonth(),
      updatedDateold.getDate()
    );

    // Create an array of dates between the start and end dates
    const datesInRange = [];
    let currentDate = new Date(originalDate);
    // Loop through each day between startDate and endDate
    while (currentDate <= updatedDate) {
      datesInRange.push(currentDate.toLocaleDateString("en-CA"));
      currentDate.setDate(currentDate.getDate() + 1); // Increment by one day
    }

        
    if (datesInRange.length > 1) {
      // If the new array has only one element, push that element
      excludedDates.push(...datesInRange.slice(0, -1));
    }
    const bufferCheck = new Date(updatedDateold);
    const bufferCheckstamp = bufferCheck.getTime();
    const weekday = bufferCheck
      .toLocaleString("en-us", { weekday: "long" })
      .toLowerCase();
    // 2. Get the available slots for the selected weekday from eventData
    const availableSlots = eventData.availability[weekday] || []; // Empty array if no slots available for that weekday


    let checkSlot = [];
    availableSlots.forEach((slot) => {
      const [hour, modifier] = slot.split(/(am|pm)/i);
      let slotHour = parseInt(hour);
      if (modifier.toLowerCase() === "pm" && slotHour !== 12) {
        slotHour += 12;
      }
      if (modifier.toLowerCase() === "am" && slotHour === 12) {
        slotHour = 0;
      }
      const formattedHour = String(slotHour).padStart(2, "0");
      const dateTimeString = `${bufferCheck.toLocaleDateString(
        "en-CA"
      )}T${formattedHour}:00`; // ISO 8601 format

      // Create a Date object
      const dateTime = new Date(dateTimeString).getTime();
      if (dateTime < originalDateold.getTime()) {
        checkSlot.push(slot);
      } else if (bufferCheckstamp > dateTime) {
        checkSlot.push(slot);
      }
    });

    


    if (checkSlot.length === availableSlots.length) {
      excludedDates.push(updatedDateold.toLocaleDateString("en-CA"));
    } else if (checkSlot.length < availableSlots.length) {
        
      let pushtoBook = {
        date: updatedDateold.toLocaleDateString("en-CA"),
        slot: checkSlot,
      };      
      
      
      const existingEntry = bookingData.find(
        (entry) => entry.date === pushtoBook.date
      );
      
      

      if (existingEntry) { 
       // Loop through all teams and add the new slot
        // Object.keys(existingEntry.slots).forEach((team) => {
        //   console.log(team);
        //   const newSlots = Array.isArray(pushtoBook.slot) ? pushtoBook.slot : [pushtoBook.slot];          
        //   // Add each slot from newSlots to the team's slot array if it doesn't already exist
        //   newSlots.forEach((slot) => {
        //     if (!existingEntry.slots[team].includes(slot)) {
        //       existingEntry.slots[team].push(slot);
        //     }
        //   });
        // });

        teamData.forEach(({name})=>{
          const newSlots = Array.isArray(pushtoBook.slot) ? pushtoBook.slot : [pushtoBook.slot];  
          newSlots.forEach((slot) => {
            if(existingEntry.slots[name]){
            if (!existingEntry.slots[name].includes(slot)) {
              existingEntry.slots[name].push(slot);
            }
            }else{
              existingEntry.slots[name]=[slot]
            }  
          });
        })
      }else{
        let newDatetoPush={date:'', slots:{}}
        teamData.forEach(({name})=>{
          const newSlots = Array.isArray(pushtoBook.slot) ? pushtoBook.slot : [pushtoBook.slot];  
          newDatetoPush.date=pushtoBook.date;
          newDatetoPush.slots[name] = [];
          newSlots.forEach((slot) => {
            newDatetoPush.slots[name].push(slot)
          });
        })
        bookingData.push(newDatetoPush);
      }
    }

    console.log(bookingData);
    

    // 22222222222. Check bookingData for fully booked dates
    

    bookingData.forEach((entry) => {
      // Convert the date to the day of the week (e.g., "friday")
      const weekday = new Date(entry.date)
        .toLocaleString("en-us", { weekday: "long" })
        .toLowerCase();

      // Ensure the day exists in the availability object
      const availableSlots = eventData.availability[weekday];

      // Continue if there are available slots for this day
      if (availableSlots && availableSlots.length > 0) {
        let isFullyBooked = true; // Flag to track if all teams are fully booked

        // Loop through each team's slots to check if they match or contain available slots

        if(Object.keys(entry.slots).length === teamData.length){
        for (const team in entry.slots) {
          const teamSlots = entry.slots[team];
          const isTeamFullyBooked = availableSlots.every((item) =>
            teamSlots.includes(item)
          );

          if (!isTeamFullyBooked) {
            isFullyBooked = false;
            break; // No need to check further if one team doesn't match
          }
        }
        if (isFullyBooked) {
          excludedDates.push(entry.date);
        }
      }
      }
    });

    // 333333333333. Check eventData for days with no slots
    const daysOfWeek = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    daysOfWeek.forEach((day) => {
      if (eventData.availability[day].length === 0) {
        let nextDate = new Date(today); // Start from today

        while (nextDate.getDay() !== daysOfWeek.indexOf(day)) {
          nextDate.setDate(nextDate.getDate() + 1); // Increment day by 1 until it matches the target day
        }

        // Calculate the end date based on daysAhead
        const endDate = new Date(today);
        endDate.setDate(today.getDate() + daysAhead); // Add daysAhead to today's date

        // Loop to add all future dates of that day to the excluded dates
        while (nextDate <= endDate) {
          const formattedDate = nextDate.toLocaleDateString("en-CA"); // Ensure consistent formatting
          excludedDates.push(formattedDate);
          nextDate.setDate(nextDate.getDate() + 7); // Move to the next occurrence of that day (e.g., next Monday)
        }
      }
    });
    return excludedDates;
  };

  const useExcludedDates = () => {
    return useMemo(() => {
      return generateExcludedDates(bookingData, eventData, teamData);
    }, [bookingData, eventData, teamData]); // Only recompute when these inputs change
  };

  const excludedDates = useExcludedDates();

  

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
  const getMaxDate = (daysLimit = maxDayLimit) => {
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
      if (
        date.toLocaleDateString("en-CA") ===
        formattedDate.toLocaleDateString("en-CA")
      ) {
        className += " selected-date "; // Add a special class for the selected date
      }
    }

    return className.trim(); // Return combined class names
  };

  // Handle date change from the calendar
  const handleDateChange = (date) => {
    formData.slot = ""; // removeing slot when user change date after selct slot
    formData.teamId = ""; // removeing slot when user change date after selct slot

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

  //check slot when i click date check some slot are booked
  const selectedDate2 = new Date(formData.selectedDate);
  const weekday = selectedDate2
    .toLocaleString("en-us", { weekday: "long" })
    .toLowerCase();
  // 2. Get the available slots for the selected weekday from eventData
  const availableSlots = eventData.availability[weekday] || []; // Empty array if no slots available for that weekday
  // 3. Get the booked slots for the selected date from bookingData
  const bookedSlot = bookingData.find(
    (entry) => entry.date === formData.selectedDate
  );
  const slotsForDate = bookedSlot ? bookedSlot.slots : {}; // Extract slots or default to an empty object

  let availableSlotsByTeam = [];

  if (Object.keys(slotsForDate).length !== 0) {
    // Filter available slots for each team and add team ID
    availableSlotsByTeam = teamData.reduce((result, team) => {  
          
      const bookedSlotsForTeam = slotsForDate[team.name] || []; // Get booked slots for the team or an empty array

      availableSlots.filter(slot => {
        !bookedSlotsForTeam.includes(slot) && result.push({ id: team.id, slot });
    });
      return result;
    }, []);
  } else {
    // If no bookings, assign all available slots to each team and add the team id
    availableSlotsByTeam = teamData.reduce((result, team) => {
      availableSlots.forEach(slot => {
          result.push({ id: team.id, slot });
      });
      return result;
  }, []);
  }  



  const uniqueSlots = availableSlotsByTeam.reduce((result, {id, slot})=>{
    if (!result.some(item => item.slot === slot)) {
      result.push({ id, slot }); // Add only unique slots
  }
    return result
  }, [])
  


  const handleSlotSelection = (slot, teamId) => {
    setFormData({
      ...formData,
      slot: slot,
      teamId: teamId, // Update the slot in formData
    });

    // Optional: Clear error for slot selection if it exists
    if (errors.slot) {
      setErrors((prevErrors) => {
        const { slot: _, ...rest } = prevErrors;
        return rest;
      });
    }
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

            <div className="time-slot-container">
             {uniqueSlots && uniqueSlots.map(({id, slot}, index)=>{

              return(
                <button
                key={index+id}
                id={id}
                  className={`time-slot ${
                    formData.teamId === id && formData.slot === slot
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => handleSlotSelection(slot, id)}
                >
                  {slot}
                </button>
              )
        
            
              })}

            </div>

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
