const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const path = require("path");

require("dotenv").config({ path: "../.env" });

const baseURL = "https://institute-eca.ma";

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
  constructor(email, name) {
    this.email = email;
    this.from_email = `"${name}" <${email}>`;
  }

  getTransporter = async () => {
    const accessToken = await getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: this.email,
        clientId: CLIENT_ID,
        clientSecret: CLEINT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
      from: this.from_email,
    });

    return transporter;
  };

  sendRegister = async (
    to_email,
    institutional,
    username,
    password,
    societe,
    admin = false,
    logo = "",
    url = `${baseURL}/login`
  ) => {
    const options = {
      from: this.from_email,
      to: to_email,
      subject: `Welcome to ${societe}`,
      text: admin
        ? `Hello ${username},\n\nYou have been successfully named admin of ${societe}.\n\nYour login is: ${username}\n Your password is: ${password}\n\nYou can access the platform at ${url}.\n\nRegards,\n${societe}`
        : `Hello ${username},\n\nYou have been successfully registered to ${societe}.\n\nYour login is: ${username}\n Your password is: ${password}\n\nTo access your courses on the correspanding pateforms, use your institutional email: ${institutional}\n\nYou can access the platform at ${url}.\n\nRegards,\n${societe}`,
      context: {
        username,
        password,
        url,
        // logo
      },
    };
    this.getTransporter()
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
    url = `${baseURL}/requests`
  ) => {
    const options = {
      from: this.from_email,
      to: to_email,
      text: "",
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

  sendRefuseResponse = async (
    to_email,
    status,
    course,
    logo = "",
    url = `${baseURL}/requests`
  ) => {
    const options = {
      from: this.from_email,
      to: to_email,
      text: "",
      subject: `Response to your ${course} course enrollment request `,
      template: "refuse",
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

  sendAccepteResponse = async (
    to_email,
    status,
    course,
    session,
    logo = "",
    url = `${baseURL}/sessions`
  ) => {
    const options = {
      from: this.from_email,
      to: to_email,
      text: "",
      subject: `Response to your ${course} course enrollment request `,
      template: "accepte",
      context: {
        course,
        status,
        session,
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

  sendAddToSession = async (
    to_email,
    session,
    logo = "",
    url = `${baseURL}/sessions`
  ) => {
    const options = {
      from: this.from_email,
      to: to_email,
      subject: `Added to a new session `,
      template: "addToSession",
      context: {
        session,
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

module.exports = new Email("noreply@institute-eca.ma", "Am Presta");
