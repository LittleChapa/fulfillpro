const axios = require('axios');
class UserController {
  async sendFormData(req, res) {
    const { message } = req.body;

    try {
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
        });
    } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).json({ error: 'Failed to send message' });
    }
  }
}

module.exports = new UserController();
