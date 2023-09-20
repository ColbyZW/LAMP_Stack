function sendRequest(url, data, responseHandler) {
    let request = new XMLHttpRequest();
    request.open("POST", url);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(data);

    // When we receive a response from the server
    // Handle the response with the function we pass in
    request.onload = () => {
        if (request.status === 200) {
            console.log(request)
            responseHandler(request.responseText);
        }
    }
}