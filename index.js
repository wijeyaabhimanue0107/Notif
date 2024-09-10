// import admin from 'firebase-admin';
// import { readFile } from 'fs/promises';
// import path from 'path';

// process.env.GOOGLE_APPLICATION_CREDENTIALS;

// const deviceToken = 'e1fM-m7lStmYBjPRwaZwcK:APA91bH3cLRHwwjwOokm-1nxQv4h8q5rSFiCV9211U9h3rghIcuCZ2gpjkmTnRKsQgDbbB-iOYKz3T4ezRda1lpsEUD3CvFSbfbFUwKx4JfsxwohLKHu7h1fTsRktclnsuYeWzKpww-y';

// const serviceAccountPath = path.resolve('D:/Smartzi/Node/notify/fcm-compose-3a20d-firebase-adminsdk-mpeil-70f76b6a84.json');

// const serviceAccount = JSON.parse(
//   await readFile(serviceAccountPath, 'utf-8')
// );

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// const message = {
//   notification: {
//     title: 'Notification!',
//     body: 'This is a Smartzi Alart',
//   },
//   token: deviceToken,
// };


// admin.messaging().send(message)
//   .then((response) => {
//     console.log('Successfully sent message:', response);
//   })
//   .catch((error) => {
//     console.error('Error sending message:', error);
//   });









// import express from 'express';
// import admin from 'firebase-admin';
// import { readFile } from 'fs/promises';
// import path from 'path';

// const app = express();
// const port = 3000; 

// app.use(express.json());

// const serviceAccountPath = path.resolve('D:/Smartzi/Node/notify/fcm-compose-3a20d-firebase-adminsdk-mpeil-70f76b6a84.json');

// (async () => {
//   try {

//     const serviceAccount = JSON.parse(await readFile(serviceAccountPath, 'utf-8'));


//     admin.initializeApp({
//       credential: admin.credential.cert(serviceAccount),
//     });

//     console.log('Firebase Admin Initialized');
//   } catch (error) {
//     console.error('Error initializing Firebase Admin SDK:', error);
//   }
// })();


// app.post('/send-notification', async (req, res) => {
//   const { title, body, token } = req.body;


//   const message = {
//     notification: {
//       title: title || 'Notification!',
//       body: body || 'This is a Smartzi Alert',
//     },
//     token: token || 'e1fM-m7lStmYBjPRwaZwcK:APA91bH3cLRHwwjwOokm-1nxQv4h8q5rSFiCV9211U9h3rghIcuCZ2gpjkmTnRKsQgDbbB-iOYKz3T4ezRda1lpsEUD3CvFSbfbFUwKx4JfsxwohLKHu7h1fTsRktclnsuYeWzKpww-y',
//   };


//   try {
//     const response = await admin.messaging().send(message);
//     console.log('Successfully sent message:', response);
//     res.status(200).send({ message: 'Notification sent!', response });
//   } catch (error) {
//     console.error('Error sending message:', error);
//     res.status(500).send({ message: 'Failed to send notification', error });
//   }
// });


// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });








const express = require('express'); 
const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());

const serviceAccountPath = path.resolve('D:/Smartzi/Node/notify/fcm-compose-3a20d-firebase-adminsdk-mpeil-70f76b6a84.json');

(async () => {
  try {
    const serviceAccount = JSON.parse(await new Promise((resolve, reject) => {
      fs.readFile(serviceAccountPath, 'utf-8', (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    }));

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    console.log('Firebase Admin Initialized');
  } catch (error) {
    console.error('Error initializing Firebase Admin SDK:', error);
  }
})();

app.post('/smartzi-notification', async (req, res) => {
  const { title, body, token } = req.body;

  const message = {
    notification: {
      title: title || 'Notification!',
      body: body || 'This is a Smartzi Alert',
    },
    token: token || 'e1fM-m7lStmYBjPRwaZwcK:APA91bH3cLRHwwjwOokm-1nxQv4h8q5rSFiCV9211U9h3rghIcuCZ2gpjkmTnRKsQgDbbB-iOYKz3T4ezRda1lpsEUD3CvFSbfbFUwKx4JfsxwohLKHu7h1fTsRktclnsuYeWzKpww-y',
  };

  try {
    const response = await admin.messaging().send(message);
    console.log('Successfully sent message:', response);
    res.status(200).send({ message: 'Notification sent!', response });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).send({ message: 'Failed to send notification', error });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});