function onPageLoad() {
    const tableBody = document.getElementById("contactTable");
    const tableTitle = document.getElementById("tableBanner");
    const toastText = document.getElementById("toastBodyText");
    const cookie = getCookie("username");

    const toastElList = document.querySelectorAll('.toast')
    const toastList = [...toastElList].map(toastEl => new bootstrap.Toast(toastEl))

    if (cookie === "") {
        window.location.href = "index.html"
    } else {
        tableTitle.innerText = `Viewing ${cookie}\'s Contacts`;
        toastText.innerText = `Successfully logged in as ${cookie}!`
    }

    function handleResponse (responseText) {
        const response = JSON.parse(responseText);
    }

    getRequest("/backend/GetAll.php", `username=${cookie}`, handleResponse);
}