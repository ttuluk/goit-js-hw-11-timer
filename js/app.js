
import refs from './refs.js';
const { daysEl, hoursEl, minsEl, secondsEl, startBtn, stopBtn } = refs;

const DATE = 'Jul 17, 2022';
class CountdownTimer {
  constructor({ onTick }) {
    this.intervalId = null;
    this.isActive = false;
    this.onTick = onTick;

    this.init();
  }

  init() {
    const time = this.getTimeComponents(0);
    this.onTick(time);
  }

  start() {
    if (this.isActive) {
      return;
    }

    const startTime = new Date(DATE);
    this.isActive = true;

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      const time = this.getTimeComponents(deltaTime);

      this.onTick(time);
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
    const time = this.getTimeComponents(0);
    this.onTick(time);
  }


    getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return {days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }
};

const timer = new CountdownTimer({
    onTick: updateClockface,
    selector: '#timer-1',
  targetDate: new Date(DATE),
});

refs.startBtn.addEventListener('click', timer.start.bind(timer));
refs.stopBtn.addEventListener('click', timer.stop.bind(timer));

function insertData(place, value) {
  place.textContent = value;
}

function updateClockface({ days, hours, mins, secs }) {

  insertData(daysEl, days);
  insertData(hoursEl, hours);
  insertData(minsEl, mins);
  insertData(secondsEl, secs);
};
