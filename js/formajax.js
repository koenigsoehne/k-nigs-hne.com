var form = document.getElementById("contact-form");
var tokenInput = document.getElementById("token");

// Generate a new token and store it in a hidden input field
var xhr_token = new XMLHttpRequest();
xhr_token.onreadystatechange = function() {
    if (xhr_token.readyState === 4 && xhr_token.status === 200) {
        console.log(xhr_token.responseText);
        tokenInput.value = xhr_token.responseText;
    }
};
xhr_token.open("GET", "php/token.php", true);
xhr_token.send();

// Submit the form using AJAX
form.addEventListener("submit", function(event) {
    event.preventDefault();

    // Validate the form fields
    var name = form.elements["name"].value.trim();
    var email = form.elements["email"].value.trim();
    var subject = form.elements["subject"].value.trim();
    var message = form.elements["message"].value.trim();
    var token = tokenInput.value.trim();

    console.log("AJAX Token: " + token);

    if (name === "" || email === "" || subject=== "" || message === "" || token === "") {
        alert("Please fill in all required fields.");
        return;
    }

    // Send the form data to the server using AJAX
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                alert(xhr.responseText);
                form.reset();
            } else {
                alert("There was an error sending your message. Please try again later.");
            }
        }
    };
    xhr.open("POST", "php/sendmail.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("name=" + encodeURIComponent(name) + "&email=" + encodeURIComponent(email) + "&subject=" + encodeURIComponent(subject) + "&message=" + encodeURIComponent(message) + "&token=" + encodeURIComponent(token));
});
