function addContact() {

    // Grab the new contact's name and number
    const name = document.getElementById("name").value;
    const phoneNumber = document.getElementById("number").value;

    // Grab the validation messages
    const nameValidation = document.getElementById("nameValidation");
    const phoneValidation = document.getElementById("phoneNumberValidation");

    const errorText = document.getElementById("errorText");

    // Reset the validation messages
    nameValidation.textContent = ""
    phoneValidation.textContent = ""
    errorText.textContent = "";

    // If either field is empty display a warning
    if (name === "") {
        nameValidation.textContent = "Please enter a full name"
    }
    if (password === "") {
        phoneValidation.textContent = "Please enter a phone number"
    }

    if (name === "" || phoneNumber === "") {
        return;
    }

    // Send an object containing the username and a hashed password
    const data = {
        "name": name,
        "phoneNumber": phoneNumber
    }

    const payload = JSON.stringify(data);

    function handleResponse (responseText) {
        const response = JSON.parse(responseText);
        if (response.code === 200) {
            let date = new Date();
            date.setTime(date.getTime() + (30 * 60 * 1000));
            document.cookie = "username="+response.username+";expires="+date.toGMTString();
            window.location.href = "homepage.html";
            return;
        }
        if (response.code === 401) {
            errorText.textContent = response.message;
            return;
        } else {
            errorText.textContent = "Sorry, we had an unexpected error, please try again";
            return;
        }
    }

    // Sending to php file that does not exist yet: NewContact.php
    sendRequest("/backend/NewContact.php", payload, handleResponse);

}