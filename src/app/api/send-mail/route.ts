import { EMAIL } from "@/utils/constants";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export async function POST(req: Request) {
  const data = await req.json();
  const mailOptions = {
    from: EMAIL,
    to: EMAIL,
    subject: data.subject,
    html: data.message,
  };

  try {
    await transporter.sendMail(mailOptions);
    return Response.json({ data, message: "Email sent successfully!" });
  } catch (error) {
    return Response.json({
      error: 500,
      message: "An error occurred while sending the email.",
    });
  }
}
