import { error } from "node:console";
import { prisma } from "../lib/prisma";


async function seedAdmin() {

    const AdminData = {
        name: "Admin",
        email: "admin@gmail.com",
        password: "Admin1234",
        role: "ADMIN"
    };
    try {
        const checkAdmin = await prisma.user.findUnique({
            where: {
                email: AdminData.email
            }
        });
        console.log(checkAdmin)
        if (checkAdmin) {
            throw new Error("Already exists Admin!!")
        };
        const AdminCreate = await fetch('http://localhost:3000/api/auth/sign-up/email', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Origin": "http://localhost:3000"
            },
            body: JSON.stringify(AdminData)
        });
        console.log(AdminCreate)
        if (AdminCreate.ok) {
            await prisma.user.update({
                where: {
                    email: AdminData.email
                },
                data: {
                    emailVerified: true
                }
            })
            console.log("Successfull")
        };
    } catch (error) {
        console.log(error)
    }


};
seedAdmin()