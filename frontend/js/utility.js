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
        } else {
            responseHandler("{\"message\": \"Unable to reach the server\", \"code\": 500}");
        }
    }

}

function getRequest(url, param, responseHandler) {
    let request = new XMLHttpRequest();
    request.open("GET", url+"?"+param);
    request.send();

    request.onload = () => {
        if (request.status === 200) {
            responseHandler(request.responseText);
        }
    }
}

function getCookie(cookie) {
    const cookies = document.cookie;
    const cookieArray = cookies.split(";");
    for (let i = 0; i < cookieArray.length; i++) {
        const currentCookie = cookieArray[i].split("=");
        if (currentCookie[0].trim() === cookie) {
            return currentCookie[1].trim();
        }
    }
    return "";
}