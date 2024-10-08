const nodemailer = require('nodemailer');
const OTP = require('../models/otpModel');
const User = require('../models/userModel');

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Generate a 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Controller to send OTP
exports.sendOtp = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).send('Email is required');

    const otp = generateOTP();
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is: ${otp}`
    };

    try {
        await OTP.create({ user_id: email, otp });
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).send('Error sending OTP');
            }
            res.status(200).send('OTP sent to your email!');
        });
    } catch (error) {
        res.status(500).send('Server error');
    }
};

// Controller to verify OTP
exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).send('Email and OTP are required');

    try {
        const otpRecord = await OTP.findOne({ user_id: email, otp });
        if (!otpRecord) return res.status(400).send('Invalid OTP');

        const now = new Date();
        const generatedAt = new Date(otpRecord.generated_at);
        const differenceInMinutes = (now - generatedAt) / (1000 * 60);

        if (differenceInMinutes > 5) return res.status(400).send('OTP has expired');

        otpRecord.is_verified = true;
        await otpRecord.save();

        res.status(200).send('OTP verified successfully!');
    } catch (error) {
        res.status(500).send('Error verifying OTP');
    }
};

// Controller for user registration
exports.registerUser = async (req, res) => {
    const { firstName, lastName, birthday, gender, city, mobile, email, password } = req.body;

    if (!firstName || !lastName || !birthday || !gender || !city || !mobile || !email || !password) {
        return res.status(400).send('All fields are required.');
    }

    try {
        const newUser = new User({
            firstName, lastName, birthday, gender, city, mobile, email, password
        });

        await newUser.save();
        res.status(201).send('User registered successfully!');
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).send('Email already exists.');
        }
        res.status(500).send('Server error');
    }
};

// Controller for user login
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Email and password are required.');
    }

    try {
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(401).send('Invalid email or password.');
        }

        return res.status(200).json({
            message: 'Login successful!',
            email: user.email
        });
    } catch (error) {
        res.status(500).send('Server error');
    }
};

// Controller to get user details by email or ID
exports.getUser = async (req, res) => {
    const { email } = req.body; // You can also fetch by ID if needed
    // console.log(req.body);

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found.');
        }

        // Send user details without password
        res.status(200).json({
            name: user.firstName,
            city: user.city,
            profilePhoto : null,
            
        });
    } catch (error) {
        res.status(500).send('Server error');
    }
};
