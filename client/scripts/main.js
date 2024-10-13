import Splide from "@splidejs/splide";
import { Notyf } from "notyf";
import "@splidejs/splide/dist/css/splide.min.css";
import "notyf/notyf.min.css";
import { sendForm } from "../http/userAPI";

const burger = document.querySelector("#burger");
const burgerList = document.querySelector("#burger-list");
const logo = document.querySelector("#logo");
const buttonMain = document.querySelector("#button-main");

// sections variables
const main = document.querySelector("#main");
const advantages = document.querySelector("#advantages");
const stages = document.querySelector("#stages");
const services = document.querySelector("#services");
const feedback = document.querySelector("#feedback");
const contacts = document.querySelector("#contacts");

// form variables
const nameForm = document.querySelector("#name");
const phoneForm = document.querySelector("#phone");
const yandexForm = document.querySelector("#yandex");
const wbForm = document.querySelector("#wb");
const ozonForm = document.querySelector("#ozon");
const messageForm = document.querySelector("#message");
const buttonForm = document.querySelector("#button");
const nameFormTitle = document.querySelector("#name-title");
const phoneFormTitle = document.querySelector("#phone-title");
const marketFormTitle = document.querySelector("#market-title");

let arraySections = [main, advantages, stages, services, feedback, contacts];
let recaptchaInitialized = false;
let arrayButtons = Array.from(burgerList.children);
arrayButtons.unshift(logo);
arrayButtons.splice(4, 0, buttonMain);

let splide = new Splide(".splide", {
  perPage: 1,
  arrows: false,
  focus: 0,
  gap: 20,
  omitEnd: true,
}).mount();

const notyf = new Notyf({
  duration: 3000,
  position: {
    x: "right",
    y: "bottom",
  },
  dismissible: true,
});

burger.addEventListener("click", () => {
  burgerList.classList.toggle("active");
  burger.classList.toggle("active");
  document.body.classList.toggle("noscroll");
});

window.addEventListener("scroll", () => {
  const arraySections = [advantages, stages, services, feedback];
  if (window.innerWidth >= 768) {
    arraySections.forEach((item, index) => {
      const offset = arraySections[index].getBoundingClientRect();
      if (offset.y <= 120) {
        Array.from(burgerList.children).forEach((child) => {
          child.classList.remove("active");
        });
        Array.from(burgerList.children)[index].classList.add("active");
      } else {
        if (index == 0) {
          Array.from(burgerList.children).forEach((child) => {
            child.classList.remove("active");
          });
        }
      }
    });
  }
});

arrayButtons.forEach((item, index) => {
  item.addEventListener("click", (e) => {
    if (window.innerWidth >= 768) {
      Array.from(burgerList.children).forEach((child) => {
        child.classList.remove("active");
      });
      if (Array.from(burgerList.children).includes(item)) {
        item.classList.toggle("active");
      }
    } else {
      burgerList.classList.remove("active");
      burger.classList.remove("active");
      document.body.classList.remove("noscroll");
    }

    const offset = arraySections[index].getBoundingClientRect();
    const windowTop = window.pageYOffset;
    window.scrollTo(0, windowTop + offset.top - 70);
  });
});

for (let ev of ["input", "blur", "focus", "click"]) {
  phoneForm.addEventListener(ev, validateNumber);
}

buttonForm.addEventListener("click", (e) => {
  e.preventDefault();

  if (
    !nameForm.value ||
    !phoneForm.value ||
    (!yandexForm.checked && !wbForm.checked && !ozonForm.checked)
  ) {
    !nameForm.value && (nameFormTitle.style.color = "#bc5766");
    !phoneForm.value && (phoneFormTitle.style.color = "#bc5766");
    !yandexForm.checked &&
      !wbForm.checked &&
      !ozonForm.checked &&
      (marketFormTitle.style.color = "#bc5766");
    return notyf.error("Заполните все обязательные поля");
  }
  console.log("отправляем");

  grecaptcha.execute();

  console.log("отправлено");
});

window.onSubmit = onSubmit;

function onSubmit(token) {
  const recaptchaResponse = token;

  console.log(token);

  buttonForm.disabled = true;
  const loading = document.createElement("div");
  loading.classList.add("loading");

  let message = `<i>Заявка с сайта FULFILLPRO</i>\n\n`;

  let marketplaces = [];
  if (yandexForm.checked) {
    marketplaces.push("Яндекс.Маркет");
  }
  if (wbForm.checked) {
    marketplaces.push("Вайлдберриз");
  }
  if (ozonForm.checked) {
    marketplaces.push("Озон");
  }

  message += `<b>Имя:</b> ${nameForm.value}\n`;
  message += `<b>Номер телефона:</b> ${phoneForm.value}\n`;
  message += `<b>Маркетплейсы:</b> ${marketplaces.join(", ")}\n`;
  message += `<b>Комментарий:</b> ${messageForm.value ? messageForm.value : "пусто"}`;

  buttonForm.innerHTML = "";
  buttonForm.appendChild(loading);

  sendForm(message, recaptchaResponse)
    .then(() => {
      nameForm.value = "";
      phoneForm.value = "";
      messageForm.value = "";
      yandexForm.checked = false;
      wbForm.checked = false;
      ozonForm.checked = false;
      notyf.success("Заявка отправлена");
    })
    .catch((error) => {
      const { message } = error.response.data;
      console.log(error);
      if (!message) {
        notyf.error(e.message);
        return;
      }
      notyf.error(message);
    })
    .finally(() => {
      buttonForm.innerHTML = "Отправить заявку";
      buttonForm.disabled = false;
    });
  grecaptcha.reset();
}

nameForm.addEventListener("input", (e) => {
  e.target.value.replace(/[0-9]/g, "");
  if (e.target.value != "") {
    nameFormTitle.removeAttribute("style");
  }
});

phoneForm.addEventListener("input", (e) => {
  if (e.target.value != "") {
    phoneFormTitle.removeAttribute("style");
  }
});

[yandexForm, wbForm, ozonForm].forEach((item) => {
  item.addEventListener("input", (e) => {
    marketFormTitle.removeAttribute("style");
  });
});

// Валидация номера телефона
function validateNumber(e) {
  let el = e.target,
    clearVal = el.dataset.phoneClear,
    pattern = el.dataset.phonePattern,
    matrix_def = "_ (___) ___-__-__",
    matrix = pattern ? pattern : matrix_def,
    i = 0,
    def = matrix.replace(/\D/g, ""),
    val = e.target.value.replace(/\D/g, "");
  if (clearVal !== "false" && e.type === "blur") {
    if (val.length < matrix.match(/([\_\d])/g).length) {
      e.target.value = "";
      return;
    }
  }
  if (def.length >= val.length) val = def;
  e.target.value = matrix.replace(/./g, function (a) {
    return /[_\d]/.test(a) && i < val.length
      ? val.charAt(i++)
      : i >= val.length
        ? ""
        : a;
  });
}
