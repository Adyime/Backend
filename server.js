const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "contact.adyime@gmail.com",
    pass: "xptsstjidmihfdso",
  },
});

app.get("/", (req, res) => {
  res.send("Hello, this is the Adyime Server!");
});

// Contact form endpoint
app.post("/send-email", (req, res) => {
  const { name, email, message, phoneNumber } = req.body;

  const mailOptions = {
    from: email,
    to: "contact.adyime@gmail.com",
    subject: `Contact form submission from ${name}`,
    text: `
      You have received a new contact form submission:
      
      Name: ${name}
      Email: ${email}
      Phone Number: ${phoneNumber}
      Message: ${message}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send("Error sending email");
    }
    return res.status(200).send("Email sent successfully");
  });
});

// Ebook request form endpoint
app.post("/send-ebook-email", (req, res) => {
  const { email } = req.body;

  const mailOptions = {
    from: "contact.adyime@gmail.com",
    to: email,
    subject: "Your Free Ebook: How to Skyrocket Your Sales",
    text: `
      Thank you for subscribing! Here is your free ebook on "How to Skyrocket Your Sales". 
      You can download the attachment:
    `,
    attachments: [
      {
        filename: "How_to_Skyrocket_Your_Sales.pdf",
        path: "./Ebook.pdf", // Make sure this path is correct relative to your server's root folder
      },
    ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Error sending email");
    }
    console.log("Ebook sent: " + info.response);
    return res.status(200).send("Ebook sent successfully");
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
