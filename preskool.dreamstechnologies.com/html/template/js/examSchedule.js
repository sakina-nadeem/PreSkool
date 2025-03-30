// Add this script to your page
document.addEventListener('DOMContentLoaded', function() {
    // Initialize datepicker (if you're using one)
    const datepickerElement = document.querySelector('.datepic');
    if (typeof flatpickr !== 'undefined') {
      flatpickr(datepickerElement, {
        inline: true,
        minDate: "today"
      });
    }
    
    // Save button event listener
    document.getElementById('saveExamSchedule').addEventListener('click', function() {
      addNewExamSchedule();
    });
    
    // Function to add new exam schedule
    function addNewExamSchedule() {
      // Get form values
      const examTitle = document.getElementById('examTitle').value;
      const subject = document.getElementById('subject').value;
      const examDate = document.getElementById('examDate').value;
      const startTime = document.getElementById('startTime').value;
      const endTime = document.getElementById('endTime').value;
      const roomNumber = document.getElementById('roomNumber').value;
      
      // Validate form
      if (!examTitle || !subject || !examDate || !startTime || !endTime || !roomNumber) {
        alert('Please fill all required fields');
        return;
      }
      
      // Format the date to display
      const formattedDate = formatDate(examDate);
      
      // Format the time to display
      const formattedTime = formatTimeRange(startTime, endTime);
      
      // Calculate days remaining
      const daysRemaining = calculateDaysRemaining(examDate);
      
      // Create a new exam schedule card
      const newSchedule = createExamScheduleHTML(examTitle, subject, formattedTime, formattedDate, roomNumber, daysRemaining);
      
      // Add the new schedule to the container
      const scheduleContainer = document.querySelector('.card-body');
      scheduleContainer.insertAdjacentHTML('beforeend', newSchedule);
      
      // Close the modal
      const modal = bootstrap.Modal.getInstance(document.getElementById('add_exam_schedule'));
      modal.hide();
      
      // Reset the form
      document.getElementById('examScheduleForm').reset();
    }
    
    // Helper function to format date
    function formatDate(dateString) {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();
      return `${day} ${month} ${year}`;
    }
    
    // Helper function to format time range
    function formatTimeRange(startTime, endTime) {
      function formatTime(timeString) {
        const [hours, minutes] = timeString.split(':');
        let hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12;
        return `${hour}:${minutes} ${ampm}`;
      }
      
      const formattedStart = formatTime(startTime);
      const formattedEnd = formatTime(endTime);
      
      return `${formattedStart} - ${formattedEnd}`;
    }
    
    // Helper function to calculate days remaining
    function calculateDaysRemaining(examDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const examDay = new Date(examDate);
      examDay.setHours(0, 0, 0, 0);
      
      const timeDiff = examDay.getTime() - today.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      
      return daysDiff;
    }
    
    // Helper function to create HTML for new exam schedule
    function createExamScheduleHTML(examTitle, subject, timeRange, formattedDate, roomNumber, daysRemaining) {
      return `
      <div class="p-3 pb-0 mb-3 border rounded">
        <div class="d-flex align-items-center justify-content-between">
          <h5 class="mb-3">${examTitle}</h5>
          <span class="badge badge-soft-danger d-inline-flex align-items-center mb-3">
            <i class="ti ti-clock me-1"></i>${daysRemaining} Days More
          </span>
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <div class="mb-3">
            <h6 class="mb-1">${subject}</h6>
            <p><i class="ti ti-clock me-1"></i>${timeRange}</p>
          </div>
          <div class="mb-3 text-end">
            <p class="mb-1">
              <i class="ti ti-calendar-bolt me-1"></i>${formattedDate}
            </p>
            <p class="text-primary">Room No : ${roomNumber}</p>
          </div>
        </div>
      </div>
      `;
    }
  });