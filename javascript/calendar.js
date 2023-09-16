const prevMonth = document.querySelector(".calendar-yearmonth div:nth-child(1)");
const nextMonth = document.querySelector(".calendar-yearmonth div:nth-child(3)");

const init = {
  monthArr: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  date: new Date(),
  today: new Date(),
  setYearMonth: function (selectedDate) {
    const yearMonth = document.querySelector('.calendar-yearmonth__col');

    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();

    yearMonth.innerText = `${init.monthArr[month]}, ${year}`;
  },
  setDates: function (selectedDate) {

    const lastDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth()+1, 0).getDate();
    const firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
    const firstWeek = 7-firstDay;

    let day = 0;
    let week = 1;
    let innerHtml = '<div class="calendar-date__row">';

    for (let j = 1; j <= (7-firstWeek); j++) {
      innerHtml = innerHtml + "<div class='calendar-date__col'></div>";
      (day !== 6) ? day++ : day = 0;
    }

    for (let i = 1; i <= lastDate; i++) {
      if (week === 1) {
        innerHtml = innerHtml + `<div class='calendar-date__col'>${i}</div>`;
        if (day === 6) {
          innerHtml = innerHtml + "</div><div class='calendar-date__row'>";
          day = 0;
          week++;
        } else {
          day++;
        }
      } else {
        innerHtml = innerHtml + `<div class='calendar-date__col'>${i}</div>`;
        if (day === 6) {
          innerHtml = innerHtml + "</div><div class='calendar-date__row'>";
          day = 0;
          week++;
        } else {
          day++;
        }
      }
    }

    if (day !== 0) {
      while (day !== 0) {
        innerHtml = innerHtml + "<div class='calendar-date__col'></div>";
        (day !== 6) ? day++ : day = 0;
      }
      innerHtml = innerHtml + "</div>";
    }

    document.querySelector(".calendar-date").innerHTML = innerHtml;
  },
  drawCalendar: function() {
    const date = init.date;
    init.setYearMonth(date);
    init.setDates(date);
    if (date.getMonth() === init.today.getMonth()) {
      init.setToday();
    }
  },
  setToday : function () {
    const firstDay = new Date(init.today.getFullYear(), init.today.getMonth(), 1).getDay();
    const week = Math.ceil((init.today.getDate()+firstDay) / 7);
    let day = (init.today.getDate()%7) + firstDay;

    if(day > 7) {day = day-7;}
    
    const today = document.querySelector(`.calendar-date>div:nth-child(${week})>div:nth-child(${day})`)
    today.classList.add("calendar-date__today");
  }
};

function prevMonthDraw() {
  const thisMonth = init.date.getMonth();
  const thisYear = init.date.getFullYear();
  
  init.date = new Date(thisYear, thisMonth-1, 1);
  init.drawCalendar();
}

function nextMonthDraw() {
  const thisMonth = init.date.getMonth();
  const thisYear = init.date.getFullYear();
  
  init.date = new Date(thisYear, thisMonth+1, 1);
  init.drawCalendar();  
}

prevMonth.addEventListener("click", prevMonthDraw);
nextMonth.addEventListener("click", nextMonthDraw);

init.drawCalendar();