const nodemailer = require("nodemailer");

const sendEmail = async ({ email, subject, OTP }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: 587,
      secure: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      html: ` <div
      class="container"
      style="max-width: 90%; margin: auto; padding-top: 20px"
    >
      <h2>Welcome to the club.</h2>
      <h4>You are officially In ✔</h4>
      <p style="margin-bottom: 30px;">Pleas enter the sign up OTP to get started</p>
      <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${OTP}</h1>
 </div>`,
    });

    return info;
    // console.log("Email sent successfully");
  } catch (error) {
    console.log(error, " : email not sent");
  }
};

module.exports = sendEmail;
