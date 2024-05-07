document.querySelector('.img-btn').addEventListener('click', function()
	{
		document.querySelector('.cont').classList.toggle('s-signup')
	}
);
// $(document).ready(function() {
//     $('#registration-form').submit(function(event) {
//       // Prevent default form submission
//       event.preventDefault();
  
//       // Get form data
//       var formData = {
//         name: $('#name').val(),
//         email: $('#email').val(),
//         password: $('#password').val()
//       };
  
//       // Send AJAX POST request to server
//       $.ajax({
//         type: 'POST',
//         url: 'http://localhost:3000/register',
//         data: JSON.stringify(formData),
//         contentType: 'application/json',
//         success: function(response) {
//           $('#message').text(response.message);
//         },
//         error: function(xhr, status, error) {
//           var errorMessage = JSON.parse(xhr.responseText).message;
//           $('#message').text(errorMessage);
//         }
//       });
//     });
//   });
  
