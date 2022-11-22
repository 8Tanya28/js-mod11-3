// Таймер зворотного відліку
// Створи плагін налаштовуваного таймера, який веде зворотний
// відлік до попередньо визначеної дати. Такий плагін може
// використовуватися в блогах і інтернет-магазинах та на сторінках
// реєстрації подій, під час технічного обслуговування і т. д.
// preview
// Плагін очікує наступну HTML-розмітку і показує чотири цифри:
//  дні, години, хвилини і секунди в форматі XX:XX:XX:XX.
//  Кількість днів може складатися з більш ніж двох цифр.
// <div class="timer" id="timer-1">
//   <div class="field">
//     <span class="value" data-value="days">11</span>
//     <span class="label">Days</span>
//   </div>
//   <div class="field">
//     <span class="value" data-value="hours">11</span>
//     <span class="label">Hours</span>
//   </div>
//   <div class="field">
//     <span class="value" data-value="mins">11</span>
//     <span class="label">Minutes</span>
//   </div>
//   <div class="field">
//     <span class="value" data-value="secs">11</span>
//     <span class="label">Seconds</span>
//   </div>
// </div>
// Плагін - це клас CountdownTimer, екземпляр якого створює новий
// таймер з настройками.
// new CountdownTimer({
//   selector: '#timer-1',
//   targetDate: new Date('Jul 17, 2019'),});
// Для підрахунку значень використовуй такі готові формули,
// де time - різниця між targetDate і поточною датою.
//  * Дні, що залишилися: ділимо значення UTC на 1000 * 60 * 60 * 24, кількість
// мілісекунд в один день (мілісекунди * секунди * хвилини * години)
// const days = Math.floor(time / (1000 * 60 * 60 * 24));
//  * Решта годин: отримуємо залишок від попереднього розрахунку за
// допомогою оператора
//  * залишку% і ділимо його на кількість мілісекунд в одній годині
//  * (1000 * 60 * 60 = мілісекунди * хвилини * секунди)
// const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//  * Решта хвилин: отримуємо хвилини, що залишилися і ділимо їх на кількість
//  * мілісекунд в одній хвилині (1000 * 60 = мілісекунди * секунди)
// const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
//  * Решта секунд: отримуємо секунди, які залишилися і ділимо їх на кількість
//  * миллисекунд в одной секунде (1000)
// const secs = Math.floor((time % (1000 * 60)) / 1000);

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.secs = document.querySelector('[data-value="secs"]');
    this.mins = document.querySelector('[data-value="mins"]');
    this.hours = document.querySelector('[data-value="hours"]');
    this.days = document.querySelector('[data-value="days"]');
  }

  action() {
    let timerInteval = setInterval(() => {
      let currentDate = new Date();
      const time = this.targetDate - currentDate;
      const secs = Math.floor((time % (1000 * 60)) / 1000);
      const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
      const hours = Math.floor(
        (time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const days = Math.floor(time / (1000 * 60 * 60 * 24));
      this.changeValues(secs, mins, hours, days);

      if (time < 0) {
        clearInterval(timerInteval);
        this.resetValues();
      }
    }, 1000);
  }

  changeValues(secs, mins, hours, days) {
    this.secs.textContent = secs < 10 ? `0${secs}` : secs;
    this.mins.textContent = mins < 10 ? `0${mins}` : mins;
    this.hours.textContent = hours < 10 ? `0${hours}` : hours;
    this.days.textContent = days < 10 ? `0${days}` : days;
  }

  resetValues() {
    this.secs.textContent = "00";
    this.mins.textContent = "00";
    this.hours.textContent = "00";
    this.days.textContent = "00";
  }
}

const timer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Jan 1, 2023"),
});

timer.action();
