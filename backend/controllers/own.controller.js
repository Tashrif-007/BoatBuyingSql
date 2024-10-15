import { PrismaClient } from '@prisma/client';

export const own = async (req,res) => {
    const prisma = new PrismaClient();
    const {userId, boatId, buyDate} = req.body;

    try {
        const ownner = await prisma.owns.create({
            data: {
                userId,
                boatId,
                buyDate: new Date(buyDate),
            }
        });
        res.status(201).json(ownner);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });      
    }
}