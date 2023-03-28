const moment = (() => {
    let hours = document.querySelector('.hours');
    let minutes = document.querySelector('.minutes');
    let seconds = document.querySelector('.seconds');
    let meridiem = document.querySelector('.meridiem');

    const update = () => {
        let today = new Date();
        let month = today.toLocaleString('default', { month: 'long' });
        let weekday = today.toLocaleString('default', { weekday: 'long' });
        let day = today.getDate();
        let time = {
            hours: today.getHours(),
            minutes: today.getMinutes(),
            seconds: today.getSeconds(),
            meridiem: "AM"
        };

        if (time.hours > 12) { //Convert military time to 12-hour format
            time.hours = time.hours - 12;
            time.meridiem = "PM"
        } else if (time.hours === 0) { //Set midnight to 12 instead of 0
            time.hours = 12;
        }
        for (const unit in time) { //Add leading zero for single digits
            if (time[unit] < 10) {
                time[unit] = "0" + time[unit];
            }
        };

        hours.innerText = time.hours
        minutes.innerText = time.minutes;
        seconds.innerText = time.seconds;
        meridiem.innerText = time.meridiem;
        document.querySelector('.weekday').innerText = weekday;
        document.querySelector('.month').innerText = month;
        document.querySelector('.day').innerText = day;

        checkTime(); //Check current time of day (night/evening/daytime)
    }

    const set = () => {
        update(); //Set initial time
        setInterval(update, 1000); //Update time every second
    }

    let video = document.querySelector('video');
    const changeBG = (src) => {
        if (src !== video.getAttribute('src')) { //If current time of day is different from background
            video.setAttribute('src', src) //Update background
        }
    }
    const checkTime = () => {
        if ((meridiem.innerText === "AM" && (hours.innerText < 7 || hours.innerText === '12')) || (meridiem.innerText === "PM" && hours.innerText > 9)) { //If time is between 10PM - 7AM
            changeBG('videos/garden-night.mp4'); //Use night background
        } else if (meridiem.innerText === "PM" && (hours.innerText < 10 || hours.innerText > 4)) { //If time is between 5PM - 10PM
            changeBG('videos/garden-evening.mp4'); //Use evening background
        } else { //7AM - 5PM
            changeBG('videos/garden-day.mp4'); //Use day background
        }
    }
    return { set }
})();

const city = (() => {
    const input = document.querySelector('input');
    const location = document.querySelector('.location');
    const search = document.querySelector('.search');
    const listen = () => {
        input.addEventListener('mouseenter', () => { //When hovering over input
            location.setAttribute('trigger', 'loop'); //Animate location icon
        })
        input.addEventListener('mouseleave', () => { //When not hovering over input
            location.setAttribute('trigger', 'loop-on-hover'); //Only animate when hovering over icon
        })
        input.addEventListener('focusin', () => { //When input is active
            search.classList.remove('hidden'); //Show search icon
        })
        input.addEventListener('focusout', () => { //When input is not active
            search.classList.add('hidden'); //Hide search icon
        })
        location.addEventListener('click', () => { //When location icon is clicked
            input.focus();
            input.setSelectionRange(input.value.length, input.value.length); //Place cursor at the end
        })
    }
    return { listen }
})();

export { moment, city };