import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "uzkhuthef@gmail.com", // Your Gmail address
    pass: "isks vchs wpzp vtxk",
  },
});

export const sendEmail = async (req, res) => {
  const { username } = req.body;

  const mailOptions = {
    from: "uzkhuthef@gmail.com", // Your Gmail address
    to: "uzkhuthef@gmail.com", // Recipient address (your email)
    subject: "Heart Slot Added", // Subject line
    text: `User ${username} wanted to heart slot.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
    res.status(200).json({ message: "Email sent successfully" }); // Send success response
  } catch (error) {
    console.error("Error sending email:", error.message);
    res
      .status(500)
      .json({ message: "Error sending email", error: error.message }); // Send error response
  }
};
