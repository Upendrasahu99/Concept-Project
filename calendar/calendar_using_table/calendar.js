const monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const date = new Date();
const currentFullDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
let month = date.getMonth();
let year = date.getFullYear();



function createCalendar(){
    let firstDayOfMonth = new Date(year, month, 1).getDay();
    let lastDateOfMonth = new Date(year, month+1, 0).getDate();
    let lastDayOfMonth = new Date(year, month, lastDateOfMonth).getDay();
    let lastDateOfPreMonth = new Date(year, month, 0).getDate();

    let calendarHtml = '';
    calendarHtml += '<tr>';
    
    for(let i = firstDayOfMonth -1; i >= 0; i--){
        calendarHtml += `<td class="p-3"><span class="inactive-day">${lastDateOfPreMonth - i}</span></td>`;
    }
    for(let i = 1; i <= lastDateOfMonth; i++){
        let tempDate = new Date(year, month, i);
        let temDay = tempDate.getDay();
        let temFullDate = `${tempDate.getFullYear()}-${tempDate.getMonth()}-${tempDate.getDate()}`;
        calendarHtml += `<td class="p-3"><span data-day="${temDay}" data-fullDate="${temFullDate}">${i}</span></td>`;
        if(temDay === 6){
            calendarHtml += `</tr><tr>`;
        }
    }
    
    for(let i = 1 ; i <= 6 - lastDayOfMonth; i++){
        calendarHtml += `<td class="p-3"><span class="inactive-day">${i}</span></td>`;
    }
    calendarHtml += `</tr>`;
    document.querySelector('tbody').innerHTML = calendarHtml;
    document.getElementById('month-year').innerHTML = `${monthName[month]}, ${year}`;
    addClassOnweekend();
    selectCurrentDate();
}

function addClassOnweekend(){
    let weekendElement = document.querySelectorAll('span[data-day="0"], span[data-day="6"]');
    for(let i = 0; i < weekendElement.length; i++){
        weekendElement[i].classList.add("weekend");
    }
}

function selectCurrentDate(){
    let currentDate = document.querySelector(`tbody tr td span[data-fulldate="${currentFullDate}"]`);
    if(currentDate){
        currentDate.classList.add("today");
    }
}

function nextMonth(){
    month++;
    if(month > 11){
        month = 0;
        year++;
    }
    createCalendar();
}

function preMonth(){
    month--;
    if(month < 0){
        month = 11;
        year--;
    }
    createCalendar();
}

createCalendar();
