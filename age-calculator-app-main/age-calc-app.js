function getFormData(event) {    
    const form = document.getElementById("form");
    const formData = new FormData(form);
    const birthDay = formData.get("day-input");
    const birthMonth = formData.get("month-input");
    const birthYear = formData.get("year-input");

    return {month: birthMonth, day: birthDay, year:birthYear}
}

function ageCalculation(birthdate) {
    var birthDate = new Date(birthdate.year, birthdate.month - 1, birthdate.day);
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

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.innerHTML = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

function setAgeData(age) {
    const yearsObj = document.getElementById("result-years").children[0];
    animateValue(yearsObj, 0, age.years, 1000)
    const monthsObj = document.getElementById("result-months").children[0];
    animateValue(monthsObj, 0, age.months, 1000)
    const daysObj = document.getElementById("result-days").children[0];
    animateValue(daysObj, 0, age.days, 1000)
}

function validateForm(day, month, year) {
    const today = new Date();
    var errors = {
        day: false,
        month: false,
        year: false
    }

    if (year === "") {
        errors.year = true;
        setError("year", "This field is required", errors)
    }
    
    if (month === "") {
        errors.month = true;
        setError("month", "This field is required", errors)
    }
    
    if (day === "") {
        errors.day = true;
        setError("day", "This field is required", errors)
    }

    if (year > today.getFullYear()) {
        errors.year = true;
        setError("year", "Must be in the past", errors)
    }


    var date = moment(year+'-'+month+'-'+day, 'YYYY-MM-DD');
    console.log(date.isValid()); // true
    // var date = new Date(year, month-1, day);
    console.log(date);
    if (!date instanceof Date || isNaN(date.valueOf()) && day != "" && month != "" && year != "") {
        setError("day", "Must be a valid date", errors)
        setError("month", "", errors)
        setError("year", "", errors)
        errors.day = true;
        errors.month = true;
        errors.year = true;
    }


    if (!errors.day) {
        errors.day = false;
        setValid("day", errors);
    }
    
    if (!errors.month) {
        errors.month = false;
        setValid("month", errors);
    }
    
    if (!errors.year) {
        errors.year = false;
        setValid("year", errors);
    }
    
    if (!errors.day && !errors.month && !errors.year) {
        return true;
    } 
    return false;
}

function setError(id, msg) {
    document.getElementById(id + "-error").classList.remove('hidden');
    document.getElementById(id + "-error").innerHTML = msg;
    document.getElementById(id + "-input").classList.add('red-border');
    document.getElementById(id + "-label").classList.add('error');

}

function setValid(id) {
    document.getElementById(id + "-error").classList.add('hidden');
    document.getElementById(id + "-input").classList.remove('red-border');
    document.getElementById(id + "-label").classList.remove('error');
}

function clearErrors() {
    setValid("day-error");
    setValid("month-error");
    setValid("year-error");
}

function treatForm(event) {
    event.preventDefault();
    const birthdate = getFormData(event);
    console.log(birthdate);
    if (validateForm(birthdate.day, birthdate.month, birthdate.year)) {
        const age = ageCalculation(birthdate);
        setAgeData(age);
    }
    return false;
}