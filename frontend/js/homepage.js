function onPageLoad() {
    const tableBody = document.getElementById("contactTable");
    const tableTitle = document.getElementById("tableBanner");
    const cookie = getCookie("username");

    if (cookie === "") {
        window.location.href = "index.html"
    } else {
        tableTitle.innerText = `Viewing ${cookie}\'s Contacts`;
    }

    function handleResponse (responseText) {
        const response = JSON.parse(responseText);
        console.log(response)
        if (response.code === 500) {
            const errorRow = document.createElement("tr");
            const errorMessage = document.createElement("td");
            errorMessage.colSpan = "2";
            errorMessage.textContent = response.errorMessage;
            errorMessage.classList.add(["text-danger", "text-center"]);
            errorRow.append(errorMessage);
            tableBody.append(errorRow);
        }
    }

    getRequest("/backend/GetAll.php", `username=${cookie}`, handleResponse);
}

function handleLogout() {
    document.cookie = "username=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "index.html"
}