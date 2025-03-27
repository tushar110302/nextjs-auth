import nodemailer from 'nodemailer';

export const sendMail = async ({email, emailType, userId}:any) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.MAIL_USER,
              pass: process.env.MAIL_PASS,
            },
        });
        
        const mailOptions = {
            from: "tushat@tushar@ai",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>hello</p>`,
        }
        const mailResponse = await transporter.sendMail(mailOptions);
        console.log("Mail Sent Successfully");
        return mailResponse;
    } catch (error) {
        console.log("Error in sending mail");
        console.log(error);
    }
}
