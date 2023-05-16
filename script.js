$(function() {
    // Wrap all code that interacts with the DOM in a call to jQuery to ensure that
    // the code isn't run until the browser has finished rendering all the elements
    // in the html.
  
    // Get the current date using Day.js
    const now = dayjs();
  
    // Update the current day element in the header to display only the current day
    $('#currentDay').text(now.format('dddd, MMMM D, YYYY'));
  
    // Add a click listener for the save button
    $('.saveBtn').on('click', function() {
      // Get the user input from the textarea
      const description = $(this).siblings('.description').val();
  
      // Get the id of the containing time-block
      const timeBlockId = $(this).closest('.time-block').attr('id');
  
      // Save the description in local storage using the time block id as the key
      localStorage.setItem(timeBlockId, description);
    });
  
    // Apply past, present, or future class to each time-block
    $('.time-block').each(function() {
      // Get the id of the current time-block
      const timeBlockId = parseInt($(this).attr('id').split('-')[1]);
  
      // Get the current hour using Day.js
      const currentHour = now.hour();
  
      // Compare the time-block id to the current hour and add the appropriate class
      if (timeBlockId < currentHour) {
        $(this).addClass('past');
      } else if (timeBlockId === currentHour) {
        $(this).addClass('present');
      } else {
        $(this).addClass('future');
      }
    });
  
    // Get any user input that was saved in local storage and set the textarea values
    $('.description').each(function() {
      // Get the id of the current time-block
      const timeBlockId = parseInt($(this).closest('.time-block').attr('id').split('-')[1]);
  
      // Get the description from local storage using the time block id as the key
      const description = localStorage.getItem(`hour-${timeBlockId}`);
  
      // Set the textarea value to the saved description, if it exists
      if (description) {
        $(this).val(description);
      }
    });
  });
  