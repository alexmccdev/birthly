import * as nodemailer from 'nodemailer'
import * as SMTPTransport from 'nodemailer/lib/smtp-transport'

export const sendEmail = async (to: string, subject: string, text: string, html: string) => {
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
    let info = await transporter.sendMail({
        from: '"Verify Birthly Account" <noreply@birthly.com>', // sender address
        to, // list of receivers
        subject,
        text, // plain text body
        html, // html body
    })

    // log message text in dev
    if (process.env.NODE_ENV === 'development') {
        console.log('Message sent: %s', info.messageId)
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
    }
}
