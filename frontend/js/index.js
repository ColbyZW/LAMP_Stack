function sendRequest(url, data, responseHandler) {
    let request = new XMLHttpRequest();
    request.open("POST", url);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(data);

    // When we receive a response from the server
    // Handle the response with the function we pass in
    request.onload = () => {
        if (request.status === 200) {
            responseHandler(request.responseText);
        }
    }
}

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

    if (username === "" && password === "") {
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

    sendRequest("/backend/Login.php", data, handleResponse);
}