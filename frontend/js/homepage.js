const contactMap = new Map();

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
        if (response.code === 200) {
            for (const result of response.results) {
                const newRow = document.createElement("tr");
                const name = document.createElement("td");
                const email = document.createElement("td");
                const number = document.createElement("td");
                const options = document.createElement("td");
                contactMap.set(result.uuid, result);

                name.innerHTML = result.contactName;
                email.innerHTML = result.contactEmail;
                number.innerHTML = result.contactPhoneNumber;
                options.innerHTML = `<button type="button" value="${result.uuid}" onClick="handleDelete(this.value)" class="btn btn-danger">Delete Contact</button>
                                     <button type="button" value="${result.uuid}" data-toggle="modal" data-target="#editModal" onClick="handleEdit(this.value)" class="btn btn-secondary">Edit Contact</button>`;

                newRow.append(name);
                newRow.append(number);
                newRow.append(email);
                newRow.append(options);

                tableBody.append(newRow);
            }
        }
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

function handleDelete(contactId) {
    const username = getCookie("username");
    const data =
    {
        "username" : username,
        "contactId" : contactId
    }

    const payload = JSON.stringify(data);

    function handleResponse(responseText){
        const response = JSON.parse(responseText);
        if(response.code === 200)
        {
            contactMap.delete(contactId);
            //refresh el browser-o
            location.reload();
        }
        if(response.code === 500)
        {
            console.log("Unable to delete");
        }

    }

    sendRequest("/backend/DeleteContact.php", payload, handleResponse)
}

// Opens the editing modal
function handleEdit(contactId) {
    const contact = contactMap.get(contactId);
    console.log(contact);
    const modalButton = document.getElementById("editSubmit");
    modalButton.value = contact.contactId;

    document.getElementById("editContactName").value = contact.contactName;
    document.getElementById("editContactEmail").value = contact.contactEmail;
    document.getElementById("editContactPhoneNumber").value = contact.contactPhoneNumber;
}

function addContact() {
    const contactName = document.getElementById("contactName").value;
    const contactNumber = document.getElementById("contactNumber").value;
    const contactEmail = document.getElementById("contactEmail").value;

    const nameError = document.getElementById("nameValidation");
    const numberError = document.getElementById("phoneNumberValidation");
    const emailError = document.getElementById("emailValidation");

    const errorText = document.getElementById("errorText");

    nameError.textContent = "";
    numberError.textContent = "";
    emailError.textContent = "";
    errorText.textContent = "";

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
    if (!contactEmail.includes("@") && !contactEmail.includes(".")) {
        emailError.textContent = "Please enter a valid email";
    }

    if (emailError.textContent != "" || numberError.textContent != "" || nameError.textContent != "") {
        return;
    }

    const cookie = getCookie("username");

    const data = {
        "username": cookie, 
        "contactName": contactName,
        "contactEmail": contactEmail,
        "contactNumber": contactNumber
    }

    const payload = JSON.stringify(data);

    function handleResponse(responseText) {
        const response = JSON.parse(responseText);
        if (response.code === 500) {
            errorText.textContent = "Unable to reach the server";
        }
    }

    sendRequest("/backend/AddContact.php", payload, handleResponse);

}

function handleLogout() {
    document.cookie = "username=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "index.html"
}
