import {initializeApp, applicationDefault } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";
import express, { json } from "express";

process.env.GOOGLE_APPLICATION_CREDENTIALS;

const app = express();
app.use(express.json());

app.use(function(req, res, next) {
    res.setHeader("Content-Type", "application/json");
    next();
})



initializeApp({
  credential: applicationDefault(),
  projectId: 'potion-for-creators',
});

app.post("/send",function (req, res){
    const receivedToken = req.body.fcmToken;
    const message = {
        notification: {
            title: "Notif",
            body: 'This is a test Notification'
        },
        token: "e1fM-m7lStmYBjPRwaZwcK:APA91bH3cLRHwwjwOokm-1nxQv4h8q5rSFiCV9211U9h3rghIcuCZ2gpjkmTnRKsQgDbbB-iOYKz3T4ezRda1lpsEUD3CvFSbfbFUwKx4JfsxwohLKHu7h1fTsRktclnsuYeWzKpww-y"
    };

    getMessaging()
        .send(message)
        .then((response) => {
            res.status(200).json({
            message:"Successfully sent message",
            token: receivedToken 
        });
        console.log("Successfully sent message",response);
    })
    .catch((error) =>{
        res.status(400);
        res.send(error);
        console.log("Error sending message",error);
    });

});


app.listen(3000, function () {
    console.log("Server started on port 3000");   
});


