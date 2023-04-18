function getFormData(event) {    
    const form = document.getElementById("form");
    const formData = new FormData(form);
    const birthDay = formData.get("day-input");
    const birthMonth = formData.get("month-input");
    const birthYear = formData.get("year-input");

    return birthMonth + "/" + birthDay + "/" + birthYear
}

function ageCalculation(birthdate) {
    var birthDate = new Date(birthdate);
    var today = new Date();

    var years = (today.getFullYear() - birthDate.getFullYear());

    if (today.getMonth() >= birthDate.getMonth()) {
        var months = today.getMonth() - birthDate.getMonth();
    } else {
        years--;
        var months = 12 + today.getMonth() - birthDate.getMonth();
    }

    if (today.getDate() >= birthDate.getDate()) {
        var days = today.getDate() - birthDate.getDate();
    } else {
        months--;
        if (months < 0) {
            months = 11;
            years--;
        }

        var days = 31 + today.getDate() - birthDate.getDate();
    }

    age = {
      years: years,
      months: months,
      days: days
    };

    return age;
}

function setAgeData(age) {
    document.getElementById("result-years").children[0].innerHTML = age.years;
    document.getElementById("result-months").children[0].innerHTML = age.months;
    document.getElementById("result-days").children[0].innerHTML = age.days;
}

function treatForm(event) {
    const birthdate = getFormData(event);
    const age = ageCalculation(birthdate);
    setAgeData(age);
    return false;
}