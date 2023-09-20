function onPageLoad() {
    const tableBody = document.getElementById("contactTable");
    const cookie = getCookie("username");

    if (cookie === "") {
        window.location.href = "index.html"
    } else {
        const tableTitle = document.getElementById("tableBanner").value;
        tableBody.textContent = `Viewing ${cookie}\'s Contacts`;
    }

    function handleResponse (responseText) {
        const response = JSON.parse(responseText);
    }

    getRequest("/backend/GetAll.php", "username=", handleResponse);
}

window.onload = onPageLoad();