// accept email and links from user input and send email to maker;
var emailConfig = require('../../email-config')();
var express = require("express");
var mailgun = require('mailgun-js')(emailConfig);
var emailRoutes = express.Router();

module.exports = function sendEmail(email, adminLink, pollLink, emailSubject, emailBody) {
  var data = {
    from: 'Third Blind Mouse <postmaster@sandbox182d45d576b24145a3d4d1d7fd4d0d76.mailgun.org>',
    to: `<${email}>`,
    subject: `Congratulations, ${emailSubject}!`,
    text: `${emailBody}!\nHere is the link to your admin/results page: ${adminLink}\nHere is the shareable link to your poll: ${pollLink}`
  };

  mailgun.messages().send(data, (error, body) => {
    console.log(body);
  });

  return sendEmail;
};
