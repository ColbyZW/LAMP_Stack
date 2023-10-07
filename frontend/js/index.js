function onPageLoad() {
    const cookie = getCookie("username");

    if (cookie != "") {
        transitionToPage('homepage.html')
        //window.location.href = "homepage.html"
    }
}

function handleLogin() {
    // Grab username and password
    const username = document.getElementById("usernameInput").value;
    const password = document.getElementById("passwordInput").value;


    // Grab the validation messages
    const userValidation = document.getElementById("usernameValidation");
    const passValidation = document.getElementById("passwordValidation");

    const errorText = document.getElementById("errorText");

    // Reset the validation messages
    userValidation.textContent = ""
    passValidation.textContent = ""
    errorText.textContent = "";

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

    sendRequest("/backend/Login.php", payload, handleResponse);
}