import transporter, { accountEmail } from "../config/nodemailer.js";
import { apiError } from "./apiError.js";
import { emailTemplates } from "./email-template.js";
import dayjs from "dayjs";

export const sendReminderEmail = async ({ to, type, subscription }) => {
  if (!to || !type) throw new apiError(400, "Missing required parameters!!");

  const template = emailTemplates.find((t) => t.label == type);

  if (!template) throw new apiError(400, "Invalid email type!!");

  const mailInfo = {
    userName: subscription.owner.name,
    subscriptionName: subscription.name,
    renewalDate: dayjs(subscription.renewalDate).format("MMM D, YYYY"),
    planName: subscription.name,
    price: `${subscription.currency} ${subscription.price} ${subscription.frequency}`,
    paymentMethod: subscription.paymentMethod,
  };

  const message = template.generateBody(mailInfo);
  const subject = template.generateSubject(mailInfo);

  const mailOptions = {
    from: accountEmail,
    to: to,
    subject: subject,
    html: message,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) return console.log(err, "Error sending Email!!");

    console.log("Email sent: ", +info.response);
  });
};
