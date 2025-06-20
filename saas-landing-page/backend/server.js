const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser'); 
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const User = require('./models/User');
const path = require('path');

dotenv.config();
const app = express();
app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.json()); 

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ Mongo Error:", err));

mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB connection open');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  }
});
app.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const token = crypto.randomBytes(32).toString('hex');

    const user = new User({ name, email, password, token, verified: false });
    await user.save();

    const link = `http://localhost:5000/verify/${token}`; 

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: 'Verify your email',
      html: `<p>Hi ${name}, click <a href="${link}">here</a> to verify your email.</p>`
    });

    res.status(200).json({ message: 'Verification email sent!' });
  } catch (err) {
    console.error('❌ Signup Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/verify/:token', async (req, res) => {
  const user = await User.findOne({ token: req.params.token });
  if (!user) return res.send("Invalid or expired token");

  user.verified = true;
  user.token = null;
  await user.save();

  res.sendFile(__dirname + '/public/thankyou.html');
});
app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
