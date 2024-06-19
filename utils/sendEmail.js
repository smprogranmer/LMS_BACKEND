import nodemailer from "nodemailer";
const sendEmail = async (emailData) => {
  console.log("🚀 ~ sendEmail ~ emailData:", emailData)
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USERNAME,
      to: emailData.emailId,
      subject: emailData.subject,
      html: emailData.html,
    };

    const info = await transporter.sendMail(mailOptions);
    // console.log("🚀 ~ exports.sendEmail= ~ info:", info);
  } catch (error) {
    throw error;
  }
};

export default sendEmail;
