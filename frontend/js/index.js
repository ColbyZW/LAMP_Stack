function handleLogin() {
    // Grab username and password
    const username = document.getElementById("usernameInput").value;
    const password = document.getElementById("passwordInput").value;

    // Grab the validation messages
    const userValidation = document.getElementById("usernameValidation");
    const passValidation = document.getElementById("passwordValidation");

    // Reset the validation messages
    userValidation.textContent = ""
    passValidation.textContent = ""

    // If either field is empty display a warning
    if (username === "") {
        userValidation.textContent = "Please enter a username"
    }
    if (password === "") {
        passValidation.textContent = "Please enter a password"
    }

    if (username === "" || password === "") {
        return;
    }

    // Send an object containing the username and a hashed password
    const data = {
        "username": username,
        "password": md5(password)
    }

    const payload = JSON.stringify(data);

    function handleResponse (responseText) {
        console.log(responseText)
    }

    sendRequest("/backend/Login.php", payload, handleResponse);
}