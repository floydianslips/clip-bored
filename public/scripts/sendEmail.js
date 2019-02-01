// accept email and links from user input and send email to maker;

const emailConfig = require('../../email-config')();
const express = require("express");
const mailgun = require('mailgun-js')(emailConfig);
const emailRoutes = express.Router();

module.exports = function sendEmail(email, adminLink, pollLink) {

  const data = {
    from: 'Third Blind Mouse <postmaster@sandbox182d45d576b24145a3d4d1d7fd4d0d76.mailgun.org>',
    to: `<${email}>`,
    subject: 'Congratulations, you won a car!',
    text: `Well a poll is a pretty good prize as well. Here is the link to your admin page: ${adminLink}. The link to the poll is: ${pollLink}.`
  };

  mailgun.messages().send(data, (error, body) => {
    console.log(body);
  });

  return sendEmail;

};
