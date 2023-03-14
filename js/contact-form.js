const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementsByName('subject')[0].value;
  const message = document.getElementById('message').value;
  
  // CSRF-Schutz
  const formToken = document.createElement('input');
  formToken.type = 'hidden';
  formToken.name = 'form_token';
  formToken.value = '<?php echo $form_token; ?>';
  const formTime = document.createElement('input');
  formTime.type = 'hidden';
  formTime.name = 'form_time';
  formTime.value = '<?php echo $form_time; ?>';
  contactForm.appendChild(formToken);
  contactForm.appendChild(formTime);

  // XSS-Schutz
  const sanitizer = document.createElement('textarea');
  sanitizer.innerHTML = message;
  const sanitizedMessage = sanitizer.value;

  // Formular validieren
  if (name.trim() === '') {
    alert('Bitte geben Sie einen Namen ein.');
    return;
  }
  if (email.trim() === '') {
    alert('Bitte geben Sie eine E-Mail-Adresse ein.');
    return;
  }
  if (subject.trim() === '') {
    alert('Bitte geben Sie einen Betreff ein.');
    return;
  }
  if (sanitizedMessage.trim() === '') {
    alert('Bitte geben Sie eine Nachricht ein.');
    return;
  }

  const xhr = new XMLHttpRequest();
  xhr.open('POST', '../php/send-email.php');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onload = function () {
    if (xhr.status === 200) {
      alert('Ihre Nachricht wurde erfolgreich gesendet.');
      contactForm.reset();
    } else {
      alert('Es gab ein Problem beim Senden Ihrer Nachricht. Bitte versuchen Sie es später erneut.');
    }
  };
  xhr.send('name=' + name + '&email=' + email + '&subject=' + subject + '&message=' + sanitizedMessage + '&form_token=' + formToken.value + '&form_time=' + formTime.value);
});
