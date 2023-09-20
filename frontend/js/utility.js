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
        if (cookieArray[i] === cookie) {
            const currentCookie = cookieArray[i].split("=");
            return currentCookie[1];
        }
    }
    return "";
}