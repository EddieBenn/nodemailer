import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

const {GMAIL_USER,
    GMAIL_PASSWORD} = process.env


export const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: `${GMAIL_USER}`,
            pass: `${GMAIL_PASSWORD}`
        },
        tls: {
            rejectUnauthorized: false
        }
})

export const mailUserOtp = async(params:any)=>{
    try {
        const info = await transporter.sendMail({
            from: `akemini.ndaobong@gmail.com`,
            to: params.email,
            subject: "VERIFY EMAIL",
            html: `
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                    }
            
                    .container {
                        max-width: 90%;
                        margin: auto;
                        padding: 20px;
                        border: 1px solid #e0e0e0;
                        border-radius: 10px;
                        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
                    }
            
                    h2 {
                        color: #1A512E;;
                        text-align: center;
                        font-weight: 800;
                    }
            
                    p {
                        margin-bottom: 30px;
                        color: #777777;
                        text-align: center;
                    }
            
                    .otp {
                        font-size: 40px;
                        letter-spacing: 2px;
                        text-align: center;
                        color: #ff9900;
                        display: block;
                        margin-top: 20px;
                    }

                    .team {
                        color: #1A512E;
                        font-weight: 800
                    }
            
                    .signature {
                        color: #444444;
                        text-align: center;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>Welcome to QUICKBITE</h2>
                    <p>Please enter the OTP to complete your sign up</p>
                    <span class="otp">${params.otp}</span>
                    <p class="signature">Thank You<br><span class="team">TEAM QUICKBITE</span></p>
                </div>
            </body>
            </html>`
            
        })

        return info;
    } catch (error) {
        console.log(error)
    }
}

export const GenerateOTP = () => {
    const otp = Math.floor(1000 + Math.random() * 9000)
    const expiry = new Date()
    expiry.setTime(new Date().getTime() + (30*60*1000))
    return {otp, expiry}
}