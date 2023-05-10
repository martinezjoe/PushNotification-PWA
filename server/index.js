const express = require('express');
const cors = require('cors');
const webpush = require('web-push');

// Middlewares
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Const

const pushSubscription = {
  endpoint:
    'https://fcm.googleapis.com/fcm/send/dK6rkEIITyw:APA91bHN6tS14gD4DhN1UT8fV2EuuKbw9LejDTNmOeZT7nSo4WZ9iHTnwUcnFSjy9Bf83fQKOs77oE5pVGfdw3FQllT06tnaj7ivafgT11u9mWlq273Ju5VQCcuybj9-_W16VWzxjGo8',
  expirationTime: null,
  keys: {
    p256dh:
      'BAHvuiHqd-Pf2W8oPMKZVa0a83gAzgL189z0_1I2JTqCvX75nmjfqaz4Fj24b7PN4G7YIttD1LspHxmrI-Wi7NM',
    auth: '26irzegZrvMb82FfagMaJg',
  },
};

const vapidKeys = {
  publicKey:
    'BB28yt6lemYfxsCBRJYE4TdtqcN2C4OcdYbZe8fCueYMYa3ODUi9yMvsREEkfODHHdr5Mv3x_BDURY0imK_rwnA',
  privateKey: 'v1Uy6qLbqOz6MoPyoa7pA0y6HCZXGqSS8JxzDJCwB8Q',
};

webpush.setVapidDetails(
  'mailto:joe@mail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

// Routes

app.get('/', async (req, res) => {
  // res.sendStatus(200).json();
  try {
    await webpush.sendNotification(
      pushSubscription,
      JSON.stringify({
        title: 'Titulo de la Notificación',
        message: 'Mensaje de la notificación',
      })
    );
    await res.send('All is OK');
  } catch (error) {
    console.log(error);
  }
});

app.post('/custom-notification', (req, res) => {
  const { title, content } = req.body;
  const payload = JSON.stringify({
    title,
    message: content,
  });

  webpush.sendNotification(pushSubscription, payload);
  res.send('All is Ok, custom notification send');
});

app.post('/subscription', (req, res) => {
  console.log(req.body);
  res.sendStatus(200).json();
});

app.listen(8000, () => console.log('Server Listening on port 8000'));
