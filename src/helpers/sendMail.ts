import User from '@/models/userModel';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

export const sendMail = async ({email, emailType, userId}:any) => {
    try {
        const hashedToken = crypto.randomBytes(20).toString("hex");
        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId, {
                $set: {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                }
            })
        }
        else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId, {
                $set: {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                }
            })
        }
        
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: "tushat@tushar.ai",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`,
        }
        const mailResponse = await transporter.sendMail(mailOptions);
        console.log("Mail Sent Successfully");
        return mailResponse;

    } catch (error) {
        console.log("Error in sending mail");
        console.log(error);
    }
}
