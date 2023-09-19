function handleRegister() {
    // Grab username and password
    const username = document.getElementById("usernameInput").value;
    const password = document.getElementById("passwordInput").value;
    const confirmPassword = document.getElementById("confirmPasswordInput").value;

    // Grab the validation messages
    const userValidation = document.getElementById("usernameValidation");
    const passValidation = document.getElementById("passwordValidation");
    const confirmPassValidation = document.getElementById("confirmPasswordValidation");

    // Reset the validation messages
    userValidation.textContent = ""
    passValidation.textContent = ""
    confirmPassValidation.textContent = ""

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

    if ((username === "" && password === "") || (password != confirmPassword)) {
        return;
    }

    // Send an object containing the username and a hashed password
    const data = {
        "username": username,
        "password": md5(password)
    }


    function handleResponse (responseText) {
        console.log(responseText)
    }

    sendRequest("/backend/Register.php", data, handleResponse);
}