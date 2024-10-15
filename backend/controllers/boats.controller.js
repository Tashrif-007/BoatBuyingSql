import { PrismaClient } from '@prisma/client';

export const getBoats = async (req,res) => {
    const prisma = new PrismaClient();
    try {
        const boats = await prisma.boat.findMany();
        res.json(boats)
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: 'error fetching boats'})
    }
};