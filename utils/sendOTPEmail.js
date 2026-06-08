import transporter from "../config/mailConfig.js";
import { otpTemplate } from "../templates/otpTemplate.js";

export const sendOTPEmail = async (email, otp) => {
    try {
        // 1. Generate the HTML structure from the MJML template
        let html = otpTemplate(otp);
        if (!html) {
            console.warn('OTP template returned empty HTML, using fallback.');
            html = `<p>Your OTP is ${otp}</p>`;
        }
        console.log(html);
        // 2. Setup the mail configuration parameters
        const mailOptions = {
            from: `"ExpertMentor" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "ExpertMentor Password Reset OTP",
            html: html
        };

        // 3. Send the email and capture the response receipt
        const info = await transporter.sendMail(mailOptions);
        
        console.log(`✉️  OTP Email sent successfully to: ${email}`);
        console.log(`🔗 Message ID: ${info.messageId}`);
        
        return { success: true, messageId: info.messageId };

    } catch (error) {
        // 🛑 CRITICAL: Catch errors so an email dispatch failure doesn't crash your whole Node.js server.
        console.error("❌ Error sending OTP Email:", error.message);
        
        // Return a structured failure state so your calling controller can notify the client UI
        return { success: false, error: error.message };
    }
};