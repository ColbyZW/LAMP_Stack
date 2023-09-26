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
        if (response.code === 500) {
            const errorRow = document.createElement("tr");
            const errorMessage = document.createElement("td");
            errorMessage.colSpan = "4";
            errorMessage.innerHTML = response.message;
            errorMessage.className = "text-danger text-center";
            errorRow.append(errorMessage);
            tableBody.append(errorRow);
        }
    }

    getRequest("/backend/GetAll.php", `username=${cookie}`, handleResponse);
}

function addContact() {
    const contactName = document.getElementById("contactName").value;
    const contactNumber = document.getElementById("contactNumber").value;
    const contactEmail = document.getElementById("contactEmail").value;

    const nameError = document.getElementById("nameValidation");
    const numberError = document.getElementById("phoneNumberValidation");
    const emailError = document.getElementById("emailValidation");

    nameError.textContent = "";
    numberError.textContent = "";
    emailError.textContent = "";

    if (contactName === "") {
        nameError.textContent = "Please enter a name";
    }
    if (contactNumber === "") {
        numberError.textContent = "Please enter a phone number";
    }
    if (parseInt(contactNumber) === NaN) {
        numberError.textContent = "Please enter a phone number with no dashes";
    }
    if (contactNumber.length != 10) {
        numberError.textContent = "Please enter a valid phone number";
    }
    if (contactEmail === "") {
        emailError.textContent = "Please enter an email";
    }

    if (emailError.textContent != "" || numberError.textContent != "" || nameError.textContent != "") {
        return;
    }

}

function handleLogout() {
    document.cookie = "username=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "index.html"
}