const clock = document.querySelector(".js-clock");

const dayList = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

function getTime() {
  const time = new Date();
  const year = time.getFullYear()
  const month = time.getMonth() + 1
  const date = time.getDate()
  const day = dayList[time.getDay()]
  const hour = time.getHours()
  const minute = time.getMinutes()
  const second = time.getSeconds()
  clock.innerText = `${year} ${
    month < 10 ? `0${month}` : month
  }/${
    date < 10 ? `0${date}` : date
  } ${day}
  ${
    hour < 10 ? `0${hour}` : hour
  }:${
    minute < 10 ? `0${minute}` : minute
  }:${
    second < 10 ? `0${second}` : second
  }`;
}

function init() {
  setInterval(getTime, 1000);
}

init();