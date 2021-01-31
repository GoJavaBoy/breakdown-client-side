function rightUrl() {
    if (localStorage.getItem("do_you_know_address_visit") === "true") {
        document.location = "do_you_know_address";
    } else {
        document.location = "index";
    }
}

function addressNotOnTheListClick() {
    localStorage.setItem("address_not_on_the_list", "true");
}

function rightUrl_VehicleDetails() {
    if (localStorage.getItem("do_you_know_address_visit") === "true") {
        document.location = "do_you_know_address";
    } else {
        document.location = "right_place";
    }
}

function getCheckedCheckBoxes() {
    var checkboxesChecked = []; // можно в массиве их хранить, если нужно использовать
    var inputElements = document.getElementsByClassName('btn-check');
    for (var i = 0; inputElements[i]; ++i) {
        if (inputElements[i].checked) {
            checkboxesChecked.push(inputElements[i].value);
        }
    }
    console.log(checkboxesChecked);
    localStorage.setItem("problems", checkboxesChecked);
    return checkboxesChecked;
}

function getVehicleDetails() {
    var plateNumber = document.getElementById("number-plate").value;
    var color = document.getElementById("vehicle-color").value;
    var maker = document.getElementById("vehicle-maker").value;
    var model = document.getElementById("vehicle-model").value;
    // if (plateNumber != null) {
    //
    // }
    // if (color != null) {
    //
    // }
    // if (maker != null) {
    //
    // }
    // if (model != null) {
    //
    // }
    localStorage.setItem("numberPlate", plateNumber);
    localStorage.setItem("color", color);
    localStorage.setItem("maker", maker);
    localStorage.setItem("model", model);
}

function getPersonalDetails() {
    var name = document.getElementById("first-name").value;
    var phoneNumber = document.getElementById("phone-number").value;
    var commentText = document.getElementById("text-area").value;

    localStorage.setItem("name", name);
    localStorage.setItem("phoneNumber", phoneNumber);
    localStorage.setItem("commentText", commentText);

    console.log(localStorage);

    //Send POST request with Human Address body
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.telegram.org/bot1684613071:AAGYMCdPLof7JB_U0hKtM1psvKLhhqejuZE/sendMessage?chat_id=@emergency_breakdown&text='
        + "Имя клиента: " + localStorage.getItem("name") + "%0A"
        + "Номер телефона: " + localStorage.getItem("phoneNumber") + "%0A"
        + "Примечание клиента: " + localStorage.getItem("commentText") + "%0A"
        + "%0A"
        + "Марка машины: " + localStorage.getItem("maker") + "%0A"
        + "Модель: " + localStorage.getItem("model") + "%0A"
        + "Цвет: " + localStorage.getItem("color") + "%0A"
        + "Номер: " + localStorage.getItem("numberPlate") + "%0A"
        + "%0A"
        + "Неисправности: " + localStorage.getItem("problems") + "%0A"
        + "%0A"
        + "Адресс: " + localStorage.getItem("humanAddress") + "%0A"
        + "%0A"
        + "На карте:%0A", false);
    xhr.send();

    var xhr2 = new XMLHttpRequest();
    xhr2.open('GET', 'https://api.telegram.org/bot1684613071:AAGYMCdPLof7JB_U0hKtM1psvKLhhqejuZE/sendLocation?chat_id=@emergency_breakdown&latitude='
         + localStorage.getItem("latitude") + '&longitude=' + localStorage.getItem("longtude"), false);
    xhr2.send();

    // xhr.onload = function () {
    //     // do something to response
    //     //    console.log(this.responseText);
    // };
}
