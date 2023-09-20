function handleRegister() {
    // Grab username and password
    const username = document.getElementById("usernameInput").value;
    const password = document.getElementById("passwordInput").value;
    const confirmPassword = document.getElementById("confirmPasswordInput").value;

    // Grab the validation messages
    const userValidation = document.getElementById("usernameValidation");
    const passValidation = document.getElementById("passwordValidation");
    const confirmPassValidation = document.getElementById("confirmPasswordValidation");

    const errorText = document.getElementById("errorText");

    // Reset the validation messages
    userValidation.textContent = ""
    passValidation.textContent = ""
    confirmPassValidation.textContent = ""
    errorText.textContent = "";

    if (password != confirmPassword) {
        confirmPassValidation.textContent = "Passwords don't match!"
    }

    // If either field is empty display a warning
    if (username === "") {
        userValidation.textContent = "Please enter a username"
    }
    if (password === "") {
        passValidation.textContent = "Please enter a password"
    }
    if (confirmPassword === "") {
        confirmPassValidation.textContent = "Please confirm your password"
    }

    if ((username === "" || password === "") || (password != confirmPassword)) {
        return;
    }

    // Send an object containing the username and a hashed password
    const data = {
        "username": username,
        "password": md5(password)
    }

    const payload = JSON.stringify(data);

    function handleResponse (responseText) {
        if (responseText.code === "200") {
            let date = new Date();
            date.setTime(date.getTime() + (30 * 60 * 1000));
            document.cookie = "username="+responseText.username+";expires="+date.toGMTString();
            window.location.href = "main.html";
            return;
        }
        if (responseText.code === "400") {
           errorText.textContent = "A user already exists with the username" 
           return;
        } else {
            errorText.textContent = "Sorry, we had an unexpected error, please try again";
            return;
        }

    }

    sendRequest("/backend/Register.php", payload, handleResponse);
}