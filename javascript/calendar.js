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
    if (date.getMonth() === init.today.getMonth() && date.getFullYear() === init.today.getFullYear()) {
      init.addClassToday(init.findToday(init.today));
    }
    init.checkDdayList();
  },
  findToday : function (date) {
    const thisDay = date;
    const firstDay = new Date(thisDay.getFullYear(), thisDay.getMonth(), 1).getDay();
    const week = Math.ceil((thisDay.getDate()+firstDay) / 7);
    let day = (thisDay.getDate()%7) + firstDay;

    if(day > 7) {day = day-7;}
    
    const today = document.querySelector(`.calendar-date>div:nth-child(${week})>div:nth-child(${day})`)
    return today;
  },
  addClassToday : function(today) {
    today.classList.add("calendar-date__today");
  },
  checkDdayList : function() {
    const thisYear = init.date.getFullYear();
    const thisMonth = init.date.getMonth();

    let savedData = localStorage.getItem("dayList");
    if (savedData !== null) {
      savedData = JSON.parse(savedData);
    }

    const thisDday= savedData.filter(d => { 
      const event = new Date(d.dayDate);
      if (event.getFullYear() === thisYear && event.getMonth() === thisMonth){
        return true;
      } else {
        return false;
      }
    })

    if (thisDday.length !== 0) {
      init.paintDday(thisDday);
    }
  },
  paintDday : function(thisDday) {
    thisDday.map(d => {
      const dDay = init.findToday(new Date(d.dayDate));
      dDay.classList.add("calendar-date__event");
    })
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