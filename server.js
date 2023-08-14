// server.js

// Подключаем необходимые модули
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors'); // Добавьте это


const app = express();

// Используем middleware для обработки JSON-запросов
app.use(bodyParser.json());

app.use(cors());
// Обработчик POST-запроса на подписку
app.post('/subscribe', (req, res) => {
  const email = req.body.email;

  // Настройка transporter для отправки почты через SMTP
  const transporter = nodemailer.createTransport({
    host: 'smtp.example.com', // Адрес SMTP-сервера
    port: 587, // Порт SMTP
    auth: {
      user: 'your-smtp-username', // Здесь имя пользователя SMTP
      pass: 'your-smtp-password', // И пароль SMTP
    },
  });

  // Настройки письма
  const mailOptions = {
    from: 'your-email@example.com', // Ваш email-адрес
    to: email, // Адрес получателя (введенный пользователем)
    subject: 'Подписка на уведомления', // Тема письма
    text: 'Вы успешно подписались на уведомления!', // Текст письма
  };

  // Отправка письма
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      // console.log(error);
      res.status(500).send('Произошла ошибка при отправке почты');
    } else {
      // console.log('Email отправлен: ' + info.response);
      res.status(200).send('Подписка успешно оформлена');
    }
  });
});

// Запуск сервера на порту ****
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  // console.log(`Сервер запущен на порту ${PORT}`);
});
app.get('/', (req, res) => {
  res.send('Привет, это мой Express-сервер!');
});
