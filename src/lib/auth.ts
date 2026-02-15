import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import nodemailer from "nodemailer"


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use true for port 465, false for port 587
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.APP_PASS,
    },
});

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    trustedOrigins: [process.env.APP_URL as string],
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: false,
                defaultValue: "USER",
                input: false,
            },
            phone: {
                type: "string",
                required: false
            },
            status: {
                type: "string",
                required: false,
                defaultValue: "ACTIVE"
            }
        },
    },
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        autoSignIn: false
    },
    emailVerification: {
        sendVerificationEmail: async ({ user, url, token }, request) => {
            try {
                const info = await transporter.sendMail({
                    from: 'My Blog <myblog@gmail.com>',
                    to: user.email,
                    subject: "Verify your email address",
                    html: `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 10px;">
        <div style="text-align: center; padding-bottom: 20px;">
            <h1 style="color: #4F46E5; margin: 0;">Your App Name</h1>
            <p style="font-size: 14px; color: #666;">Secure Authentication System</p>
        </div>
        
        <div style="background-color: #f9fafb; padding: 30px; border-radius: 8px; text-align: center;">
            <h2 style="margin-top: 0; color: #111827;">Confirm your email address</h2>
            <p style="font-size: 16px; color: #4b5563;">Hi ${user.name},</p>
            <p style="font-size: 16px; color: #4b5563;">Thanks for signing up! Please click the button below to verify your email and complete your registration.</p>
            
            <div style="margin: 30px 0;">
                <a href="${url}" style="background-color: #4F46E5; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px; display: inline-block;">Verify Email Address</a>
            </div>
            
            <p style="font-size: 14px; color: #9ca3af;">If the button doesn't work, copy and paste this link into your browser:</p>
            <p style="font-size: 12px; word-break: break-all; color: #4F46E5;">${url}</p>
        </div>
        
        <div style="text-align: center; padding-top: 20px; font-size: 12px; color: #9ca3af;">
            <p>This link will expire in 24 hours.</p>
            <p>&copy; 2026 Your Company Name. All rights reserved.</p>
        </div>
    </div>
    `,
                });

            } catch (error) {
                console.log(error)
            }

        },
    },
},
);