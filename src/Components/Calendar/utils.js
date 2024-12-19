export   const generateExcludedDates = (
  bookingData,
  eventData,
  teamData,
  daysAhead = eventData.maxDayLimit
) => {
  const excludedDates = [];
  const today = new Date();

  const handleBufferDates = () => {
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

}
  const handleFullyBookedDates = () => {

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

}

const handleNoAvailabilityDays = () => {

  const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday",  "saturday", ];
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

}
  // Execute scenarios
  handleBufferDates();
  handleFullyBookedDates();
  handleNoAvailabilityDays();
  return excludedDates;
};
  
  export const getMaxDate = (daysLimit = 60) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + daysLimit);
    return maxDate;
  };
  
  export const isToday = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    return date.getTime() === today.getTime();
  };
  