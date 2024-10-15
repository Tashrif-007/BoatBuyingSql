import { PrismaClient } from "@prisma/client";

export const ownedBoats = async (req,res) => {
    const { userId } = req.params;
    const prisma = new PrismaClient(); 

    try {
        const ownedBoats = await prisma.owns.findMany({
            where: { userId: parseInt(userId) }, // Fetch records where userId matches
            include: { boat: true }, // Join with the Boat model to get boat details
        });

        res.json(ownedBoats);
    } catch (error) {
        console.error("Error fetching owned boats:", error);
        res.status(500).json({ message: "Error fetching owned boats." });
    }
}