/* I am the original author of the categorizeAndSendNotifications
function, which separates all notifications into categories based on
their destinations. I also created the notificationServices.sendSms
function where notifications are sent out as texts using Twilio. */

const mongodb = require("../mongodb");
const ObjectId = mongodb.ObjectId;
const challengeServices = require("../services/challenge.service");
const notificationServices = require("../services/notifications.service");
const userServices = require("../services/users.service");
const moment = require("moment");
const notificationsLogService = require("../services/notifications-log.service");
const exceptionLogger = require("../services/exceptionLogger.service");
const validateDoc = require("../helpers/validate");
const Exception = require("../models/exception");
const websocket = require("../websocket");
const sendgridServices = require("../services/email.service");

// ... Code contributed by other team members goes here.

function categorizeAndSendNotifications(data) {
  let emailNotifications = [];
  let smsNotifications = [];
  let webNotifications = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].destination === true) {
      data[i].destination = {
        email: true,
        sms: true,
        web: true
      };
    }
    if (data[i].destination.email) {
      emailNotifications.push(data[i]);
    }
    if (data[i].destination.sms) {
      smsNotifications.push(data[i]);
    }
    if (data[i].destination.web) {
      webNotifications.push(data[i]);
    }
  }
  sendEmailNotification(emailNotifications);
  notificationServices.sendSms(smsNotifications);
  websocket.notificationsBroadcast(webNotifications);
}

// ... Code contributed by other team members goes here.
