function onPageLoad() {
    const tableBody = document.getElementById("contactTable");
    const tableTitle = document.getElementById("tableTitle").value;
    const cookie = getCookie("username");

    if (cookie === "") {
        window.location.href = "index.html"
    } else {
        tableBody.textContent = `Viewing ${cookie}\'s Contacts`;
    }

    function handleResponse (responseText) {
        const response = JSON.parse(responseText);
    }

    getRequest("/backend/GetAll.php", "username=", handleResponse);
}

document.addEventListener('DOMContentLoaded', onPageLoad());