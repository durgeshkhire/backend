import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Create a Nodemailer transporter
let transporter;

async function setupTransporter() {
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    // Real SMTP (e.g., Gmail)
    transporter = nodemailer.createTransport({
      service: 'gmail', // Assuming gmail for simplicity, or use host/port
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    console.log('Real SMTP connection configured.');
  } else {
    // Ethereal Email for testing without credentials
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });
    console.log('Ethereal Mail (Testing) configured. No real emails will be sent out.');
  }
}

setupTransporter();

// Endpoint to send OTP
app.post('/api/send-otp', async (req, res) => {
  const { email, otp, smtpUser, smtpPass } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: 'Email and OTP are required' });
  }

  try {
    let activeTransporter = transporter;
    let isRealSMTP = false;

    // Use dynamic SMTP if provided by front-end client
    if (smtpUser && smtpPass) {
      activeTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: smtpUser, pass: smtpPass },
      });
      isRealSMTP = true;
    } else if (process.env.SMTP_USER) {
      isRealSMTP = true;
    }

    const info = await activeTransporter.sendMail({
      from: isRealSMTP ? `AURA Premium Bags <${smtpUser || process.env.SMTP_USER}>` : '"AURA Mock Email" <noreply@aura-bags.com>',
      to: email,
      subject: 'Your AURA Verification Code',
      text: `Your one-time password is: ${otp}. It will expire in 10 minutes.`,
      html: `<b>Your one-time password is: <h2 style="letter-spacing: 4px">${otp}</h2></b><br>It will expire in 10 minutes.`,
    });

    const previewUrl = !isRealSMTP ? nodemailer.getTestMessageUrl(info) : null;

    if (previewUrl) {
      console.log('Preview URL: %s', previewUrl);
    }

    res.status(200).json({ 
      success: true, 
      message: 'OTP sent successfully',
      messageId: info.messageId,
      previewUrl: previewUrl || null 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send OTP email' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
