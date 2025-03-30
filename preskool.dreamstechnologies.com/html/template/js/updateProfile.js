// Function to handle the edit profile functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get the edit profile button
    const editProfileBtn = document.querySelector('.profile-footer .btn-primary');
    
    // Check if the button exists
    if (editProfileBtn) {
      // Change the default link behavior to open a modal instead
      editProfileBtn.addEventListener('click', function(e) {
        e.preventDefault();
        openEditProfileModal();
      });
    }
    
    // Function to open the edit profile modal
    function openEditProfileModal() {
      // Get current profile data
      const studentId = document.querySelector('.badge.bg-transparent-primary').textContent;
      const studentName = document.querySelector('.text-truncate.text-white').textContent.trim();
      const classInfo = document.querySelector('.border-end').textContent.split(':')[1].trim();
      const rollNo = document.querySelector('.d-flex.align-items-center.flex-wrap.row-gap-2 span:last-child').textContent.split(':')[1].trim();
      const profileImg = document.querySelector('.avatar.avatar-xxl img').src;
      
      // Create modal HTML
      const modalHtml = `
        <div class="modal fade" id="editProfileModal" tabindex="-1" aria-labelledby="editProfileModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="editProfileModalLabel">Edit Student Profile</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form id="editProfileForm">
                  <div class="mb-3">
                    <label for="studentId" class="form-label">Student ID</label>
                    <input type="text" class="form-control" id="studentId" value="${studentId.replace('#', '')}" readonly>
                  </div>
                  <div class="mb-3">
                    <label for="studentName" class="form-label">Student Name</label>
                    <input type="text" class="form-control" id="studentName" value="${studentName}">
                  </div>
                  <div class="mb-3">
                    <label for="classInfo" class="form-label">Class</label>
                    <input type="text" class="form-control" id="classInfo" value="${classInfo}">
                  </div>
                  <div class="mb-3">
                    <label for="rollNo" class="form-label">Roll No</label>
                    <input type="text" class="form-control" id="rollNo" value="${rollNo}">
                  </div>
                  <div class="mb-3">
                    <label for="profilePicture" class="form-label">Profile Picture</label>
                    <input type="file" class="form-control" id="profilePicture" accept="image/*">
                    <div class="mt-2">
                      <img id="profilePreview" src="${profileImg}" alt="Profile Preview" style="max-width: 100px; max-height: 100px;" class="rounded">
                    </div>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" id="saveProfileBtn">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      `;
      
      // Append modal to body if it doesn't exist
      if (!document.getElementById('editProfileModal')) {
        document.body.insertAdjacentHTML('beforeend', modalHtml);
      }
      
      // Show the modal
      const editProfileModal = new bootstrap.Modal(document.getElementById('editProfileModal'));
      editProfileModal.show();
      
      // Handle image preview
      const profilePicInput = document.getElementById('profilePicture');
      const profilePreview = document.getElementById('profilePreview');
      
      profilePicInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function(event) {
            profilePreview.src = event.target.result;
          };
          reader.readAsDataURL(file);
        }
      });
      
      // Handle save changes button
      const saveProfileBtn = document.getElementById('saveProfileBtn');
      saveProfileBtn.addEventListener('click', function() {
        updateProfileData();
        editProfileModal.hide();
      });
    }
    
    // Function to update profile data on the card
    function updateProfileData() {
      // Get form values
      const studentId = document.getElementById('studentId').value;
      const studentName = document.getElementById('studentName').value;
      const classInfo = document.getElementById('classInfo').value;
      const rollNo = document.getElementById('rollNo').value;
      const profilePreview = document.getElementById('profilePreview').src;
      
      // Update the card with new values
      document.querySelector('.badge.bg-transparent-primary').textContent = '#' + studentId;
      document.querySelector('.text-truncate.text-white').textContent = studentName;
      document.querySelector('.border-end').textContent = 'Class : ' + classInfo;
      document.querySelector('.d-flex.align-items-center.flex-wrap.row-gap-2 span:last-child').textContent = 'Roll No : ' + rollNo;
      document.querySelector('.avatar.avatar-xxl img').src = profilePreview;
      
      // Show success message
      showToast('Profile updated successfully!', 'success');
    }
    
    // Toast notification function
    function showToast(message, type = 'info') {
      // Create toast container if it doesn't exist
      if (!document.querySelector('.toast-container')) {
        const toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        document.body.appendChild(toastContainer);
      }
      
      // Create toast HTML
      const toastId = 'toast-' + Date.now();
      const toastHtml = `
        <div id="${toastId}" class="toast align-items-center text-white bg-${type} border-0" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="d-flex">
            <div class="toast-body">
              ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
      `;
      
      // Append toast to container
      document.querySelector('.toast-container').insertAdjacentHTML('beforeend', toastHtml);
      
      // Show toast
      const toastElement = document.getElementById(toastId);
      const toast = new bootstrap.Toast(toastElement, { autohide: true, delay: 3000 });
      toast.show();
      
      // Remove toast after it's hidden
      toastElement.addEventListener('hidden.bs.toast', function() {
        toastElement.remove();
      });
    }
  });