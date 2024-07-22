import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import config from "../config";

interface EmailParamsTypes extends Mail.Options {
  template: string;
}

const nodeMailerTransport = nodemailer.createTransport({
  host: config.SMTP.HOST,
  port: config.SMTP.PORT,
  secure: true, // use TLS
  auth: {
    user: config.SMTP.USER,
    pass: config.SMTP.PASS,
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
});

export const sendEmail = (email: EmailParamsTypes) => {
  return new Promise((resolve, reject) => {
    nodeMailerTransport.sendMail(
      {
        from: process.env.FROM_SMTP_DOMAIN,
        to: email.to, // An array if you have multiple recipients.
        subject: "USA Notary - " + email.subject,
        //You can use "html:" to send HTML email content. It's magic!
        html: email.template,
      },
      (err, info) => {
        if (err) {
          reject(`Error: ${err}`);
        } else {
          resolve(`Response: ${JSON.stringify(info)}`);
        }
      }
    );
  });
};
