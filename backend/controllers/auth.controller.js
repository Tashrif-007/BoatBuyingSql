import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const signup = async (req, res) => {
    try {
        const { name, password } = req.body;
        const salt = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await prisma.user.create({
            data: {
                name,
                password: hashedPassword,
            },
        });

        console.log("User created");
        res.status(201).json({ id: user.id, name });
        
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
}


export const login = async (req, res) => {
    try {
        const { name, password } = req.body;

        const user = await prisma.user.findUnique({
            where: { name },
        });


        if (!user) {
            return res.status(404).json({ message: 'No user exists with that name' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        console.log("Login successful");
        res.status(200).json({ message: 'Login successful', id: user.id, name: user.name });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
}
