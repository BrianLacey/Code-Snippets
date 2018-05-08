/* I am the original author of the sendSms function which sends notifications
to users as texts. It has since been modified by another team member to incorporate
images. I used different sets of Twilio credentials based on whether I was merely
testing the API or wanted to be sure notification texts were really sent.*/

const Notification = require("../models/notification");
const mongodb = require("../mongodb");
const conn = mongodb.connection;
const ObjectId = mongodb.ObjectId;
const twilio = require("twilio");

module.exports = {
  // ... Code contributed by other team members goes here.
  sendSms: sendSms
  // ... Code contributed by other team members goes here.
};

// ... Code contributed by other team members goes here.

function sendSms(notifications) {
  const accountSid = process.env.TWILIO_TEST_ACCOUNT_SID; //TEST
  const authToken = process.env.TWILIO_TEST_AUTH_TOKEN; //TEST
  // const accountSid = process.env.TWILIO_LIVE_ACCOUNT_SID; //LIVE
  // const authToken = process.env.TWILIO_LIVE_AUTH_TOKEN; //LIVE
  let client = new twilio(accountSid, authToken);
  for (let i = 0; i < notifications.length; i++) {
    if (notifications[i].phone) {
      client.messages.create({
        from: process.env.TWILIO_TEST_FROM_NUMBER, //TEST
        //  from: process.env.TWILIO_LIVE_FROM_NUMBER, //LIVE
        mediaUrl: notifications[i].fileUrl,
        body: notifications[i].message,
        to: notifications[i].phone
      });
    }
  }
}

// ... Code contributed by other team members goes here.
