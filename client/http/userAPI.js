import { $host } from "./index";

export const sendForm = async (message, recaptchaResponse) => {
  const { data } = await $host.post("api/user/send", {
    message,
    "g-recaptcha-response": recaptchaResponse, // Добавляем reCAPTCHA токен
  });
  return data;
};
