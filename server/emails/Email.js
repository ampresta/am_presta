const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const { google } = require("googleapis");
const path = require("path");
const getRequest = require("./utils");

require("dotenv").config({ path: "../.env" });

const CLIENT_ID = process.env.CLIENT_ID;
const CLEINT_SECRET = process.env.CLEINT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const getAccessToken = async () => {
  const accessToken = await oAuth2Client.getAccessToken();
  return accessToken;
};

class Email {
  constructor(from_email) {
    this.from_email = from_email;
    this.hbs_config = {
      viewEngine: {
        extName: ".handlebars",
        partialsDir: path.resolve(__dirname, "views"),
        defaultLayout: false,
      },
      viewPath: path.resolve(__dirname, "views"),
      extName: ".handlebars",
    };
  }

  getTransporter = async () => {
    const accessToken = await getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: this.from_email,
        clientId: CLIENT_ID,
        clientSecret: CLEINT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    return transporter;
  };

  sendRegister = async (
    to_email,
    username,
    password,
    societe,
    logo = "",
    url = "http://127.0.0.1:3000/login"
  ) => {
    const options = {
      from: this.from_email,
      to: to_email,
      subject: `Welcome to ${societe}`,
      template: "welcome",
      context: {
        username,
        password,
        url,
        // logo
      },
    };
    this.getTransporter()
      .then((transporter) => transporter.use("compile", hbs(this.hbs_config)))
      .then((transporter) => transporter.sendMail(options))
      .then((info) => {
        console.log("Email sent");
      });
  };

  sendRequest = async (
    to_email,
    name,
    course,
    logo = "",
    url = "http://127.0.0.1:3000/requests"
  ) => {
    const options = {
      from: this.from_email,
      to: to_email,
      subject: `Request to access cours: ${course}`,
      template: "alert",
      context: {
        course,
        name,
        url,
        // logo
      },
    };
    this.getTransporter()
      .then((transporter) => transporter.use("compile", hbs(this.hbs_config)))
      .then((transporter) => transporter.sendMail(options))
      .then((info) => {
        console.log("Email sent");
      });
  };

  sendResponse = async (
    to_email,
    status,
    course,
    logo = "",
    url = "http://127.0.0.1:3000/myRequests"
  ) => {
    const options = {
      from: this.from_email,
      to: to_email,
      subject: `Response to your ${course} course enrollment request `,
      template: "response",
      context: {
        course,
        status,
        url,
        // logo
      },
    };
    this.getTransporter()
      .then((transporter) => transporter.use("compile", hbs(this.hbs_config)))
      .then((transporter) => transporter.sendMail(options))
      .then((info) => {
        console.log("Email sent");
      });
  };
}

module.exports = new Email("noreply@institute-eca.ma");
