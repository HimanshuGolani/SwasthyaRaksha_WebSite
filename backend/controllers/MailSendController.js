import nodemailer from "nodemailer";

export const sendMail = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "casimer.kilback@ethereal.email",
      pass: "WKvMhU818476p7Td93",
    },
  });

  let info = await transporter.sendMail({
    from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>',
    to: "golanihimanshu2@gmail.com",
    subject: "Hello ✔",
    text: "Hello world?",
    html: "<b>Hello</b>",
  });

  console.log(info.messageId);
  res.send(info);
};
