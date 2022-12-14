const myDay = document.getElementById('my-day');
const date = document.getElementById('date');
const bfast = document.getElementById('bfast');
const amsnack = document.getElementById('amsnack');
const lunch = document.getElementById('lunch');
const pmsnack = document.getElementById('pmsnack');
const dinner = document.getElementById('dinner');
const vit1 = document.getElementById('vitamins1');
const vit2 = document.getElementById('vitamins2');
const vit3 = document.getElementById('vitamins3');
const vit4 = document.getElementById('vitamins4');
const submitBtn = document.getElementById('submit-btn');
const dayCards = document.getElementById('dayCards');

let allDays = JSON.parse(localStorage.getItem('allDays')) || [];

const grabDay = (e) => {
    e.preventDefault();

    let niceDate = setDay(date.value)

    let newDay = {
        date: niceDate,
        bfast: bfast.checked,
        amsnack: amsnack.value,
        lunch: lunch.checked,
        pmsnack: pmsnack.value,
        dinner: dinner.value,
        vit1: vit1.checked,
        vit2: vit2.checked,
        vit3: vit3.checked,
        vit4: vit4.checked
    };

    allDays.push(newDay);

    localStorage.setItem('allDays', JSON.stringify(allDays))

    date.value = '';
    bfast.checked=false;
    amsnack.value = '';
    lunch.checked=false;
    pmsnack.value = '';
    dinner.value = '';
    vit1.checked=false;
    vit2.checked=false;
    vit3.checked=false;
    vit4.checked=false;
    
    displayData();
}

const setDay = (date) => {
    let splitDate = date.split('-')
    let year = splitDate[0];
    let month = splitDate[1];
    let day = splitDate[2];

    let formatMonth = ''

    if (month==='01') {
        formatMonth='January'
    } else if (month==='02') {
        formatMonth='February'
    } else if (month==='03') {
        formatMonth='March'
    } else if (month==='04') {
        formatMonth='April'
    } else if (month==='05') {
        formatMonth='May'
    } else if (month==='06') {
        formatMonth='June'
    } else if (month==='07') {
        formatMonth='July'
    } else if (month==='08') {
        formatMonth='August'
    } else if (month==='09') {
        formatMonth='September'
    } else if (month==='10') {
        formatMonth='October'
    } else if (month==='11') {
        formatMonth='November'
    } else if (month==='12') {
        formatMonth='December'
    }

    let fullDate = `${formatMonth} ${day}, ${year}`;

    return fullDate;
}

const displayData = () => {
    let allDays = JSON.parse(localStorage.getItem('allDays')) || [];

    let HTML = [];

    if(allDays.length>0) {

        allDays.forEach(day => {
            let thisDay = template(day);
            HTML.push(thisDay);
        });

    }

    dayCards.innerHTML = HTML.join('');

}

const template = (day) => {
    return `<div class="card" style="width: 18rem;">
    <h3>${day.date}</h3>
    <div class="card-body">
        <p>Breakfast Shake: ${bfastCheck(day.bfast)}</p>
        <p>AM Snack: &nbsp; <span>${day.amsnack}</span></p>
        <p>Lunch Shake: ${lunchCheck(day.lunch)}</p>
        <p>PM Snack: &nbsp; <span>${day.pmsnack}</span></p>
        <p>Dinner: &nbsp; <span>${day.dinner}</span></p>
        <div class="vit-row">
            Vitamins: &nbsp; 
            <div class='pill-svg'>
                ${pillz(day.vit1, day.vit2, day.vit3, day.vit4)}
            </div>
        </div>
    </div>
</div>`
}

const bfastCheck = (breakfast) => {
    if (breakfast === true) {
        return `<i class="fa-solid fa-circle-check"></i>`
    } else {
        return `<i class="fa-regular fa-circle"></i>`
    }
}

const lunchCheck = (lun) => {
    if (lun === true) {
        return `<i class="fa-solid fa-circle-check"></i>`
    } else {
        return `<i class="fa-regular fa-circle"></i>`
    }
}

const pillz = (vit1, vit2, vit3, vit4) => {

    let vits = [vit1, vit2, vit3, vit4];
    let HTML = [];

    vits.forEach((vit) => {
        if (vit === true) {
            let vitHTML = `<i class="fa-solid fa-capsules fa-1x"></i>`
          HTML.push(vitHTML);
        } 
    })

    return HTML.join('');


}

displayData();

submitBtn.addEventListener('click', grabDay)