import * as nodemailer from 'nodemailer'
import * as SMTPTransport from 'nodemailer/lib/smtp-transport'

const sendEmail = async (
    to: string,
    from: string,
    subject: string,
    text: string,
    html: string
): Promise<SMTPTransport.SentMessageInfo> => {
    let transportOptions = {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    }

    if (process.env.NODE_ENV === 'development') {
        const emailAccount = await nodemailer.createTestAccount()

        transportOptions.auth.user = emailAccount.user
        transportOptions.auth.pass = emailAccount.pass
    }

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport(transportOptions as SMTPTransport.Options)

    // send mail with defined transport object
    return await transporter.sendMail({
        from, // sender address
        to, // list of receivers
        subject,
        text, // plain text body
        html, // html body
    })
}

export const sendEmailVericationEmail = async (to: string, emailToken: string) => {
    const verificationLink = `${process.env.SERVER_PROTOCOL}://${process.env.SERVER_IP}:${process.env.SERVER_PORT}/auth/verify/${emailToken}`
    const mailInfo = await sendEmail(
        to,
        '"Verify Birthly Account" <noreply@birthly.com>',
        'Verify your Birthly account',
        verificationLink,
        `<a href="${verificationLink}" target="_blank">Click here to verify</a>`
    )

    // log message text in dev
    if (process.env.NODE_ENV === 'development') {
        console.log('Message sent: %s', mailInfo.messageId)
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(mailInfo))
    }
}
