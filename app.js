// ****** GRAB ITEMS **********
const countDown = document.querySelector('.countDown');
const countItems = document.querySelectorAll(".counter h3");

const deadlineDate = new Date(2023, 0, 1, 00, 00, 00);

const endTime = deadlineDate.getTime();

function getRemainingTime()
{
  currentTime = new Date().getTime();
  let remainingTime = endTime - currentTime;

  /*
  1s = 1000ms
  1min = 60s
  1hour = 60min
  1day = 24hrs
  */
 const oneDay = 24 * 60 * 60 * 1000;
 const oneHour = 60 * 60 * 1000;
 const oneMin = 60 * 1000;
 const oneSecond = 1000;

 // Calculate Remaining Time
 let rDays = Math.floor(remainingTime / oneDay);
 let rHours = Math.floor((remainingTime % oneDay) / oneHour);
 let rMins = Math.floor((remainingTime % oneHour) / oneMin);
 let rSecs = Math.floor((remainingTime % oneMin) / oneSecond);

 const rValues = [rDays, rHours, rMins, rSecs];

 // Function to format item
 function format(item)
 {
  if (item < 10)
  {
    return `0${item}`;
  }
  return item;
 }

 countItems.forEach((item, index) => {
  item.innerHTML = format(rValues[index]);
 });

 if (remainingTime < 0)
 {
  clearInterval(count);
  //  HAPPY NEW YEAR TEXT AND ANIMATIONS
 }
}

let count = setInterval(getRemainingTime, 1000);

getRemainingTime();