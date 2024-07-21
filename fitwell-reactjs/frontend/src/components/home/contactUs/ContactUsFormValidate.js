function ContactUsValidateForm() {
  var email = document.forms["contact"]["email"].value;
  var phone = document.forms["contact"]["phone"].value;

  // validate email
  var emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  if (!email.match(emailRegex)) {
      alert("Please enter a valid email address");
      return false;
  }

  // validate phone number
  var phoneRegex = /^\d{10}$/;
  if (!phone.match(phoneRegex)) {
      alert("Please enter a 10-digit phone number");
      return false;
  }
}

export default ContactUsValidateForm; 