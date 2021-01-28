"use strict";

const post = async (url, body) => {
    return fetch(
        url, {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body
    }).then(response => response.json())
}

const convert_result = (result) => {
    let content = "";
    for (const field in result) {
        content += `${field}: ${result[field]}\r\n`;
    }

    return content;
}

const send_data = () => {
    let email = document.querySelector("#email");
    let lastname = document.querySelector("#lastname");
    let phone = document.querySelector("#phone");
    const label = document.querySelector("#result");

    if (email && lastname && phone && label) {
        email = email.value;
        lastname = lastname.value;
        phone = phone.value;

        const body = JSON.stringify({ email, lastname, phone });
        post("/user", body)
            .then(result => {
                label.textContent = convert_result(result);
            });
    } else {
        alert("Error");
    }

}

const button = document.querySelector("button");
button.addEventListener('click', send_data);