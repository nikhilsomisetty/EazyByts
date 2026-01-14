const nodemailer = require('nodemailer');

// @desc    Send contact email
// @route   POST /api/contact
// @access  Public
exports.sendContactEmail = async (req, res) => {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Please provide name, email, and message' });
    }

    try {
        // Create transporter (Note: For real apps, use env vars for auth)
        // Using Ethereal for testing if no env vars present
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
            port: process.env.EMAIL_PORT || 587,
            auth: {
                user: process.env.EMAIL_USER || 'ethereal_user',
                pass: process.env.EMAIL_PASS || 'ethereal_pass'
            }
        });

        // Email options
        const mailOptions = {
            from: `"${name}" <${email}>`,
            to: process.env.CONTACT_EMAIL || 'admin@example.com',
            subject: `Portfolio Contact: ${name}`,
            text: message,
            html: `<p>You have a new contact request</p>
                   <h3>Contact Details</h3>
                   <ul>  
                       <li>Name: ${name}</li>
                       <li>Email: ${email}</li>
                   </ul>
                   <h3>Message</h3>
                   <p>${message}</p>`
        };

        // Send email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Email could not be sent' });
    }
};
