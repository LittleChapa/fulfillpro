const axios = require('axios');
class UserController {
  async sendFormData(req, res) {
    const { message, 'g-recaptcha-response': recaptchaResponse } = req.body;

    // Проверка, что капча отправлена
    if (!recaptchaResponse) {
      return res.status(400).json({
        message: 'Подтвердите что вы не робот',
      });
    }

    // Валидация капчи через Google API
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaResponse}`;

    try {
      // Проверка reCAPTCHA
      const recaptchaVerify = await axios.post(verifyUrl);
      const { success } = recaptchaVerify.data;

      if (!success) {
        return res
          .status(400)
          .json({ message: 'Не удалось пройти проверку reCAPTCHA' });
      }

      await axios
        .post(
          `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
          {
            chat_id: process.env.CHAT_ID,
            text: message,
            parse_mode: 'html',
          }
        )
        .then(({ data }) => {
          return res.status(200).json(data);
        })
        .catch((e) => {
          return res.status(400).json(e);
        });
    } catch (error) {
      console.error('Ошибка отправки сообщения:', error);
      res.status(500).json({ error: 'Ошибка отправки сообщения' });
    }
  }
}

module.exports = new UserController();
