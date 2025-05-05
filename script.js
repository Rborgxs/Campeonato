const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
const form = document.getElementById("formulario");

const targetDate = new Date('2025-06-15T00:00:00');
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

const appendAlert = (message, type) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = `
    <div class="alert alert-${type} alert-dismissible" role="alert">
      <div>${message}</div>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
  alertPlaceholder.append(wrapper);
};

form.addEventListener("submit", function (event) {
  event.preventDefault();
  event.stopPropagation();

  if (form.checkValidity()) {
    appendAlert(
      "Inscrição realizada com sucesso! Boa sorte no campeonato!",
      "success"
    );
    form.reset();
    form.classList.remove("was-validated");
  } else {
    form.classList.add("was-validated");
  }
});

function updateCountdown() {
  const currentDate = new Date();
  const difference = targetDate - currentDate;

  if (difference <= 0) {
    clearInterval(interval);
    document.getElementById('countdown').innerHTML = 'Chegamos ao dia!';
    return;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  daysElement.textContent = String(days).padStart(2, '0');
  hoursElement.textContent = String(hours).padStart(2, '0');
  minutesElement.textContent = String(minutes).padStart(2, '0');
  secondsElement.textContent = String(seconds).padStart(2, '0');
}

const interval = setInterval(updateCountdown, 1000);
updateCountdown();