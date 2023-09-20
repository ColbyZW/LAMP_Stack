function onPageLoad() {
    const tableBody = document.getElementById("contactTable");
    const cookie = getCookie("username");

    function handleResponse (responseText) {
        const response = JSON.parse(responseText);
    }

    getRequest("/backend/GetAll.php", "username=", handleResponse);
}

document.addEventListener('DOMContentLoaded', onPageLoad());